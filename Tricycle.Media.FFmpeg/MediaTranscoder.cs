﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using Tricycle.Diagnostics;
using Tricycle.IO;
using Tricycle.Media.FFmpeg.Models.Config;
using Tricycle.Media.FFmpeg.Models.Jobs;
using Tricycle.Models;
using Tricycle.Models.Jobs;
using Tricycle.Models.Media;
using Tricycle.Utilities;

namespace Tricycle.Media.FFmpeg
{
    public class MediaTranscoder : FFmpegJobRunnerBase, IMediaTranscoder
    {
        #region Fields

        readonly string _ffmpegFileName;
        readonly Func<IProcess> _processCreator;
        TimeSpan _sourceDuration;
        IProcess _process;
        string _lastError;

        #endregion

        #region Constructors

        public MediaTranscoder(string ffmpegFileName,
                               Func<IProcess> processCreator,
                               IConfigManager<FFmpegConfig> configManager,
                               IFFmpegArgumentGenerator argumentGenerator)
            : base(configManager, argumentGenerator)
        {
            _ffmpegFileName = ffmpegFileName;
            _processCreator = processCreator;
        }

        #endregion

        #region Properties

        public bool IsRunning => _process != null && !_process.HasExited;

        #endregion

        #region Events

        public event Action<TranscodeStatus> StatusChanged;
        public event Action Completed;
        public event Action<string> Failed;

        #endregion

        #region Methods

        #region Public

        public void Start(TranscodeJob job)
        {
            if (job == null)
            {
                throw new ArgumentNullException(nameof(job));
            }

            if (IsRunning)
            {
                throw new InvalidOperationException("A job is already running.");
            }

            string arguments = GenerateArguments(job);
            var startInfo = new ProcessStartInfo()
            {
                CreateNoWindow = true,
                FileName = _ffmpegFileName,
                Arguments = arguments,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false
            };

            _process = _processCreator.Invoke();

            SubscribeToEvents(_process);
            _process.Start(startInfo);

            if (job.SourceInfo != null)
            {
                _sourceDuration = job.SourceInfo.Duration;
            }
        }

        public void Stop()
        {
            if (!IsRunning)
            {
                throw new InvalidOperationException("No job is running.");
            }

            UnsubscribeFromEvents(_process);

            _process.Kill();
            _process.WaitForExit(500);
            _process.Dispose();

            _process = null;
            _sourceDuration = TimeSpan.Zero;
        }

        #endregion

        #region Protected

        #region Overrides

        protected override FFmpegJob Map(TranscodeJob job, FFmpegConfig config)
        {
            var result = base.Map(job, config);

            result.Format = GetFormatName(job.Format);
            result.Metadata = job.Metadata;

            // This is a workaround for subtitle overlays with MKV reporting an incorrect duration
            if ((job.Format == ContainerFormat.Mkv) && (job.Subtitles?.SourceStreamIndex != null))
            {
                result.Duration = job.SourceInfo.Duration;
            }

            var trueHdStreams =
                from o in job.Streams
                where o.GetType() == typeof(OutputStream)
                join s in job.SourceInfo.Streams.OfType<AudioStreamInfo>() on o.SourceStreamIndex equals s.Index
                where s.Format == AudioFormat.DolbyTrueHd
                select o;

            if (trueHdStreams.Any())
            {
                result.MaxMuxingQueueSize = 1024;
            }

            return result;
        }

        protected override MappedStream MapStream(FFmpegConfig config,
                                                  StreamInfo sourceStream,
                                                  OutputStream outputStream)
        {
            var result = base.MapStream(config, sourceStream, outputStream);

            if (result == null)
            {
                switch (outputStream)
                {
                    case AudioOutputStream audioOutput:
                        if (sourceStream is AudioStreamInfo audioInput)
                        {
                            result = MapAudioStream(config, audioInput, audioOutput);
                        }
                        else
                        {
                            throw GetStreamMismatchException(nameof(sourceStream), nameof(outputStream));
                        }
                        break;
                    default:
                        result = MapPassthruStream(sourceStream, outputStream);
                        break;
                }
            }

            if (result != null)
            {
                result.Metadata = outputStream.Metadata;
            }

            return result;
        }

        protected override MappedVideoStream MapVideoStream(FFmpegConfig config,
                                                            VideoStreamInfo sourceStream,
                                                            VideoOutputStream outputStream)
        {
            var result = base.MapVideoStream(config, sourceStream, outputStream);

            if (outputStream.DynamicRange == DynamicRange.High)
            {
                if (outputStream.Format != VideoFormat.Hevc)
                {
                    throw new NotSupportedException($"HDR is not supported with the video format {outputStream.Format}.");
                }

                result.ColorPrimaries = "bt2020";
                result.ColorTransfer = "smpte2084";
                result.ColorSpace = "bt2020nc";

                if (outputStream.CopyHdrMetadata)
                {
                    if (sourceStream.MasterDisplayProperties != null)
                    {
                        var properties = sourceStream.MasterDisplayProperties;

                        result.MasterDisplayRedX = properties.Red.X;
                        result.MasterDisplayRedY = properties.Red.Y;
                        result.MasterDisplayGreenX = properties.Green.X;
                        result.MasterDisplayGreenY = properties.Green.Y;
                        result.MasterDisplayBlueX = properties.Blue.X;
                        result.MasterDisplayBlueY = properties.Blue.Y;
                        result.MasterDisplayWhiteX = properties.WhitePoint.X;
                        result.MasterDisplayWhiteY = properties.WhitePoint.Y;
                        result.MasterDisplayMinLuminance = properties.Luminance.Min;
                        result.MasterDisplayMaxLuminance = properties.Luminance.Max;
                    }

                    if (sourceStream.LightLevelProperties != null)
                    {
                        var properties = sourceStream.LightLevelProperties;

                        result.MaxCll = properties.MaxCll;
                        result.MaxFall = properties.MaxFall;
                    }
                }
            }

            result.Codec = GetVideoCodec(config, sourceStream, outputStream);

            return result;
        }

        #endregion

        protected virtual string GetFormatName(ContainerFormat format)
        {
            switch (format)
            {
                case ContainerFormat.Mkv:
                    return "matroska";
                case ContainerFormat.Mp4:
                    return "mp4";
                default:
                    throw new NotSupportedException($"The container format {format} is not supported.");
            }
        }

        protected virtual Codec GetVideoCodec(FFmpegConfig config,
                                              VideoStreamInfo sourceStream,
                                              VideoOutputStream outputStream)
        {
            VideoFormat format = outputStream.Format;
            VideoCodec codec = config?.Video?.Codecs.GetValueOrDefault(format) ?? new VideoCodec("medium");
            string codecName = GetVideoCodecName(format);
            X26xCodec result = format == VideoFormat.Hevc ? new X265Codec(codecName) : new X26xCodec(codecName);

            result.Preset = codec.Preset;
            result.Crf = outputStream.Quality;

            return result;
        }

        protected virtual string GetVideoCodecName(VideoFormat format)
        {
            switch (format)
            {
                case VideoFormat.Avc:
                    return "libx264";
                case VideoFormat.Hevc:
                    return "libx265";
                default:
                    throw new NotSupportedException($"The video format {format} is not supported.");
            }
        }

        protected virtual MappedStream MapPassthruStream(StreamInfo sourceStream, OutputStream outputStream)
        {
            return new MappedStream(sourceStream.StreamType, GetStreamInput(sourceStream))
            {
                Codec = new Codec("copy")
            };
        }

        protected virtual MappedAudioStream MapAudioStream(FFmpegConfig config,
                                                           AudioStreamInfo sourceStream,
                                                           AudioOutputStream outputStream)
        {
            var result = new MappedAudioStream()
            {
                Input = GetStreamInput(sourceStream),
                Codec = new Codec(GetAudioCodecName(config, outputStream.Format))
            };

            if (outputStream.Mixdown.HasValue)
            {
                result.ChannelCount = AudioUtility.GetChannelCount(outputStream.Mixdown.Value);
            }

            if (outputStream.Quality.HasValue)
            {
                result.Bitrate = $"{outputStream.Quality:0}k";
            }

            return result;
        }

        string GetAudioCodecName(FFmpegConfig config, AudioFormat format)
        {
            string result = config?.Audio?.Codecs?.GetValueOrDefault(format)?.Name;

            if (result == null)
            {
                switch (format)
                {
                    case AudioFormat.Aac:
                        result = "aac";
                        break;
                    case AudioFormat.Ac3:
                        result = "ac3";
                        break;
                    default:
                        throw new NotSupportedException($"The audio format {format} is not supported.");
                }
            }

            return result;
        }

        #endregion

        #region Private

        void SubscribeToEvents(IProcess process)
        {
            process.ErrorDataReceived += OnErrorDataReceived;
            process.Exited += OnExited;
        }

        void UnsubscribeFromEvents(IProcess process)
        {
            process.ErrorDataReceived -= OnErrorDataReceived;
            process.Exited -= OnExited;
        }

        void OnErrorDataReceived(string data)
        {
            if (string.IsNullOrWhiteSpace(data))
            {
                return;
            }

            var matches = Regex.Matches(data, @"(?<key>[^\s]+)\s*=\s*(?<value>[^\s]+)");

            if (matches.Count < 1)
            {
                if (!Regex.IsMatch(data, @"conversion\s+failed", RegexOptions.IgnoreCase) || (_lastError == null))
                {
                    _lastError = data;
                }
                
                return;
            }

            var status = new TranscodeStatus();

            foreach (Match match in matches)
            {
                var key = match.Groups["key"].Value;
                var value = match.Groups["value"].Value;

                switch (key?.ToLower())
                {
                    case "fps":
                        status.FramesPerSecond =
                            double.TryParse(value, NumberStyles.Any, CultureInfo.InvariantCulture, out var fps)
                            ? fps
                            : default;
                        break;
                    case "size":
                        status.Size = TryParseSize(value, out var size) ? size : default;
                        break;
                    case "speed":
                        var val = value?.Replace("x", string.Empty);
                        status.Speed =
                            double.TryParse(val, NumberStyles.Any, CultureInfo.InvariantCulture, out var speed)
                            ? speed
                            : default;
                        break;
                    case "time":
                        status.Time =
                            TimeSpan.TryParse(value, CultureInfo.InvariantCulture, out var time)
                            ? time
                            : default;
                        break;
                }
            }

            if (status.Time == TimeSpan.Zero)
            {
                return;
            }

            if (_sourceDuration > TimeSpan.Zero)
            {
                status.Percent = status.Time.TotalMilliseconds / _sourceDuration.TotalMilliseconds;

                if (status.Speed > 0)
                {
                    status.Eta = CalculateEta(status.Time, _sourceDuration, status.Speed);
                }
            }

            if ((status.Percent > 0) && (status.Size > 0))
            {
                status.EstimatedTotalSize = CalculateEstimatedTotalSize(status.Percent, status.Size);
            }

            StatusChanged?.Invoke(status);
        }

        void OnExited()
        {
            // This is a workaround for a bug in the .NET code.
            // See https://stackoverflow.com/a/25772586/9090758 for more details.
            _process.WaitForExit();

            if (_process.ExitCode == 0)
            {
                Completed?.Invoke();
            }
            else
            {
                Failed?.Invoke(_lastError);
            }
  
            _process.Dispose();

            _process = null;
            _sourceDuration = TimeSpan.Zero;
        }

        bool TryParseSize(string size, out long result)
        {
            bool success = false;
            result = 0;

            if (!string.IsNullOrWhiteSpace(size))
            {
                var match = Regex.Match(size, @"(?<amount>\d+(\.\d+)?)(?<unit>\w+)");

                if (match.Success &&
                    double.TryParse(match.Groups["amount"].Value,
                                    NumberStyles.Any,
                                    CultureInfo.InvariantCulture,
                                    out var amount))
                {
                    string unit = match.Groups["unit"].Value;
                    int exponent = 0;

                    switch (unit?.ToLower())
                    {
                        case "kb":
                            exponent = 10;
                            break;
                        case "mb":
                            exponent = 20;
                            break;
                        case "gb":
                            exponent = 30;
                            break;
                    }

                    result = (long)Math.Round(amount * Math.Pow(2, exponent));
                    success = true;
                }
            }

            return success;
        }

        TimeSpan CalculateEta(TimeSpan timeComplete, TimeSpan totalTime, double speed)
        {
            return TimeSpan.FromSeconds((totalTime - timeComplete).TotalSeconds / speed);
        }

        long CalculateEstimatedTotalSize(double percent, long size)
        {
            return (long)Math.Round(size / percent);
        }

        #endregion

        #endregion
    }
}

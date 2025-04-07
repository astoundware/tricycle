using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Tricycle.IO;
using Tricycle.IO.Models;
using Tricycle.Media.FFmpeg.Models.Config;
using Tricycle.Models;
using Tricycle.Models.Config;
using Tricycle.Models.Templates;
using Tricycle.UI.Models;
using Tricycle.UI.Views;
using Tricycle.Utilities;
using FFmpegAudioCodec = Tricycle.Media.FFmpeg.Models.Config.AudioCodec;
using FFmpegAudioConfig = Tricycle.Media.FFmpeg.Models.Config.AudioConfig;
using FFmpegVideoCodec = Tricycle.Media.FFmpeg.Models.Config.VideoCodec;
using FFmpegVideoConfig = Tricycle.Media.FFmpeg.Models.Config.VideoConfig;
using TricycleAudioCodec = Tricycle.Models.Config.AudioCodec;
using TricycleAudioConfig = Tricycle.Models.Config.AudioConfig;
using TricycleVideoCodec = Tricycle.Models.Config.VideoCodec;
using TricycleVideoConfig = Tricycle.Models.Config.VideoConfig;

namespace Tricycle.UI.Presenters
{
    public class ConfigPresenter
    {
        #region Constants

        static readonly DisplayValue EmptyDisplayValue = new DisplayValue(Guid.NewGuid().ToString(), string.Empty);

        #endregion

        #region Fields

        readonly IConfigView _view;
        readonly IConfigManager<TricycleConfig> _tricycleConfigManager;
        readonly IConfigManager<FFmpegConfig> _ffmpegConfigManager;
        readonly IConfigManager<Dictionary<string, JobTemplate>> _templateManager;
        readonly IAppManager _appManager;
        readonly IFolderBrowser _folderBrowser;
        readonly string _defaultDestinationDirectory;

        bool _alertOnCompletion;
        bool _deleteIncompleteFiles;
        bool _preferForcedSubtitles;
        bool _preferSoftSubtitles;
        string _mp4FileExtension;
        string _mkvFileExtension;
        string _destinationDirectory;
        KeyedCollection<DisplayValue> _destinationDirectoryModeOptions;
        DisplayValue _selectedDestinationDirectoryMode;
        bool _isDestinationDirectoryBrowsingEnabled;
        KeyedCollection<Template> _templates;
        KeyedCollection<DisplayValue> _deinterlaceModeOptions;
        DisplayValue _selectedDeinterlaceMode;
        int? _sizeDivisor;
        KeyedCollection<VideoCodecQuality> _videoCodecQualities;
        KeyedCollection<VideoSizePreset> _videoSizePresets;
        KeyedCollection<VideoAspectRatioPreset> _videoAspectRatioPresets;
        bool _passthruMatchingTracks;
        KeyedCollection<DisplayValue> _audioFormatOptions;
        KeyedCollection<DisplayValue> _audioMixdownOptions;
        KeyedCollection<AudioQualityPreset> _audioQualityPresets;
        KeyedCollection<DisplayValue> _x264PresetOptions;
        DisplayValue _selectedX264Preset;
        KeyedCollection<DisplayValue> _x265PresetOptions;
        DisplayValue _selectedX265Preset;
        string _hevcTag;
        string _aacCodec;
        string _ac3Codec;
        string _cropDetectOptions;
        string _deinterlaceOptions;
        string _denoiseOptions;
        string _tonemapOptions;
        bool _isTraceLoggingEnabled;

        bool _isLoading;
        bool _isDirty;

        #endregion

        #region Properties

        bool AlertOnCompletion
        {
            get => _alertOnCompletion;
            set
            {
                _alertOnCompletion = value;
                _view.AlertOnCompletion = _alertOnCompletion;
            }
        }

        bool DeleteIncompleteFiles
        {
            get => _deleteIncompleteFiles;
            set
            {
                _deleteIncompleteFiles = value;
                _view.DeleteIncompleteFiles = _deleteIncompleteFiles;
            }
        }

        bool PreferForcedSubtitles
        {
            get => _preferForcedSubtitles;
            set
            {
                _preferForcedSubtitles = value;
                _view.PreferForcedSubtitles = _preferForcedSubtitles;
            }
        }

        bool PreferSoftSubtitles
        {
            get => _preferSoftSubtitles;
            set
            {
                _preferSoftSubtitles = value;
                _view.PreferSoftSubtitles = _preferSoftSubtitles;
            }
        }

        string Mp4FileExtension
        {
            get => _mp4FileExtension;
            set
            {
                _mp4FileExtension = value;
                _view.Mp4FileExtension = _mp4FileExtension;
            }
        }

        string MkvFileExtension
        {
            get => _mkvFileExtension;
            set
            {
                _mkvFileExtension = value;
                _view.MkvFileExtension = _mkvFileExtension;
            }
        }

        KeyedCollection<DisplayValue> DestinationDirectoryModeOptions
        {
            get => _destinationDirectoryModeOptions;
            set
            {
                _destinationDirectoryModeOptions = value;
                _view.DestinationDirectoryModeOptions = _destinationDirectoryModeOptions;
            }
        }

        DisplayValue SelectedDestinationDirectoryMode
        {
            get => _selectedDestinationDirectoryMode;
            set
            {
                _selectedDestinationDirectoryMode = value;
                _view.SelectedDestinationDirectoryModeKey = _selectedDestinationDirectoryMode.Key;
            }
        }

        string DestinationDirectory
        {
            get => _destinationDirectory;
            set
            {
                _destinationDirectory = value;
                _view.DestinationDirectory = _destinationDirectory;
            }
        }

        bool IsDestinationDirectoryBrowsingEnabled
        {
            get => _isDestinationDirectoryBrowsingEnabled;
            set
            {
                _isDestinationDirectoryBrowsingEnabled = value;
                _view.IsDestinationDirectoryBrowsingEnabled = _isDestinationDirectoryBrowsingEnabled;
            }
        }

        KeyedCollection<Template> Templates
        {
            get => _templates;
            set
            {
                _templates = value;
                _view.Templates = _templates;
            }
        }

        KeyedCollection<DisplayValue> DeinterlaceModeOptions
        {
            get => _deinterlaceModeOptions;
            set
            {
                _deinterlaceModeOptions = value;
                _view.DeinterlaceModeOptions = _deinterlaceModeOptions;
            }
        }

        DisplayValue SelectedDeinterlaceMode
        {
            get => _selectedDeinterlaceMode;
            set
            {
                _selectedDeinterlaceMode = value;
                _view.SelectedDeinterlaceModeKey = _selectedDeinterlaceMode.Key;
            }
        }

        int? SizeDivisor
        {
            get => _sizeDivisor;
            set
            {
                _sizeDivisor = value;
                _view.SizeDivisor = _sizeDivisor;
            }
        }

        KeyedCollection<VideoCodecQuality> VideoCodecQualities
        {
            get => _videoCodecQualities;
            set
            {
                _videoCodecQualities = value;
                _view.VideoCodecQualities = _videoCodecQualities;
            }
        }

        KeyedCollection<VideoSizePreset> VideoSizePresets
        {
            get => _videoSizePresets;
            set
            {
                _videoSizePresets = value;
                _view.VideoSizePresets = _videoSizePresets;
            }
        }

        KeyedCollection<VideoAspectRatioPreset> VideoAspectRatioPresets
        {
            get => _videoAspectRatioPresets;
            set
            {
                _videoAspectRatioPresets = value;
                _view.VideoAspectRatioPresets = _videoAspectRatioPresets;
            }
        }

        bool PassthruMatchingTracks
        {
            get => _passthruMatchingTracks;
            set
            {
                _passthruMatchingTracks = value;
                _view.PassthruMatchingTracks = _passthruMatchingTracks;
            }
        }

        KeyedCollection<DisplayValue> AudioFormatOptions
        {
            get => _audioFormatOptions;
            set
            {
                _audioFormatOptions = value;
                _view.AudioFormatOptions = _audioFormatOptions;
            }
        }

        KeyedCollection<DisplayValue> AudioMixdownOptions
        {
            get => _audioMixdownOptions;
            set
            {
                _audioMixdownOptions = value;
                _view.AudioMixdownOptions = _audioMixdownOptions;
            }
        }

        KeyedCollection<AudioQualityPreset> AudioQualityPresets
        {
            get => _audioQualityPresets;
            set
            {
                _audioQualityPresets = value;
                _view.AudioQualityPresets = _audioQualityPresets;
            }
        }

        KeyedCollection<DisplayValue> X264PresetOptions
        {
            get => _x264PresetOptions;
            set
            {
                _x264PresetOptions = value;
                _view.X264PresetOptions = _x264PresetOptions;
            }
        }

        DisplayValue SelectedX264Preset
        {
            get => _selectedX264Preset;
            set
            {
                _selectedX264Preset = value;
                _view.SelectedX264PresetKey = _selectedX264Preset.Key;
            }
        }

        KeyedCollection<DisplayValue> X265PresetOptions
        {
            get => _x265PresetOptions;
            set
            {
                _x265PresetOptions = value;
                _view.X265PresetOptions = _x265PresetOptions;
            }
        }

        DisplayValue SelectedX265Preset
        {
            get => _selectedX265Preset;
            set
            {
                _selectedX265Preset = value;
                _view.SelectedX265PresetKey = _selectedX265Preset.Key;
            }
        }

        string HevcTag
        {
            get => _hevcTag;
            set
            {
                _hevcTag = value;
                _view.HevcTag = _hevcTag;
            }
        }

        string AacCodec
        {
            get => _aacCodec;
            set
            {
                _aacCodec = value;
                _view.AacCodec = _aacCodec;
            }
        }

        string Ac3Codec
        {
            get => _ac3Codec;
            set
            {
                _ac3Codec = value;
                _view.Ac3Codec = _ac3Codec;
            }
        }

        string CropDetectOptions
        {
            get => _cropDetectOptions;
            set
            {
                _cropDetectOptions = value;
                _view.CropDetectOptions = _cropDetectOptions;
            }
        }

        string DeinterlaceOptions
        {
            get => _deinterlaceOptions;
            set
            {
                _deinterlaceOptions = value;
                _view.DeinterlaceOptions = _deinterlaceOptions;
            }
        }

        string DenoiseOptions
        {
            get => _denoiseOptions;
            set
            {
                _denoiseOptions = value;
                _view.DenoiseOptions = _denoiseOptions;
            }
        }

        string TonemapOptions
        {
            get => _tonemapOptions;
            set
            {
                _tonemapOptions = value;
                _view.TonemapOptions = _tonemapOptions;
            }
        }

        bool IsTraceLoggingEnabled
        {
            get => _isTraceLoggingEnabled;
            set
            {
                _isTraceLoggingEnabled = value;
                _view.IsTraceLoggingEnabled = _isTraceLoggingEnabled;
            }
        }

        #endregion

        #region Constructors

        public ConfigPresenter(
            IConfigView view,
            IConfigManager<TricycleConfig> tricycleConfigManager,
            IConfigManager<FFmpegConfig> ffmpegConfigManager,
            IConfigManager<Dictionary<string, JobTemplate>> templateManager,
            IAppManager appManager,
            IFolderBrowser folderBrowser,
            string defaultDestinationDirectory)
        {
            _view = view;
            _tricycleConfigManager = tricycleConfigManager;
            _ffmpegConfigManager = ffmpegConfigManager;
            _templateManager = templateManager;
            _appManager = appManager;
            _folderBrowser = folderBrowser;
            _defaultDestinationDirectory = defaultDestinationDirectory;

            _appManager.Quitting += OnAppQuitting;

            _view.Ready += OnReady;
            _view.Exited += OnExited;
            _view.AlertOnCompletionChanged += v => _alertOnCompletion = v;
            _view.DeleteIncompleteFilesChanged += v => _deleteIncompleteFiles = v;
            _view.PreferForcedSubtitlesChanged += v => _preferForcedSubtitles = v;
            _view.PreferSoftSubtitlesChanged += v => _preferSoftSubtitles = v;
            _view.Mp4FileExtensionChanged += v => _mp4FileExtension = v;
            _view.MkvFileExtensionChanged += v => _mkvFileExtension = v;
            _view.SelectedDestinationDirectoryModeChanged += v =>
                _selectedDestinationDirectoryMode = DestinationDirectoryModeOptions[v];
            _view.DestinationDirectoryBrowsed += OnDestinationDirectoryBrowsed;
            _view.TemplateChanged += OnTemplateModified;
            _view.TemplateRemoved += OnTemplateRemoved;
            _view.PassthruMatchingTracksChanged += v => _passthruMatchingTracks = v;
            _view.AudioQualityPresetModified += OnAudioQualityPresetModified;
            _view.AudioQualityPresetRemoved += OnAudioQualityPresetRemoved;
            _view.VideoAspectRatioPresetModified += OnVideoAspectRatioPresetModified;
            _view.VideoAspectRatioPresetRemoved += OnVideoAspectRatioPresetRemoved;
            _view.VideoCodecQualityModified += OnVideoCodecQualityModified;
            _view.VideoSizePresetModified += OnVideoSizePresetModified;
            _view.VideoSizePresetRemoved += OnVideoSizePresetRemoved;
            _view.SelectedX264PresetChanged += v => _selectedX264Preset = X264PresetOptions[v];
            _view.SelectedX265PresetChanged += v => _selectedX265Preset = X265PresetOptions[v];
            _view.HevcTagChanged += v => _hevcTag = v;
            _view.AacCodecChanged += v => _aacCodec = v;
            _view.Ac3CodecChanged += v => _ac3Codec = v;
            _view.CropDetectOptionsChanged += v => _cropDetectOptions = v;
            _view.DenoiseOptionsChanged += v => _denoiseOptions = v;
            _view.TonemapOptionsChanged += v => _tonemapOptions = v;
            _view.IsTraceLoggingEnabledChanged += v => _isTraceLoggingEnabled = v;
        }

        #endregion

        #region Methods

        #region Event Handlers

        void OnReady()
        {
            _isLoading = true;
            _isDirty = false;

            DestinationDirectoryModeOptions = Enum.GetValues(typeof(AutomationMode))
                .Cast<AutomationMode>()
                .Select(o => new DisplayValue(o))
                .ToKeyedCollection();
            DeinterlaceModeOptions = Enum.GetValues(typeof(SmartSwitchOption))
                .Cast<SmartSwitchOption>()
                .Select(o => new DisplayValue(o))
                .ToKeyedCollection();
            X264PresetOptions = new KeyedCollection<DisplayValue>
            {
                new DisplayValue("ultrafast"),
                new DisplayValue("superfast"),
                new DisplayValue("veryfast"),
                new DisplayValue("faster"),
                new DisplayValue("fast"),
                new DisplayValue("medium"),
                new DisplayValue("slow"),
                new DisplayValue("slower"),
                new DisplayValue("veryslow"),
                new DisplayValue("placebo"),
            };
            X265PresetOptions = _x264PresetOptions;
            AudioFormatOptions = new KeyedCollection<DisplayValue>
            {
                EmptyDisplayValue,
                GetAudioFormatOption(AudioFormat.Aac),
                GetAudioFormatOption(AudioFormat.Ac3)
            };
            AudioMixdownOptions = Enumerable.Repeat(EmptyDisplayValue, 1)
                .Concat(
                    Enum.GetValues(typeof(AudioMixdown))
                        .Cast<AudioMixdown>()
                        .Where(AudioUtility.IsEncodable)
                        .Select(GetAudioMixdownOption))
                .ToKeyedCollection();
            Load(_tricycleConfigManager.Config);
            Load(_ffmpegConfigManager.Config);
            Load(_templateManager.Config);

            _isLoading = false;
        }

        void OnExited()
        {
            if (_isDirty)
            {
                Save();
            }

            _appManager.RaiseModalClosed();
        }

        async void OnDestinationDirectoryBrowsed()
        {
            try
            {
                FolderBrowserResult result = await _folderBrowser.Browse(_destinationDirectory);

                if (result.Confirmed)
                {
                    _view.DestinationDirectory = result.FolderName;
                }
            }
            catch (Exception ex)
            {
                Trace.WriteLine(ex.Message);
                Debug.WriteLine(ex.StackTrace);
            }
        }

        void OnTemplateModified(Template template)
        {
            if (_isLoading)
            {
                return;
            }

            _isDirty = true;

            _templates.Replace(template);
        }

        void OnTemplateRemoved(string key)
        {
            _isDirty = true;

            _templates.Remove(key);
        }

        void OnAudioQualityPresetModified(AudioQualityPreset preset)
        {
            if (_isLoading)
            {
                return;
            }

            _isDirty = true;
            preset.RemoveDisabled = false;

            _audioQualityPresets.Replace(preset);

            if (!_audioQualityPresets.Any(p => p.Format == null &&
                                               p.Mixdown == null &&
                                               !p.Quality.HasValue))
            {
                _audioQualityPresets.Add(GetAudioQualityPreset());
                _view.AudioQualityPresets = _audioQualityPresets;
            }
        }

        void OnAudioQualityPresetRemoved(string key)
        {
            _isDirty = true;

            _audioQualityPresets.Remove(key);
        }

        void OnVideoAspectRatioPresetModified(VideoAspectRatioPreset preset)
        {
            if (_isLoading)
            {
                return;
            }

            _isDirty = true;
            preset.RemoveDisabled = false;

            _videoAspectRatioPresets.Replace(preset);

            if (!_videoSizePresets.Any(p => string.IsNullOrEmpty(p.Name) &&
                                            !p.Width.HasValue &&
                                            !p.Height.HasValue))
            {
                _videoAspectRatioPresets.Add(GetVideoAspectRatioPreset());
                _view.VideoAspectRatioPresets = _videoAspectRatioPresets;
            }
        }

        void OnVideoAspectRatioPresetRemoved(string key)
        {
            _isDirty = true;

            _videoAspectRatioPresets.Remove(key);
        }

        void OnVideoCodecQualityModified(VideoCodecQuality quality)
        {
            if (_isLoading)
            {
                return;
            }

            _isDirty = true;

            _videoCodecQualities.Replace(quality);
        }

        void OnVideoSizePresetModified(VideoSizePreset preset)
        {
            if (_isLoading)
            {
                return;
            }

            _isDirty = true;
            preset.RemoveDisabled = false;

            _videoSizePresets.Replace(preset);

            if (!_videoSizePresets.Any(p => string.IsNullOrEmpty(p.Name) &&
                                            !p.Width.HasValue &&
                                            !p.Height.HasValue))
            {
                _videoSizePresets.Add(GetVideoSizePreset());
                _view.VideoSizePresets = _videoSizePresets;
            }
        }

        void OnVideoSizePresetRemoved(string key)
        {
            _isDirty = true;

            _videoSizePresets.Remove(key);
        }

        void OnAppQuitting()
        {
            if (_isDirty)
            {
                Save();
            }

            _appManager.RaiseQuitConfirmed();
        }

        #endregion

        #region Helpers

        void Load(TricycleConfig config)
        {
            TricycleVideoCodec hevcCodec = config.Video?.Codecs?.GetValueOrDefault(VideoFormat.Hevc);

            _view.AlertOnCompletion = config.CompletionAlert;
            DeleteIncompleteFiles = config.DeleteIncompleteFiles;
            PreferForcedSubtitles = config.ForcedSubtitlesOnly;
            PreferSoftSubtitles = config.PreferSoftSubtitles;
            Mp4FileExtension = config.DefaultFileExtensions?.GetValueOrDefault(ContainerFormat.Mp4);
            MkvFileExtension = config.DefaultFileExtensions?.GetValueOrDefault(ContainerFormat.Mkv);
            SelectedDestinationDirectoryMode = new DisplayValue(config.DestinationDirectoryMode);
            DestinationDirectory = string.IsNullOrWhiteSpace(config.DestinationDirectory)
                ? _defaultDestinationDirectory
                : config.DestinationDirectory;
            SelectedDeinterlaceMode = config.Video?.Deinterlace != null
                ? new DisplayValue(config.Video?.Deinterlace)
                : null;
            SizeDivisor = config.Video?.SizeDivisor;
            VideoCodecQualities = new KeyedCollection<VideoCodecQuality>
            {
                GetVideoCodecQuality(config.Video?.Codecs?.GetValueOrDefault(VideoFormat.Avc)),
                GetVideoCodecQuality(hevcCodec)
            };
            HevcTag = hevcCodec?.Tag;
            PassthruMatchingTracks = config.Audio?.PassthruMatchingTracks ?? false;
            IsTraceLoggingEnabled = config.Trace;

            LoadVideoSizePresets(config.Video?.SizePresets);
            LoadVideoAspectRatioPresets(config.Video?.AspectRatioPresets);
            Load(config.Audio?.Codecs);
        }

        void LoadVideoSizePresets(IDictionary<string, Dimensions> dictionary)
        {
            var presets = dictionary?.Select(p => GetVideoSizePreset(p)).ToKeyedCollection() ??
                          new KeyedCollection<VideoSizePreset>();

            presets.Add(GetVideoSizePreset());

            VideoSizePresets = presets;
        }

        void LoadVideoAspectRatioPresets(IDictionary<string, Dimensions> dictionary)
        {
            var presets = dictionary?.Select(p => GetVideoAspectRatioPreset(p)).ToKeyedCollection() ??
                          new KeyedCollection<VideoAspectRatioPreset>();

            presets.Add(GetVideoAspectRatioPreset());

            VideoAspectRatioPresets = presets;
        }

        void Load(IDictionary<AudioFormat, TricycleAudioCodec> dictionary)
        {
            var presets = new KeyedCollection<AudioQualityPreset>();

            if (dictionary != null)
            {
                foreach (var pair in dictionary)
                {
                    var format = pair.Key;
                    var configPresets = pair.Value?.Presets;

                    if (configPresets != null)
                    {
                        foreach (AudioPreset preset in configPresets)
                        {
                            presets.Add(GetAudioQualityPreset(format, preset));
                        }
                    }
                }
            }

            presets.Add(GetAudioQualityPreset());

            AudioQualityPresets = presets;
        }

        void Load(FFmpegConfig config)
        {
            string x264Preset = config.Video?.Codecs?.GetValueOrDefault(VideoFormat.Avc)?.Preset;
            string x265Preset = config.Video?.Codecs?.GetValueOrDefault(VideoFormat.Hevc)?.Preset;

            SelectedX264Preset = string.IsNullOrWhiteSpace(x264Preset) ? null : new DisplayValue(x264Preset);
            SelectedX265Preset = string.IsNullOrWhiteSpace(x265Preset) ? null : new DisplayValue(x265Preset);
            AacCodec = config.Audio?.Codecs?.GetValueOrDefault(AudioFormat.Aac)?.Name;
            Ac3Codec = config.Audio?.Codecs?.GetValueOrDefault(AudioFormat.Ac3)?.Name;
            CropDetectOptions = config.Video?.CropDetectOptions;
            DeinterlaceOptions = config.Video?.DeinterlaceOptions;
            DenoiseOptions = config.Video?.DenoiseOptions;
            TonemapOptions = config.Video?.TonemapOptions;
        }

        void Load(Dictionary<string, JobTemplate> templates)
        {
            Templates.Clear();

            foreach (var template in templates.OrderBy(t => t.Key))
            {
                _templates.Add(GetTemplate(template));
            }

            Templates = _templates;
        }

        VideoCodecQuality GetVideoCodecQuality(TricycleVideoCodec codec) => new VideoCodecQuality
        {
            Key = Guid.NewGuid().ToString(),
            Min = codec?.QualityRange.Min,
            Max = codec?.QualityRange.Max,
            Steps = codec?.QualitySteps
        };

        VideoSizePreset GetVideoSizePreset(KeyValuePair<string, Dimensions>? pair = null) => new VideoSizePreset
        {
            Key = Guid.NewGuid().ToString(),
            Name = pair?.Key,
            Width = pair?.Value.Width,
            Height = pair?.Value.Height,
            RemoveDisabled = !pair.HasValue
        };

        VideoAspectRatioPreset GetVideoAspectRatioPreset(KeyValuePair<string, Dimensions>? pair = null) =>
            new VideoAspectRatioPreset
            {
                Key = Guid.NewGuid().ToString(),
                Name = pair?.Key,
                Width = pair?.Value.Width,
                Height = pair?.Value.Height,
                RemoveDisabled = !pair.HasValue
            };

        AudioQualityPreset GetAudioQualityPreset(AudioFormat? format = null, AudioPreset preset = null) =>
            new AudioQualityPreset
            {
                Key = Guid.NewGuid().ToString(),
                Format = format?.ToString(),
                Mixdown = preset?.Mixdown.ToString(),
                Quality = preset?.Quality,
                RemoveDisabled = preset == null
            };

        DisplayValue GetAudioFormatOption(AudioFormat format)
        {
            // TODO: get text from translations
            return new DisplayValue(format, AudioUtility.GetFormatName(format));
        }

        DisplayValue GetAudioMixdownOption(AudioMixdown mixdown)
        {
            // TODO: get text from translations
            return new DisplayValue(mixdown, AudioUtility.GetMixdownName(mixdown));
        }

        Template GetTemplate(KeyValuePair<string, JobTemplate> template) => new Template
        {
            Key = Guid.NewGuid().ToString(),
            Name = template.Key,
            RemoveDisabled = false
        };

        void Save()
        {
            _tricycleConfigManager.Config = GenerateTricycleConfig();
            _ffmpegConfigManager.Config = GenerateFFmpegConfig();
            _templateManager.Config = GenerateTemplates();

            _tricycleConfigManager.Save();
            _ffmpegConfigManager.Save();
            _templateManager.Save();
        }

        TricycleConfig GenerateTricycleConfig() => new TricycleConfig
        {
            CompletionAlert = AlertOnCompletion,
            DeleteIncompleteFiles = DeleteIncompleteFiles,
            ForcedSubtitlesOnly = PreferForcedSubtitles,
            PreferSoftSubtitles = PreferSoftSubtitles,
            Audio = GenerateTricycleAudioConfig(),
            Video = GenerateTricycleVideoConfig(),
            DefaultFileExtensions = new Dictionary<ContainerFormat, string>
            {
                { ContainerFormat.Mp4, Mp4FileExtension },
                { ContainerFormat.Mkv, MkvFileExtension }
            },
            DestinationDirectoryMode = (AutomationMode)SelectedDestinationDirectoryMode.Value,
            DestinationDirectory = DestinationDirectory,
            Trace = IsTraceLoggingEnabled
        };

        TricycleAudioConfig GenerateTricycleAudioConfig()
        {
            var result = new TricycleAudioConfig()
            {
                PassthruMatchingTracks = PassthruMatchingTracks
            };

            foreach (AudioQualityPreset preset in AudioQualityPresets)
            {
                if (preset.Format == EmptyDisplayValue.Key ||
                    preset.Mixdown == EmptyDisplayValue.Key ||
                    !preset.Quality.HasValue)
                {
                    continue;
                }

                if (result.Codecs == null)
                {
                    result.Codecs = new Dictionary<AudioFormat, TricycleAudioCodec>();
                }

                var format = (AudioFormat)_audioFormatOptions[preset.Format].Value;
                var codec = result.Codecs.GetValueOrDefault(format);

                if (codec == null)
                {
                    codec = new TricycleAudioCodec
                    {
                        Presets = new List<AudioPreset>()
                    };

                    result.Codecs[format] = codec;
                }

                codec.Presets.Add(new AudioPreset
                {
                    Mixdown = (AudioMixdown)_audioMixdownOptions[preset.Mixdown].Value,
                    Quality = preset.Quality.Value
                });
            }

            return result;
        }

        TricycleVideoConfig GenerateTricycleVideoConfig() => new TricycleVideoConfig
        {
            Deinterlace = SelectedDeinterlaceMode?.Value as SmartSwitchOption? ?? SmartSwitchOption.Auto,
            SizeDivisor = SizeDivisor ?? 8,
            Codecs = VideoCodecQualities.ToDictionary(
                q => (VideoFormat)Enum.Parse(typeof(VideoFormat), q.Key),
                q => GenerateVideoCodec(q)),
            SizePresets = GenerateVideoSizePresets(VideoSizePresets),
            AspectRatioPresets = GenerateVideoAspectRatioPresets(VideoAspectRatioPresets)
        };

        TricycleVideoCodec GenerateVideoCodec(VideoCodecQuality quality, string tag = null)
        {
            var result = new TricycleVideoCodec
            {
                Tag = tag
            };

            if (quality.Min.HasValue &&
                quality.Max.HasValue &&
                quality.Steps.HasValue)
            {
                result.QualityRange = new Range<decimal>(quality.Min.Value, quality.Max.Value);
                result.QualitySteps = quality.Steps.Value;
            }
            else
            {
                result.QualityRange = new Range<decimal>(22, 18);
                result.QualitySteps = 4;
            }

            return result;
        }

        IDictionary<string, Dimensions> GenerateVideoAspectRatioPresets(IList<VideoAspectRatioPreset> presets)
        {
            IDictionary<string, Dimensions> result = null;

            foreach (var preset in presets)
            {
                if (string.IsNullOrWhiteSpace(preset.Name) ||
                    !preset.Width.HasValue ||
                    !preset.Height.HasValue)
                {
                    continue;
                }

                if (result == null)
                {
                    result = new Dictionary<string, Dimensions>();
                }

                // TODO: change Dimensions properties to decimal
                result[preset.Name] = new Dimensions((int)preset.Width.Value, (int)preset.Height.Value);
            }

            return result;
        }

        IDictionary<string, Dimensions> GenerateVideoSizePresets(IList<VideoSizePreset> presets)
        {
            IDictionary<string, Dimensions> result = null;

            foreach (var preset in presets)
            {
                if (string.IsNullOrWhiteSpace(preset.Name) ||
                    !preset.Width.HasValue ||
                    !preset.Height.HasValue)
                {
                    continue;
                }

                if (result == null)
                {
                    result = new Dictionary<string, Dimensions>();
                }

                result[preset.Name] = new Dimensions(preset.Width.Value, preset.Height.Value);
            }

            return result;
        }

        FFmpegConfig GenerateFFmpegConfig()
        {
            return new FFmpegConfig
            {
                Audio = GenerateFFmpegAudioConfig(),
                Video = GenerateFFmpegVideoConfig()
            };
        }

        FFmpegAudioConfig GenerateFFmpegAudioConfig()
        {
            return new FFmpegAudioConfig
            {
                Codecs = new Dictionary<AudioFormat, FFmpegAudioCodec>()
                {
                    {
                        AudioFormat.Aac,
                        new FFmpegAudioCodec
                        {
                            Name = AacCodec
                        }
                    },
                    {
                        AudioFormat.Ac3,
                        new FFmpegAudioCodec
                        {
                            Name = Ac3Codec
                        }
                    }
                }
            };
        }

        FFmpegVideoConfig GenerateFFmpegVideoConfig()
        {
            return new FFmpegVideoConfig
            {
                Codecs = new Dictionary<VideoFormat, FFmpegVideoCodec>()
                {
                    {
                        VideoFormat.Avc,
                        new FFmpegVideoCodec
                        {
                            Preset = SelectedX264Preset?.ToString()
                        }
                    },
                    {
                        VideoFormat.Hevc,
                        new FFmpegVideoCodec
                        {
                            Preset = SelectedX265Preset?.ToString()
                        }
                    }
                },
                CropDetectOptions = CropDetectOptions,
                DeinterlaceOptions = DeinterlaceOptions,
                DenoiseOptions = DenoiseOptions,
                TonemapOptions = TonemapOptions
            };
        }

        Dictionary<string, JobTemplate> GenerateTemplates()
        {
            var result = new Dictionary<string, JobTemplate>();

            foreach (Template viewModel in _templates)
            {
                if (string.IsNullOrWhiteSpace(viewModel.Name))
                {
                    continue;
                }

                var template = _templateManager.Config.GetValueOrDefault(viewModel.Name);

                if (template != null)
                {
                    result[viewModel.Name.Trim()] = template;
                }
            }

            return result;
        }

        #endregion

        #endregion
    }
}
using System;
using System.Collections.Generic;
using Tricycle.UI.Models;

namespace Tricycle.UI.Views
{
    public interface IConfigView
    {
        bool AlertOnCompletion { set; }
        bool DeleteIncompleteFiles { set; }
        bool PreferForcedSubtitles { set; }
        bool PreferSoftSubtitles { set; }
        string Mp4FileExtension { set; }
        string MkvFileExtension { set; }
        IList<DisplayValue> DestinationDirectoryModeOptions { set; }
        string SelectedDestinationDirectoryModeKey { set; }
        string DestinationDirectory { set; }
        IList<Template> Templates { set; }
        IList<DisplayValue> DeinterlaceModeOptions { set; }
        string SelectedDeinterlaceModeKey { set; }
        int SizeDivisor { set; }
        IList<VideoCodecQuality> VideoCodecQualities { set; }
        IList<VideoSizePreset> VideoSizePresets { set; }
        IList<VideoAspectRatioPreset> VideoAspectRatioPresets { set; }
        bool PassthruMatchingTracks { set; }
        IList<DisplayValue> AudioFormatOptions { set; }
        IList<DisplayValue> AudioMixdownOptions { set; }
        IList<AudioQualityPreset> AudioQualityPresets { set; }
        IList<DisplayValue> X264PresetOptions { set; }
        string SelectedX264PresetKey { set; }
        IList<DisplayValue> X265PresetOptions { set; }
        string SelectedX265PresetKey { set; }
        string HevcTag { set; }
        string AacCodec { set; }
        string Ac3Codec { set; }
        string CropDetectOptions { set; }
        string DeinterlaceOptions { set; }
        string DenoiseOptions { set; }
        string TonemapOptions { set; }
        bool IsTraceLoggingEnabled { set; }

        event Action Ready;
        event Action Exited;
        event Action DestinationDirectoryBrowsed;
        event Action<bool> AlertOnCompletionChanged;
        event Action<bool> DeleteIncompleteFilesChanged;
        event Action<bool> PreferForcedSubtitlesChanged;
        event Action<bool> PreferSoftSubtitlesChanged;
        event Action<string> Mp4FileExtensionChanged;
        event Action<string> MkvFileExtensionChanged;
        event Action<string> SelectedDestinationDirectoryModeChanged;
        event Action<string> DestinationDirectoryChanged;
        event Action<Template> TemplateChanged;
        event Action<string> SelectedDeinterlaceModeChanged;
        event Action<int> SizeDivisorChanged;
        event Action<VideoCodecQuality> VideoCodecQualityChanged;
        event Action<VideoSizePreset> VideoSizePresetChanged;
        event Action<VideoAspectRatioPreset> VideoAspectRatioPresetChanged;
        event Action<bool> PassthruMatchingTracksChanged;
        event Action<AudioQualityPreset> AudioQualityPresetChanged;
        event Action<string> SelectedX264PresetChanged;
        event Action<string> SelectedX265PresetChanged;
        event Action<string> HevcTagChanged;
        event Action<string> AacCodecChanged;
        event Action<string> Ac3CodecChanged;
        event Action<string> CropDetectOptionsChanged;
        event Action<string> DeinterlaceOptionsChanged;
        event Action<string> DenoiseOptionsChanged;
        event Action<string> TonemapOptionsChanged;
        event Action<bool> IsTraceLoggingEnabledChanged;
    }
}
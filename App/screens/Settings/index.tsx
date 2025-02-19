import React, {useState} from 'react';
import {Text, View} from 'react-native';

import {
  AudioQualityPreset,
  Removable,
  Template,
  VideoAspectRatioPreset,
  VideoCodecQuality,
  VideoSizePreset,
} from '@models';
import {
  AdvancedSettings,
  AudioSettings,
  GeneralSettings,
  SelectionList,
  VideoSettings,
} from '@components';
import styles from './styles';

function removeRemovable<T extends Removable>(
  removables: T[],
  key: string,
): T[] {
  return (removables || []).filter(r => r.key !== key);
}

function renameTemplate(
  templates: Template[],
  key: string,
  name: string,
): Template[] {
  const result = Array.from(templates || []);
  const template = result.find(t => t.key === key);

  if (template) {
    template.name = name;
  }

  return result;
}

function updateVideoCodecQualityValue(
  qualities: VideoCodecQuality[],
  key: string,
  propertyName: keyof VideoCodecQuality,
  value: number | undefined,
): VideoCodecQuality[] {
  const result = Array.from(qualities || []);
  const quality = result.find(p => p.key === key);

  if (quality) {
    (quality[propertyName] as number | undefined) = value;
  }

  return result;
}

function updateVideoSizePresetValue(
  presets: VideoSizePreset[],
  key: string,
  propertyName: keyof VideoSizePreset,
  value: string | number | undefined,
): VideoSizePreset[] {
  const result = Array.from(presets || []);
  const preset = result.find(p => p.key === key);

  if (preset) {
    if (
      propertyName === 'name' &&
      (typeof value === 'string' || value === undefined)
    ) {
      preset.name = value || '';
    } else if (typeof value === 'number' || value === undefined) {
      (preset[propertyName] as number | undefined) = value;
    }
  }

  return result;
}

function updateVideoAspectRatioPresetValue(
  presets: VideoAspectRatioPreset[],
  key: string,
  propertyName: keyof VideoAspectRatioPreset,
  value: string | number | undefined,
): VideoAspectRatioPreset[] {
  const result = Array.from(presets || []);
  const preset = result.find(p => p.key === key);

  if (preset) {
    if (
      propertyName === 'name' &&
      (typeof value === 'string' || value === undefined)
    ) {
      preset.name = value || '';
    } else if (typeof value === 'number' || value === undefined) {
      (preset[propertyName] as number | undefined) = value;
    }
  }

  return result;
}

function updateAudioQualityPresetFormat(
  presets: AudioQualityPreset[],
  key: string,
  format: string,
) {
  const result = Array.from(presets || []);
  const preset = result.find(p => p.key === key);

  if (preset) {
    preset.format = format;
  }

  return result;
}

function updateAudioQualityPresetMixdown(
  presets: AudioQualityPreset[],
  key: string,
  mixdown: string,
) {
  const result = Array.from(presets || []);
  const preset = result.find(p => p.key === key);

  if (preset) {
    preset.mixdown = mixdown;
  }

  return result;
}

function updateAudioQualityPresetQuality(
  presets: AudioQualityPreset[],
  key: string,
  quality: number | undefined,
) {
  const result = Array.from(presets || []);
  const preset = result.find(p => p.key === key);

  if (preset) {
    preset.quality = quality || 0;
  }

  return result;
}

const sections = [
  {key: 'general', text: 'General'},
  {key: 'video', text: 'Video'},
  {key: 'audio', text: 'Audio'},
  {key: 'advanced', text: 'Advanced'},
];
const deinterlaceItems = [
  {key: 'off', text: 'Off'},
  {key: 'auto', text: 'Auto'},
  {key: 'on', text: 'On'},
];
const audioFormatItems = [
  {key: 'none', text: ''},
  {key: 'aac', text: 'AAC'},
  {key: 'dolby', text: 'Dolby Digital'},
];
const mixdownItems = [
  {key: 'none', text: ''},
  {key: 'mono', text: 'Mono'},
  {key: 'stereo', text: 'Stereo'},
  {key: 'surround', text: 'Surround'},
];
const presetItems = [
  {key: 'fast', text: 'Fast'},
  {key: 'medium', text: 'Medium'},
  {key: 'slow', text: 'Slow'},
];

export default function Settings() {
  const [section, setSection] = useState('general');
  const [completionAlertEnabled, setCompletionAlertEnabled] = useState(false);
  const [incompleteDeletionEnabled, setIncompleteDeletionEnabled] =
    useState(false);
  const [forcedSubtitlesEnabled, setForcedSubtitlesEnabled] = useState(false);
  const [softSubtitlesEnabled, setSoftSubtitlesEnabled] = useState(false);
  const [mp4FileExtension, setMp4FileExtension] = useState('m4v');
  const [mkvFileExtension, setMkvFileExtension] = useState('mkv');
  const [destinationMode, setDestinationMode] = useState('auto');
  const [templates, setTemplates] = useState<Template[]>([
    {key: '1', name: 'Template 1'},
    {key: '2', name: 'Template 2'},
    {key: '3', name: 'Template 3'},
    {key: '4', name: 'Template 4'},
    {key: '5', name: 'Template 5'},
    {key: '6', name: 'Template 6'},
    {key: '7', name: 'Template 7'},
    {key: '8', name: 'Template 8'},
    {key: '9', name: 'Template 9'},
  ]);
  const [deinterlace, setDeinterlace] = useState('auto');
  const [sizeDivisor, setSizeDivisor] = useState<number | undefined>(8);
  const [videoCodecQualities, setVideoCodecQualities] = useState<
    VideoCodecQuality[]
  >([
    {key: 'avc', name: 'AVC', min: 22.0, max: 20.0, steps: 3},
    {key: 'hevc', name: 'HEVC', min: 22.0, max: 18.0, steps: 4},
  ]);
  const [videoSizePresets, setVideoSizePresets] = useState<VideoSizePreset[]>([
    {key: '1', name: '480p', width: 720, height: 480},
    {key: '2', name: '720p', width: 1280, height: 720},
    {key: '3', name: '1080p', width: 1920, height: 1080},
    {key: '4', name: '4K', width: 3840, height: 2160},
  ]);
  const [videoAspectRatioPresets, setVideoAspectRatioPresets] = useState<
    VideoAspectRatioPreset[]
  >([
    {key: '1', name: '4:3', width: 4, height: 3},
    {key: '2', name: '16:9', width: 16, height: 9},
    {key: '3', name: '21:9', width: 21, height: 9},
  ]);
  const [passthruMatchingTracksEnabled, setPassthruMatchingTracksEnabled] =
    useState(true);
  const [qualityPresets, setQualityPresets] = useState<AudioQualityPreset[]>([
    {key: '1', format: 'aac', mixdown: 'stereo', quality: 160},
    {key: '2', format: 'dolby', mixdown: 'surround', quality: 640},
  ]);
  const [traceLoggingEnabled, setTraceLoggingEnabled] = useState(false);
  const [x264Preset, setX264Preset] = useState('medium');
  const [x265Preset, setX265Preset] = useState('medium');
  const [hevcTag, setHevcTag] = useState('hvc1');
  const [aacCodec, setAacCodec] = useState('aac');
  const [dolbyDigitalCodec, setDolbyDigitalCodec] = useState('ac3');
  const [cropDetectOptions, setCropDetectOptions] = useState('0.125:2:0');
  const [deinterlaceOptions, setDeinterlaceOptions] = useState('bwdif');
  const [denoiseOptions, setDenoiseOptions] = useState('hqdn3d=2:1:5:5');
  const [tonemapOptions, setTonemapOptions] = useState('hable:desat=0');

  return (
    <View style={styles.container}>
      <SelectionList
        style={styles.list}
        items={sections}
        selectedKey={section}
        onSelectionChange={setSection}
      />
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {sections.find(s => s.key === section)!.text}
          </Text>
        </View>
        {section === 'general' && (
          <GeneralSettings
            completionAlertEnabled={completionAlertEnabled}
            onCompletionAlertChange={setCompletionAlertEnabled}
            incompleteDeletionEnabled={incompleteDeletionEnabled}
            onIncompleteDeletionChange={setIncompleteDeletionEnabled}
            forcedSubtitlesEnabled={forcedSubtitlesEnabled}
            onForcedSubtitlesChange={setForcedSubtitlesEnabled}
            softSubtitlesEnabled={softSubtitlesEnabled}
            onSoftSubtitlesChange={setSoftSubtitlesEnabled}
            mp4FileExtension={mp4FileExtension}
            onMp4FileExtensionChange={setMp4FileExtension}
            mkvFileExtension={mkvFileExtension}
            onMkvFileExtensionChange={setMkvFileExtension}
            destinationModeItems={[
              {key: 'manual', text: 'Manual'},
              {key: 'auto', text: 'Auto'},
            ]}
            destinationMode={destinationMode}
            onDestinationModeChange={setDestinationMode}
            destinationFolder="/Users/kenny/Temp"
            isDestinationFolderBrowseDisabled={true}
            templates={templates}
            onTemplateNameChange={(key, name) =>
              setTemplates(oldValue => renameTemplate(oldValue, key, name))
            }
            onTemplateRemove={key =>
              setTemplates(oldValue => removeRemovable(oldValue, key))
            }
          />
        )}
        {section === 'video' && (
          <VideoSettings
            deinterlaceItems={deinterlaceItems}
            deinterlace={deinterlace}
            onDeinterlaceChange={setDeinterlace}
            sizeDivisor={sizeDivisor}
            onSizeDivisorChange={setSizeDivisor}
            codecQualities={videoCodecQualities}
            onCodecQualityMinChange={(key, value) =>
              setVideoCodecQualities(oldValue =>
                updateVideoCodecQualityValue(oldValue, key, 'min', value),
              )
            }
            onCodecQualityMaxChange={(key, value) =>
              setVideoCodecQualities(oldValue =>
                updateVideoCodecQualityValue(oldValue, key, 'max', value),
              )
            }
            onCodecQualityStepsChange={(key, value) =>
              setVideoCodecQualities(oldValue =>
                updateVideoCodecQualityValue(oldValue, key, 'steps', value),
              )
            }
            sizePresets={videoSizePresets}
            onSizePresetNameChange={(key, value) =>
              setVideoSizePresets(oldValue =>
                updateVideoSizePresetValue(oldValue, key, 'name', value),
              )
            }
            onSizePresetWidthChange={(key, value) =>
              setVideoSizePresets(oldValue =>
                updateVideoSizePresetValue(oldValue, key, 'width', value),
              )
            }
            onSizePresetHeightChange={(key, value) =>
              setVideoSizePresets(oldValue =>
                updateVideoSizePresetValue(oldValue, key, 'height', value),
              )
            }
            onSizePresetRemove={key =>
              setVideoSizePresets(oldValue => removeRemovable(oldValue, key))
            }
            aspectRatioPresets={videoAspectRatioPresets}
            onAspectRatioPresetNameChange={(key, value) =>
              setVideoAspectRatioPresets(oldValue =>
                updateVideoAspectRatioPresetValue(oldValue, key, 'name', value),
              )
            }
            onAspectRatioPresetWidthChange={(key, value) =>
              setVideoAspectRatioPresets(oldValue =>
                updateVideoAspectRatioPresetValue(
                  oldValue,
                  key,
                  'width',
                  value,
                ),
              )
            }
            onAspectRatioPresetHeightChange={(key, value) =>
              setVideoAspectRatioPresets(oldValue =>
                updateVideoAspectRatioPresetValue(
                  oldValue,
                  key,
                  'height',
                  value,
                ),
              )
            }
            onAspectRatioPresetRemove={key =>
              setVideoAspectRatioPresets(oldValue =>
                removeRemovable(oldValue, key),
              )
            }
          />
        )}
        {section === 'audio' && (
          <AudioSettings
            passthruMatchingTracksEnabled={passthruMatchingTracksEnabled}
            onPassthruMatchingTracksChange={setPassthruMatchingTracksEnabled}
            qualityPresets={qualityPresets}
            formatItems={audioFormatItems}
            mixdownItems={mixdownItems}
            onQualityPresetFormatChange={(key, format) =>
              setQualityPresets(oldValue =>
                updateAudioQualityPresetFormat(oldValue, key, format),
              )
            }
            onQualityPresetMixdownChange={(key, mixdown) =>
              setQualityPresets(oldValue =>
                updateAudioQualityPresetMixdown(oldValue, key, mixdown),
              )
            }
            onQualityPresetQualityChange={(key, quality) =>
              setQualityPresets(oldValue =>
                updateAudioQualityPresetQuality(oldValue, key, quality),
              )
            }
            onQualityPresetRemove={key =>
              setQualityPresets(oldValue => removeRemovable(oldValue, key))
            }
          />
        )}
        {section === 'advanced' && (
          <AdvancedSettings
            traceLoggingEnabled={traceLoggingEnabled}
            onTraceLoggingChange={setTraceLoggingEnabled}
            x264PresetItems={presetItems}
            x264Preset={x264Preset}
            onX264PresetChange={setX264Preset}
            x265PresetItems={presetItems}
            x265Preset={x265Preset}
            onX265PresetChange={setX265Preset}
            hevcTag={hevcTag}
            onHevcTagChange={setHevcTag}
            aacCodec={aacCodec}
            onAacCodecChange={setAacCodec}
            dolbyDigitalCodec={dolbyDigitalCodec}
            onDolbyDigitalCodecChange={setDolbyDigitalCodec}
            cropDetectOptions={cropDetectOptions}
            onCropDetectOptionsChange={setCropDetectOptions}
            deinterlaceOptions={deinterlaceOptions}
            onDeinterlaceOptionsChange={setDeinterlaceOptions}
            denoiseOptions={denoiseOptions}
            onDenoiseOptionsChange={setDenoiseOptions}
            tonemapOptions={tonemapOptions}
            onTonemapOptionsChange={setTonemapOptions}
          />
        )}
      </View>
    </View>
  );
}

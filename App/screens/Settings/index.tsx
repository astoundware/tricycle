import React, {useState} from 'react';
import {Text, View} from 'react-native';

import {Template} from '@models';
import {AdvancedSettings, GeneralSettings, SelectionList} from '@components';
import styles from './styles';

function renameTemplate(templates: Template[], index: number, name: string) {
  let result = (templates || []).map(template => template);

  if (result.length > index) {
    result[index].name = name;
  }

  return result;
}

function removeTemplate(templates: Template[], index: number) {
  return (templates || []).filter((_, i) => i !== index);
}

const sections = [
  {key: 'general', text: 'General'},
  {key: 'advanced', text: 'Advanced'},
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
    {key: 1, name: 'Template 1'},
    {key: 2, name: 'Template 2'},
    {key: 3, name: 'Template 3'},
    {key: 4, name: 'Template 4'},
    {key: 5, name: 'Template 5'},
    {key: 6, name: 'Template 6'},
    {key: 7, name: 'Template 7'},
    {key: 8, name: 'Template 8'},
    {key: 9, name: 'Template 9'},
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
            onTemplateNameChange={(index, name) =>
              setTemplates(oldValue => renameTemplate(oldValue, index, name))
            }
            onTemplateRemove={index =>
              setTemplates(oldValue => removeTemplate(oldValue, index))
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

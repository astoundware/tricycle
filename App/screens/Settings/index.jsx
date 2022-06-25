import React, {useState} from 'react';
import {View} from 'react-native';

import {GeneralSettings} from '../../components';
import styles from './styles';

function renameTemplate(templates, index, name) {
  let result = (templates || []).map(template => template);

  if (result.length > index) {
    result[index].name = name;
  }

  return result;
}

function removeTemplate(templates, index) {
  return (templates || []).filter((template, i) => i !== index);
}

export default function Settings() {
  const [completionAlertEnabled, setCompletionAlertEnabled] = useState(false);
  const [incompleteDeletionEnabled, setIncompleteDeletionEnabled] =
    useState(false);
  const [forcedSubtitlesEnabled, setForcedSubtitlesEnabled] = useState(false);
  const [softSubtitlesEnabled, setSoftSubtitlesEnabled] = useState(false);
  const [mp4FileExtension, setMp4FileExtension] = useState('m4v');
  const [mkvFileExtension, setMkvFileExtension] = useState('mkv');
  const [destinationMode, setDestinationMode] = useState('auto');
  const [templates, setTemplates] = useState([
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

  return (
    <View style={styles.container}>
      <GeneralSettings
        completionAlertEnabled={completionAlertEnabled}
        onCompletionAlertChange={value => setCompletionAlertEnabled(value)}
        incompleteDeletionEnabled={incompleteDeletionEnabled}
        onIncompleteDeletionChange={value =>
          setIncompleteDeletionEnabled(value)
        }
        forcedSubtitlesEnabled={forcedSubtitlesEnabled}
        onForcedSubtitlesChange={value => setForcedSubtitlesEnabled(value)}
        softSubtitlesEnabled={softSubtitlesEnabled}
        onSoftSubtitlesChange={value => setSoftSubtitlesEnabled(value)}
        mp4FileExtension={mp4FileExtension}
        onMp4FileExtensionChange={value => setMp4FileExtension(value)}
        mkvFileExtension={mkvFileExtension}
        onMkvFileExtensionChange={value => setMkvFileExtension(value)}
        destinationModeItems={[
          {key: 'manual', text: 'Manual'},
          {key: 'auto', text: 'Auto'},
        ]}
        destinationMode={destinationMode}
        onDestinationModeChange={value => setDestinationMode(value)}
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
    </View>
  );
}

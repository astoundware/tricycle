import React, {useState} from 'react';
import {View} from 'react-native';

import {GeneralSettings} from '../../components';

export default function Settings() {
  const [isCompletionAlertEnabled, setIsCompletionAlertEnabled] =
    useState(false);
  const [isIncompleteDeletionEnabled, setIsIncompleteDeletionEnabled] =
    useState(false);
  const [isForcedSubtitlesEnabled, setIsForcedSubtitlesEnabled] =
    useState(false);
  const [isSoftSubtitlesEnabled, setIsSoftSubtitlesEnabled] = useState(false);
  const [mp4FileExtension, setMp4FileExtension] = useState('m4v');
  const [mkvFileExtension, setMkvFileExtension] = useState('mkv');
  const [destinationMode, setDestinationMode] = useState('auto');

  return (
    <View>
      <GeneralSettings
        isCompletionAlertEnabled={isCompletionAlertEnabled}
        onCompletionAlertEnabledChange={value =>
          setIsCompletionAlertEnabled(value)
        }
        isIncompleteDeletionEnabled={isIncompleteDeletionEnabled}
        onIncompleteDeletionChange={value =>
          setIsIncompleteDeletionEnabled(value)
        }
        isForcedSubtitlesEnabled={isForcedSubtitlesEnabled}
        onForcedSubtitlesChange={value => setIsForcedSubtitlesEnabled(value)}
        isSoftSubtitlesEnabled={isSoftSubtitlesEnabled}
        onSoftSubtitlesChange={value => setIsSoftSubtitlesEnabled(value)}
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
      />
    </View>
  );
}

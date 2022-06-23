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
        destinationModeItems={[
          {key: 'manual', text: 'Manual'},
          {key: 'auto', text: 'Auto'},
        ]}
        destinationMode={destinationMode}
        onDestinationModeChange={value => setDestinationMode(value)}
      />
    </View>
  );
}

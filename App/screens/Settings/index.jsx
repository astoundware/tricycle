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
      />
    </View>
  );
}

import React, {useState} from 'react';
import {View} from 'react-native';

import {GeneralSettings} from '../../components';

export default function Settings() {
  const [isCompletionAlertEnabled, setIsCompletionAlertEnabled] =
    useState(false);

  return (
    <View>
      <GeneralSettings
        isCompletionAlertEnabled={isCompletionAlertEnabled}
        onCompletionAlertEnabledChange={() =>
          setIsCompletionAlertEnabled(previousState => !previousState)
        }
      />
    </View>
  );
}

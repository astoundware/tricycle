import React from 'react';
import {View} from 'react-native';

import LabeledSwitch from '../LabeledSwitch';

export default function GeneralSettings({
  isCompletionAlertEnabled,
  onCompletionAlertEnabledChange,
}) {
  return (
    <View>
      <LabeledSwitch
        label="Show alert on completion"
        value={isCompletionAlertEnabled}
        onValueChange={onCompletionAlertEnabledChange}
      />
    </View>
  );
}

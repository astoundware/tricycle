import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import LabeledSwitch from '../LabeledSwitch';

export default function GeneralSettings({
  isCompletionAlertEnabled,
  onCompletionAlertEnabledChange,
}) {
  const {t} = useTranslation();

  return (
    <View>
      <LabeledSwitch
        label={t('settings.completionAlert')}
        value={isCompletionAlertEnabled}
        onValueChange={onCompletionAlertEnabledChange}
      />
    </View>
  );
}

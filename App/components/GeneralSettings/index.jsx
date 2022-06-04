import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import ImageButton from '../ImageButton';
import LabeledSwitch from '../LabeledSwitch';
import {trash} from '../../images';

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
      <ImageButton imageSource={trash} />
    </View>
  );
}

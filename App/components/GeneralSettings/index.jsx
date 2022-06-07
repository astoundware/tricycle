import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import ImageButton from '../ImageButton';
import LabeledSwitch from '../LabeledSwitch';
import {trash} from '../../images';

export default function GeneralSettings({
  isCompletionAlertEnabled,
  onCompletionAlertEnabledChange,
  isIncompleteDeletionEnabled,
  onIncompleteDeletionChange,
  isForcedSubtitlesEnabled,
  onForcedSubtitlesChange,
  isSoftSubtitlesEnabled,
  onSoftSubtitlesChange,
  mp4FileExtension,
  onMp4FileExtensionChange,
  mkvFileExtension,
  onMkvFileExtensionChange,
}) {
  const {t} = useTranslation();

  return (
    <View>
      <LabeledSwitch
        label={t('settings.completionAlert')}
        value={isCompletionAlertEnabled}
        onValueChange={onCompletionAlertEnabledChange}
      />
      <LabeledSwitch
        label={t('settings.deleteIncompleteFiles')}
        value={isIncompleteDeletionEnabled}
        onValueChange={onIncompleteDeletionChange}
      />
      <LabeledSwitch
        label={t('settings.enableForcedSubtitles')}
        value={isForcedSubtitlesEnabled}
        onValueChange={onForcedSubtitlesChange}
      />
      <LabeledSwitch
        label={t('settings.enableSoftSubtitles')}
        value={isSoftSubtitlesEnabled}
        onValueChange={onSoftSubtitlesChange}
      />
      <ImageButton imageSource={trash} />
    </View>
  );
}

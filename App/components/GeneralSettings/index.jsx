import React from 'react';
import {Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTranslation} from 'react-i18next';

import ImageButton from '../ImageButton';
import LabeledSwitch from '../LabeledSwitch';
import PlatformTextInput from '../PlatformTextInput';
import {trash} from '../../images';
import styles from './styles';

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
  destinationModeItems,
  destinationMode,
  onDestinationModeChange,
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
      <View style={styles.table}>
        <View style={styles.column}>
          <View style={[styles.row, styles.labelRow]}>
            <Text style={styles.label}>{t('settings.mp4FileExtension')}</Text>
          </View>
          <View style={[styles.row, styles.labelRow]}>
            <Text style={styles.label}>{t('settings.mkvFileExtension')}</Text>
          </View>
          <View style={[styles.row, styles.labelRow]}>
            <Text style={styles.label}>{t('settings.destinationFolder')}</Text>
          </View>
        </View>
        <View>
          <PlatformTextInput style={[styles.row, styles.input]} value="mp4" />
          <PlatformTextInput style={[styles.row, styles.input]} value="mkv" />
          <Picker
            style={[styles.row, styles.input]}
            selectedValue={destinationMode}
            onValueChange={onDestinationModeChange}>
            {(destinationModeItems || []).map(item => (
              <Picker.Item key={item.key} label={item.text} value={item.key} />
            ))}
          </Picker>
        </View>
      </View>
      <ImageButton imageSource={trash} />
    </View>
  );
}

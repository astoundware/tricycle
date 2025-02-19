import React from 'react';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {
  AudioQualityPreset,
  DisplayValue,
  KeyedActionHandler,
  KeyedValueChangeHandler,
  ValueChangeHandler
} from '@models';
import AudioQualityPresetTable from '../AudioQualityPresetTable';
import LabeledSwitch from '../LabeledSwitch';
import styles from './styles';

export type Props = {
  style?: any;
  passthruMatchingTracksEnabled?: boolean;
  onPassthruMatchingTracksChange?: ValueChangeHandler<boolean>;
  qualityPresets?: AudioQualityPreset[];
  formatItems?: DisplayValue[];
  mixdownItems?: DisplayValue[];
  onQualityPresetFormatChange?: KeyedValueChangeHandler<string>;
  onQualityPresetMixdownChange?: KeyedValueChangeHandler<string>;
  onQualityPresetQualityChange?: KeyedValueChangeHandler<number | undefined>;
  onQualityPresetRemove?: KeyedActionHandler;
};

export default function AudioSettings({
  style,
  passthruMatchingTracksEnabled,
  onPassthruMatchingTracksChange,
  qualityPresets,
  formatItems,
  mixdownItems,
  onQualityPresetFormatChange,
  onQualityPresetMixdownChange,
  onQualityPresetQualityChange,
  onQualityPresetRemove,
}: Props) {
  const {t} = useTranslation();

  return (
    <View style={[styles.container, style]}>
      <LabeledSwitch
        label={t('settings.passthruMatchingTracks')}
        value={passthruMatchingTracksEnabled}
        onValueChange={onPassthruMatchingTracksChange}
      />
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableTitle}>{t('audioQualityPresets.title')}</Text>
        </View>
        <AudioQualityPresetTable
          presets={qualityPresets}
          formatItems={formatItems}
          mixdownItems={mixdownItems}
          onFormatChange={onQualityPresetFormatChange}
          onMixdownChange={onQualityPresetMixdownChange}
          onQualityChange={onQualityPresetQualityChange}
          onRemove={onQualityPresetRemove}
        />
      </View>
    </View>
  );
}

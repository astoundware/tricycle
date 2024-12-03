import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {KeyedValueChangeHandler, VideoCodecQuality} from '@models';
import VideoCodecQualityRow from '../VideoCodecQualityRow';
import styles from './styles';

export type Props = {
  style?: any;
  codecs?: VideoCodecQuality[];
  onMinChange?: KeyedValueChangeHandler<number | undefined>;
  onMaxChange?: KeyedValueChangeHandler<number | undefined>;
  onStepsChange?: KeyedValueChangeHandler<number | undefined>;
};

export default function QualityPresetTable({
  style,
  codecs,
  onMinChange,
  onMaxChange,
  onStepsChange,
}: Props) {
  const {t} = useTranslation();

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.row, styles.header]}>
        <View>
          <Text>{t('videoCodecQualities.label')}</Text>
        </View>
        <View style={styles.inputHeader}>
          <Text>{t('videoCodecQualities.min')}</Text>
        </View>
        <View style={styles.inputHeader}>
          <Text>{t('videoCodecQualities.max')}</Text>
        </View>
        <View style={styles.inputHeader}>
          <Text>{t('videoCodecQualities.steps')}</Text>
        </View>
      </View>
      <FlatList
        style={styles.list}
        data={codecs}
        renderItem={({item}) => (
          <VideoCodecQualityRow
            style={styles.row}
            codecName={item.key}
            min={item.min}
            max={item.max}
            steps={item.steps}
            onMinChange={min => onMinChange && onMinChange(item.key, min)}
            onMaxChange={max => onMaxChange && onMaxChange(item.key, max)}
            onStepsChange={steps =>
              onStepsChange && onStepsChange(item.key, steps)
            }
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

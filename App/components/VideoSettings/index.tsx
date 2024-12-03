import React from 'react';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Picker} from '@react-native-picker/picker';

import {
  DisplayValue,
  KeyedValueChangeHandler,
  ValueChangeHandler,
  VideoCodecQuality,
} from '@models';
import NumberInput from '../NumberInput';
import VideoCodecQualityTable from '../VideoCodecQualityTable';
import styles from './styles';

export type Props = {
  style?: any;
  deinterlace?: string;
  deinterlaceItems?: DisplayValue[];
  onDeinterlaceChange?: ValueChangeHandler<string>;
  sizeDivisor?: number;
  onSizeDivisorChange?: ValueChangeHandler<number | undefined>;
  codecQualities: VideoCodecQuality[];
  onCodecQualityMinChange?: KeyedValueChangeHandler<number | undefined>;
  onCodecQualityMaxChange?: KeyedValueChangeHandler<number | undefined>;
  onCodecQualityStepsChange?: KeyedValueChangeHandler<number | undefined>;
};

export default function VideoSettings({
  style,
  deinterlace,
  deinterlaceItems,
  onDeinterlaceChange,
  sizeDivisor,
  onSizeDivisorChange,
  codecQualities,
  onCodecQualityMinChange,
  onCodecQualityMaxChange,
  onCodecQualityStepsChange,
}: Props) {
  const {t} = useTranslation();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.table}>
        <View style={styles.column}>
          <View style={[styles.row, styles.labelRow]}>
            <Text style={styles.label}>{t('settings.deinterlace')}</Text>
          </View>
          <View style={[styles.row, styles.labelRow]}>
            <Text style={styles.label}>{t('settings.sizeDivisor')}</Text>
          </View>
        </View>
        <View>
          <Picker
            style={[styles.row, styles.input]}
            selectedValue={deinterlace}
            onValueChange={onDeinterlaceChange}>
            {(deinterlaceItems || []).map((item: DisplayValue) => (
              <Picker.Item key={item.key} label={item.text} value={item.key} />
            ))}
          </Picker>
          <NumberInput
            style={[styles.row, styles.input]}
            value={sizeDivisor}
            onValueChange={onSizeDivisorChange}
          />
        </View>
      </View>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableTitle}>
            {t('videoCodecQualities.title')}
          </Text>
        </View>
        <VideoCodecQualityTable
          codecs={codecQualities}
          onMinChange={onCodecQualityMinChange}
          onMaxChange={onCodecQualityMaxChange}
          onStepsChange={onCodecQualityStepsChange}
        />
      </View>
    </View>
  );
}

import React from 'react';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Picker} from '@react-native-picker/picker';

import {
  DisplayValue,
  KeyedActionHandler,
  KeyedValueChangeHandler,
  ValueChangeHandler,
  VideoAspectRatioPreset,
  VideoCodecQuality,
  VideoSizePreset,
} from '@models';
import NumberInput from '../NumberInput';
import VideoAspectRatioPresetTable from '../VideoAspectRatioPresetTable';
import VideoCodecQualityTable from '../VideoCodecQualityTable';
import VideoSizePresetTable from '../VideoSizePresetTable';
import styles from './styles';

export type Props = {
  style?: any;
  deinterlace?: string;
  deinterlaceItems?: DisplayValue[];
  onDeinterlaceChange?: ValueChangeHandler<string>;
  sizeDivisor?: number;
  onSizeDivisorChange?: ValueChangeHandler<number | undefined>;
  codecQualities?: VideoCodecQuality[];
  onCodecQualityMinChange?: KeyedValueChangeHandler<number | undefined>;
  onCodecQualityMaxChange?: KeyedValueChangeHandler<number | undefined>;
  onCodecQualityStepsChange?: KeyedValueChangeHandler<number | undefined>;
  sizePresets?: VideoSizePreset[];
  onSizePresetNameChange?: KeyedValueChangeHandler<string>;
  onSizePresetWidthChange?: KeyedValueChangeHandler<number | undefined>;
  onSizePresetHeightChange?: KeyedValueChangeHandler<number | undefined>;
  onSizePresetRemove?: KeyedActionHandler;
  aspectRatioPresets?: VideoAspectRatioPreset[];
  onAspectRatioPresetNameChange?: KeyedValueChangeHandler<string>;
  onAspectRatioPresetWidthChange?: KeyedValueChangeHandler<number | undefined>;
  onAspectRatioPresetHeightChange?: KeyedValueChangeHandler<number | undefined>;
  onAspectRatioPresetRemove?: KeyedActionHandler;
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
  sizePresets,
  onSizePresetNameChange,
  onSizePresetWidthChange,
  onSizePresetHeightChange,
  onSizePresetRemove,
  aspectRatioPresets,
  onAspectRatioPresetNameChange,
  onAspectRatioPresetWidthChange,
  onAspectRatioPresetHeightChange,
  onAspectRatioPresetRemove,
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
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableTitle}>{t('videoSizePresets.title')}</Text>
        </View>
        <VideoSizePresetTable
          presets={sizePresets}
          onNameChange={onSizePresetNameChange}
          onWidthChange={onSizePresetWidthChange}
          onHeightChange={onSizePresetHeightChange}
          onRemove={onSizePresetRemove}
        />
      </View>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableTitle}>
            {t('videoAspectRatioPresets.title')}
          </Text>
        </View>
        <VideoAspectRatioPresetTable
          presets={aspectRatioPresets}
          onNameChange={onAspectRatioPresetNameChange}
          onWidthChange={onAspectRatioPresetWidthChange}
          onHeightChange={onAspectRatioPresetHeightChange}
          onRemove={onAspectRatioPresetRemove}
        />
      </View>
    </View>
  );
}

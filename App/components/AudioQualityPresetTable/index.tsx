import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {
  AudioQualityPreset,
  DisplayValue,
  KeyedActionHandler,
  KeyedValueChangeHandler,
} from '@models';
import AudioQualityPresetRow from '../AudioQualityPresetRow';
import styles from './styles';

export type Props = {
  style?: any;
  presets?: AudioQualityPreset[];
  formatItems?: DisplayValue[];
  mixdownItems?: DisplayValue[];
  onFormatChange?: KeyedValueChangeHandler<string>;
  onMixdownChange?: KeyedValueChangeHandler<string>;
  onQualityChange?: KeyedValueChangeHandler<number | undefined>;
  onRemove?: KeyedActionHandler;
};

export default function AudioQualityPresetTable({
  style,
  presets,
  formatItems,
  mixdownItems,
  onFormatChange,
  onMixdownChange,
  onQualityChange,
  onRemove,
}: Props) {
  const {t} = useTranslation();

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.row, styles.header]}>
        <View style={styles.pickerHeader}>
          <Text>{t('audioQualityPresets.format')}</Text>
        </View>
        <View style={styles.pickerHeader}>
          <Text>{t('audioQualityPresets.mixdown')}</Text>
        </View>
        <View style={styles.inputHeader}>
          <Text>{t('audioQualityPresets.quality')}</Text>
        </View>
        <Text>{t('items.remove')}</Text>
      </View>
      <FlatList
        style={styles.list}
        data={presets}
        renderItem={({item}) => (
          <AudioQualityPresetRow
            style={styles.row}
            format={item.format}
            formatItems={formatItems}
            mixdown={item.mixdown}
            mixdownItems={mixdownItems}
            quality={item.quality}
            onFormatChange={format =>
              onFormatChange && onFormatChange(item.key, format)
            }
            onMixdownChange={mixdown =>
              onMixdownChange && onMixdownChange(item.key, mixdown)
            }
            onQualityChange={quality =>
              onQualityChange && onQualityChange(item.key, quality)
            }
            onRemove={() => onRemove && onRemove(item.key)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

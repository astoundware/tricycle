import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {DisplayValue, QualityPreset} from '@models';
import QualityPresetRow from '../QualityPresetRow';
import styles from './styles';

export type Props = {
  style?: any;
  presets?: QualityPreset[];
  formatItems?: DisplayValue[];
  mixdownItems?: DisplayValue[];
  onFormatChange?: (key: string, format: string) => void;
  onMixdownChange?: (key: string, mixdown: string) => void;
  onQualityChange?: (key: string, quality: number | undefined) => void;
  onRemove?: (key: string) => void;
};

export default function QualityPresetTable({
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
          <Text>{t('qualityPresets.format')}</Text>
        </View>
        <View style={styles.pickerHeader}>
          <Text>{t('qualityPresets.mixdown')}</Text>
        </View>
        <View style={styles.inputHeader}>
          <Text>{t('qualityPresets.quality')}</Text>
        </View>
        <Text>{t('items.remove')}</Text>
      </View>
      <FlatList
        style={styles.list}
        data={presets}
        renderItem={({item}) => (
          <QualityPresetRow
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

import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {
  KeyedActionHandler,
  KeyedValueChangeHandler,
  VideoAspectRatioPreset,
} from '@models';
import VideoAspectRatioPresetRow from '../VideoAspectRatioPresetRow';
import styles from './styles';

export type Props = {
  style?: any;
  presets?: VideoAspectRatioPreset[];
  onNameChange?: KeyedValueChangeHandler<string>;
  onWidthChange?: KeyedValueChangeHandler<number | undefined>;
  onHeightChange?: KeyedValueChangeHandler<number | undefined>;
  onRemove?: KeyedActionHandler;
};

export default function VideoAspectRatioPresetTable({
  style,
  presets,
  onNameChange,
  onWidthChange,
  onHeightChange,
  onRemove,
}: Props) {
  const {t} = useTranslation();

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.row, styles.header]}>
        <View style={styles.headerCell}>
          <Text>{t('items.name')}</Text>
        </View>
        <View style={styles.headerCell}>
          <Text>{t('videoAspectRatioPresets.width')}</Text>
        </View>
        <View style={styles.headerCell}>
          <Text>{t('videoAspectRatioPresets.height')}</Text>
        </View>
        <Text>{t('items.remove')}</Text>
      </View>
      <FlatList
        style={styles.list}
        data={presets}
        renderItem={({item}) => (
          <VideoAspectRatioPresetRow
            style={styles.row}
            name={item.name}
            width={item.width}
            height={item.height}
            onNameChange={name => onNameChange && onNameChange(item.key, name)}
            onWidthChange={width =>
              onWidthChange && onWidthChange(item.key, width)
            }
            onHeightChange={height =>
              onHeightChange && onHeightChange(item.key, height)
            }
            onRemove={() => onRemove && onRemove(item.key)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

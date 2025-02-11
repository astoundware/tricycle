import React from 'react';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {trash} from '@images';
import {ActionHandler, ValueChangeHandler} from '@models';
import ImageButton from '../ImageButton';
import NumberInput from '../NumberInput';
import PlatformTextInput from '../PlatformTextInput';
import styles from './styles';

export type Props = {
  style?: any;
  name?: string;
  width?: number;
  height?: number;
  onWidthChange?: ValueChangeHandler<number | undefined>;
  onHeightChange?: ValueChangeHandler<number | undefined>;
  onRemove?: ActionHandler;
};

export default function VideoSizePresetRow({
  style,
  name,
  width,
  height,
  onWidthChange,
  onHeightChange,
  onRemove,
}: Props) {
  const {t} = useTranslation();

  return (
    <View style={[styles.container, style]}>
      <PlatformTextInput style={styles.input}>{name}</PlatformTextInput>
      <NumberInput
        style={styles.input}
        allowDecimals={false}
        value={width}
        onValueChange={onWidthChange}
      />
      <Text style={styles.separator}>
        {t('videoSizePresets.dimensionSeparator')}
      </Text>
      <NumberInput
        style={styles.input}
        allowDecimals={false}
        value={height}
        onValueChange={onHeightChange}
      />
      <ImageButton imageSource={trash} onPress={onRemove} />
    </View>
  );
}

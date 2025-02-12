import React from 'react';
import {Text, View} from 'react-native';

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
  separator?: string;
  onWidthChange?: ValueChangeHandler<number | undefined>;
  onHeightChange?: ValueChangeHandler<number | undefined>;
  onRemove?: ActionHandler;
};

export default function VideoDimensionsPresetRow({
  style,
  name,
  width,
  height,
  separator,
  onWidthChange,
  onHeightChange,
  onRemove,
}: Props) {
  return (
    <View style={[styles.container, style]}>
      <PlatformTextInput style={styles.input}>{name}</PlatformTextInput>
      <NumberInput
        style={styles.input}
        allowDecimals={false}
        value={width}
        onValueChange={onWidthChange}
      />
      <Text style={styles.separator}>{separator}</Text>
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

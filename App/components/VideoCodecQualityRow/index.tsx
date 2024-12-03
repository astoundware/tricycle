import React from 'react';
import {Text, View} from 'react-native';

import {ValueChangeHandler} from '@models';
import NumberInput from '../NumberInput';
import styles from './styles';

export type Props = {
  style?: any;
  codecName?: string;
  min?: number;
  max?: number;
  steps?: number;
  onMinChange?: ValueChangeHandler<number | undefined>;
  onMaxChange?: ValueChangeHandler<number | undefined>;
  onStepsChange?: ValueChangeHandler<number | undefined>;
};

export default function VideoCodecQualityRow({
  style,
  codecName,
  min,
  max,
  steps,
  onMinChange,
  onMaxChange,
  onStepsChange,
}: Props) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{codecName}</Text>
      <NumberInput
        style={styles.input}
        allowDecimals={true}
        value={min}
        onValueChange={onMinChange}
      />
      <NumberInput
        style={styles.input}
        allowDecimals={true}
        value={max}
        onValueChange={onMaxChange}
      />
      <NumberInput
        style={styles.input}
        value={steps}
        onValueChange={onStepsChange}
      />
    </View>
  );
}

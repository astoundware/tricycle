import React from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import {trash} from '@images';
import {DisplayValue, ValueChangeHandler} from '@models';
import ImageButton from '../ImageButton';
import NumberInput from '../NumberInput';
import styles from './styles';

export type Props = {
  style?: any;
  format?: string;
  formatItems?: DisplayValue[];
  mixdown?: string;
  mixdownItems?: DisplayValue[];
  quality?: number;
  onFormatChange?: ValueChangeHandler<string>;
  onMixdownChange?: ValueChangeHandler<string>;
  onQualityChange?: ValueChangeHandler<number | undefined>;
  onRemove?: () => void;
};

export default function TemplateRow({
  style,
  format,
  formatItems,
  mixdown,
  mixdownItems,
  quality,
  onFormatChange,
  onMixdownChange,
  onQualityChange,
  onRemove,
}: Props) {
  return (
    <View style={[styles.container, style]}>
      <Picker
        style={styles.input}
        selectedValue={format}
        onValueChange={onFormatChange}>
        {(formatItems || []).map((item: DisplayValue) => (
          <Picker.Item key={item.key} label={item.text} value={item.key} />
        ))}
      </Picker>
      <Picker
        style={styles.input}
        selectedValue={mixdown}
        onValueChange={onMixdownChange}>
        {(mixdownItems || []).map((item: DisplayValue) => (
          <Picker.Item key={item.key} label={item.text} value={item.key} />
        ))}
      </Picker>
      <NumberInput
        style={styles.input}
        value={quality}
        onValueChange={onQualityChange}
      />
      <ImageButton imageSource={trash} onPress={onRemove} />
    </View>
  );
}

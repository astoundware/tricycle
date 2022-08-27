import React from 'react';
import {View} from 'react-native';

import {trash} from '@images';
import {ValueChangeHandler} from '@models';
import ImageButton from '../ImageButton';
import PlatformTextInput from '../PlatformTextInput';
import styles from './styles';

export type Props = {
  style?: any;
  name?: string;
  onNameChange?: ValueChangeHandler<string>;
  onRemove?: () => void;
};

export default function TemplateRow({
  style,
  name,
  onNameChange,
  onRemove,
}: Props) {
  return (
    <View style={[styles.container, style]}>
      <PlatformTextInput
        style={styles.input}
        value={name}
        onChangeText={onNameChange}
      />
      <ImageButton imageSource={trash} onPress={onRemove} />
    </View>
  );
}

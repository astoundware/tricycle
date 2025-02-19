import React from 'react';
import {View} from 'react-native';

import {trash} from '@images';
import {ActionHandler, ValueChangeHandler} from '@models';
import ImageButton from '../ImageButton';
import PlatformTextInput from '../PlatformTextInput';
import styles from './styles';

export type Props = {
  style?: any;
  name?: string;
  removeDisabled?: boolean;
  onNameChange?: ValueChangeHandler<string>;
  onRemove?: ActionHandler;
};

export default function TemplateRow({
  style,
  name,
  removeDisabled,
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
      <ImageButton imageSource={trash} disabled={removeDisabled} onPress={onRemove} />
    </View>
  );
}

import React from 'react';
import {View} from 'react-native';

import ImageButton from '../ImageButton';
import PlatformTextInput from '../PlatformTextInput';
import {trash} from '../../images';
import styles from './styles';

export default function TemplateRow({style, name, onNameChange, onRemove}) {
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

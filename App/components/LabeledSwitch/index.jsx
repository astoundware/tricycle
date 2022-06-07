import React from 'react';
import {Pressable, Switch, Text} from 'react-native';

import styles from './styles';

export default function LabeledSwitch({style, label, onValueChange, value}) {
  return (
    <Pressable
      style={[styles.container, style]}
      onPress={() => onValueChange && onValueChange(!value)}>
      <Switch
        style={styles.switch}
        value={value}
        onValueChange={onValueChange}
      />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

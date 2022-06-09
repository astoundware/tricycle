import React from 'react';
import {Pressable, Switch, Text, View} from 'react-native';

import styles from './styles';

export default function LabeledSwitch({style, label, onValueChange, value}) {
  return (
    <View style={[styles.container, style]}>
      <Switch
        style={styles.switch}
        value={value}
        onValueChange={onValueChange}
      />
      <Pressable onPress={() => onValueChange && onValueChange(!value)}>
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </View>
  );
}

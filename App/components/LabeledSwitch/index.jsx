import React from 'react';
import {Switch, Text, View} from 'react-native';

import styles from './styles';

export default function LabeledSwitch({style, label, onValueChange, value}) {
  return (
    <View style={[styles.container, style]}>
      <Switch
        style={styles.switch}
        onValueChange={onValueChange}
        value={value}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

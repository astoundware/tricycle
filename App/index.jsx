import React from 'react';
import {View} from 'react-native';

import {Settings} from './screens';
import styles from './styles';

export default function App() {
  return (
    <View style={styles.container}>
      <Settings />
    </View>
  );
}

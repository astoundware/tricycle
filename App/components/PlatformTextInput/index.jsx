import React from 'react';
import {TextInput} from 'react-native';

import styles from './styles';

export default function PlatformTextInput(props) {
  return <TextInput {...props} style={[styles.text, props.style]} />;
}

import React from 'react';
import {TextInput, TextInputProps} from 'react-native';

import styles from './styles';

export type Props = TextInputProps;

export default function PlatformTextInput(props: TextInputProps) {
  return <TextInput {...props} style={[styles.text, props.style]} />;
}

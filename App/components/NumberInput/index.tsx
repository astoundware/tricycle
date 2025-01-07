import React, {useState} from 'react';

import {ValueChangeHandler} from '@models';
import PlatformTextInput from '../PlatformTextInput';
import styles from './styles';

export type Props = {
  style?: any;
  value?: number;
  onValueChange?: ValueChangeHandler<number | undefined>;
  editable?: boolean;
  allowDecimals?: boolean;
};

export default function NumberInput({
  style,
  value,
  onValueChange,
  editable,
  allowDecimals,
}: Props) {
  const [lastValidText, setLastValidText] = useState(value?.toString() || '');

  return (
    <PlatformTextInput
      editable={editable}
      onChangeText={text => {
        if (!text) {
          setLastValidText('');
          onValueChange && onValueChange(undefined);
          return;
        }

        const numberValue = Number(text.replace(',', '.'));

        if (
          !isNaN(numberValue) &&
          (allowDecimals || Number.isInteger(numberValue))
        ) {
          setLastValidText(text);
          onValueChange && onValueChange(numberValue);
        }
      }}
      style={[styles.input, style]}
      value={lastValidText}
    />
  );
}

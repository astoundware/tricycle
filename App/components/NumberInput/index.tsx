import React from 'react';

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
  return (
    <PlatformTextInput
      editable={editable}
      onChangeText={text => {
        if (!onValueChange) {
          return;
        }

        if (!text) {
          onValueChange(undefined);
          return;
        }

        const numberValue = Number(text.replace(',', '.'));

        if (
          !isNaN(numberValue) &&
          (allowDecimals || Number.isInteger(numberValue))
        ) {
          onValueChange(numberValue);
        }
      }}
      style={[styles.input, style]}
      value={value?.toString() || ''}
    />
  );
}

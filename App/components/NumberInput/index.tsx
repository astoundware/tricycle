import React, {useState} from 'react';

import PlatformTextInput from '../PlatformTextInput';
import {ValueChangeHandler} from '@models';

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
  const [lastValidValue, setLastValidValue] = useState(value);

  return (
    <PlatformTextInput
      editable={editable}
      onChangeText={text => {
        if (!onValueChange) {
          return;
        }

        if (!text) {
          setLastValidValue(undefined);
          onValueChange(undefined);
        }

        const numberValue = Number(text.replace(',', '.'));

        if (
          isNaN(numberValue) ||
          (!allowDecimals && !Number.isInteger(numberValue))
        ) {
          onValueChange(lastValidValue);
        } else {
          setLastValidValue(numberValue);
          onValueChange(numberValue);
        }
      }}
      style={style}>
      {value}
    </PlatformTextInput>
  );
}

import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';

import {NumberInput, PlatformTextInput} from '@components';

it('renders the value when it is defined', () => {
  const value = 100;
  const component = renderer.create(<NumberInput value={value} />);
  const input = component.root.findByType(PlatformTextInput);

  expect(input.props.value).toBe(value.toString());
});

it('renders an empty string when value is undefined', () => {
  const component = renderer.create(<NumberInput />);
  const input = component.root.findByType(PlatformTextInput);

  expect(input.props.value).toBe('');
});

test.each([[false], [true]])(
  'passes %p editable prop to PlatformTextInput',
  (editable: boolean) => {
    const component = renderer.create(<NumberInput editable={editable} />);
    const input = component.root.findByType(PlatformTextInput);

    expect(input.props.editable).toBe(editable);
  },
);

it('calls onValueChange when allowDecimals is false and the text is changed to a valid integer', () => {
  const value = 100;
  const onValueChange = jest.fn();
  const component = renderer.create(
    <NumberInput onValueChange={onValueChange} />,
  );
  const input = component.root.findByType(PlatformTextInput);

  renderer.act(() => input.props.onChangeText(value.toString()));

  expect(onValueChange).toHaveBeenCalledWith(value);
});

it('calls onValueChange when allowDecimals is true and the text is changed to a valid decimal', () => {
  const value = 1.5;
  const onValueChange = jest.fn();
  const component = renderer.create(
    <NumberInput allowDecimals onValueChange={onValueChange} />,
  );
  const input = component.root.findByType(PlatformTextInput);

  renderer.act(() => input.props.onChangeText(value.toString()));

  expect(onValueChange).toHaveBeenCalledWith(value);
});

it('does not call onValueChange when the text is changed to an invalid value', () => {
  const onValueChange = jest.fn();
  const component = renderer.create(
    <NumberInput onValueChange={onValueChange} />,
  );
  const input = component.root.findByType(PlatformTextInput);

  renderer.act(() => input.props.onChangeText('invalid'));

  expect(onValueChange).not.toHaveBeenCalled();
});

it('does not call onValueChange when allowDecimals is false and the text is changed to a decimal', () => {
  const onValueChange = jest.fn();
  const component = renderer.create(
    <NumberInput onValueChange={onValueChange} />,
  );
  const input = component.root.findByType(PlatformTextInput);

  renderer.act(() => input.props.onChangeText('1.5'));

  expect(onValueChange).not.toHaveBeenCalled();
});

it('retains input value when the text is changed to a partial number', () => {
  const text = '3.';
  const component = renderer.create(<NumberInput />);
  const input = component.root.findByType(PlatformTextInput);

  renderer.act(() => input.props.onChangeText(text));

  expect(input.props.value).toBe(text);
});

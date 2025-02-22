import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import {Text} from 'react-native';

import {
  ImageButton,
  NumberInput,
  PlatformTextInput,
  VideoDimensionsPresetRow,
} from '@components';
import {createBoolean, createNumber, createString} from '@test-utils/fixtures';

it('renders the name correctly', () => {
  const name = createString();
  const component = renderer.create(<VideoDimensionsPresetRow name={name} />);
  const inputs = component.root.findAllByType(PlatformTextInput);

  expect(inputs[0].props.children).toBe(name);
});

it('renders the separator correctly', () => {
  const separator = createString();
  const component = renderer.create(
    <VideoDimensionsPresetRow separator={separator} />,
  );
  const text = component.root.findByType(Text);

  expect(text.props.children).toBe(separator);
});

it('renders the width correctly', () => {
  const width = createNumber();
  const component = renderer.create(<VideoDimensionsPresetRow width={width} />);
  const inputs = component.root.findAllByType(NumberInput);

  expect(inputs[0].props.value).toBe(width);
});

it('renders the height value correctly', () => {
  const height = createNumber();
  const component = renderer.create(
    <VideoDimensionsPresetRow height={height} />,
  );
  const inputs = component.root.findAllByType(NumberInput);

  expect(inputs[1].props.value).toBe(height);
});

it('allows decimals on the number inputs when allowed', () => {
  const allowDecimals = createBoolean();
  const component = renderer.create(
    <VideoDimensionsPresetRow allowDecimals={allowDecimals} />,
  );
  const inputs = component.root.findAllByType(NumberInput);

  inputs.forEach(input =>
    expect(input.props.allowDecimals).toBe(allowDecimals),
  );
});

it('disables the remove button when disabled', () => {
  const removeDisabled = createBoolean();
  const component = renderer.create(
    <VideoDimensionsPresetRow removeDisabled={removeDisabled} />,
  );
  const button = component.root.findByType(ImageButton);

  expect(button.props.disabled).toBe(removeDisabled);
});

it('calls onNameChange when name is changed', () => {
  const name = createString();
  const onNameChange = jest.fn();
  const component = renderer.create(
    <VideoDimensionsPresetRow onNameChange={onNameChange} />,
  );
  const inputs = component.root.findAllByType(PlatformTextInput);

  inputs[0].props.onChangeText(name);

  expect(onNameChange).toHaveBeenCalledWith(name);
});

it('calls onWidthChange when width is changed', () => {
  const width = createNumber();
  const onWidthChange = jest.fn();
  const component = renderer.create(
    <VideoDimensionsPresetRow onWidthChange={onWidthChange} />,
  );
  const inputs = component.root.findAllByType(NumberInput);

  inputs[0].props.onValueChange(width);

  expect(onWidthChange).toHaveBeenCalledWith(width);
});

it('calls onHeightChange when height is changed', () => {
  const height = createNumber();
  const onHeightChange = jest.fn();
  const component = renderer.create(
    <VideoDimensionsPresetRow onHeightChange={onHeightChange} />,
  );
  const inputs = component.root.findAllByType(NumberInput);

  inputs[1].props.onValueChange(height);

  expect(onHeightChange).toHaveBeenCalledWith(height);
});

it('calls onRemove when the button is pressed', () => {
  const onRemove = jest.fn();
  const component = renderer.create(
    <VideoDimensionsPresetRow onRemove={onRemove} />,
  );
  const button = component.root.findByType(ImageButton);

  button.props.onPress();

  expect(onRemove).toHaveBeenCalled();
});

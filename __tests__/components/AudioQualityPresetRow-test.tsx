import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import {Picker} from '@react-native-picker/picker';

import {ImageButton, NumberInput, AudioQualityPresetRow} from '@components';
import {
  createBoolean,
  createDisplayValues,
  createNumber,
  createString,
} from '@test-utils/fixtures';

it('renders the format options correctly', () => {
  const items = createDisplayValues();
  const component = renderer.create(
    <AudioQualityPresetRow formatItems={items} />,
  );
  const pickers = component.root.findAllByType(Picker);
  const pickerItems = pickers[0].props.children;

  expect(pickerItems).toHaveLength(items.length);

  items.forEach((item, i) => {
    const pickerItem = pickerItems[i];

    expect(pickerItem.props.label).toBe(item.text);
    expect(pickerItem.props.value).toBe(item.key);
  });
});

it('renders the format correctly', () => {
  const format = createString();
  const component = renderer.create(<AudioQualityPresetRow format={format} />);
  const pickers = component.root.findAllByType(Picker);

  expect(pickers[0].props.selectedValue).toBe(format);
});

it('calls onFormatChange when format is changed', () => {
  const format = createString();
  const onFormatChange = jest.fn();
  const component = renderer.create(
    <AudioQualityPresetRow onFormatChange={onFormatChange} />,
  );
  const pickers = component.root.findAllByType(Picker);

  pickers[0].props.onValueChange(format);

  expect(onFormatChange).toHaveBeenCalledWith(format);
});

it('renders the mixdown options correctly', () => {
  const items = createDisplayValues();
  const component = renderer.create(
    <AudioQualityPresetRow mixdownItems={items} />,
  );
  const pickers = component.root.findAllByType(Picker);
  const pickerItems = pickers[1].props.children;

  expect(pickerItems).toHaveLength(items.length);

  items.forEach((item, i) => {
    const pickerItem = pickerItems[i];

    expect(pickerItem.props.label).toBe(item.text);
    expect(pickerItem.props.value).toBe(item.key);
  });
});

it('renders the mixdown correctly', () => {
  const mixdown = createString();
  const component = renderer.create(
    <AudioQualityPresetRow mixdown={mixdown} />,
  );
  const pickers = component.root.findAllByType(Picker);

  expect(pickers[1].props.selectedValue).toBe(mixdown);
});

it('calls onMixdownChange when mixdown is changed', () => {
  const mixdown = createString();
  const onMixdownChange = jest.fn();
  const component = renderer.create(
    <AudioQualityPresetRow onMixdownChange={onMixdownChange} />,
  );
  const pickers = component.root.findAllByType(Picker);

  pickers[1].props.onValueChange(mixdown);

  expect(onMixdownChange).toHaveBeenCalledWith(mixdown);
});

it('renders the quality correctly', () => {
  const quality = createNumber();
  const component = renderer.create(
    <AudioQualityPresetRow quality={quality} />,
  );
  const input = component.root.findByType(NumberInput);

  expect(input.props.value).toBe(quality);
});

it('disables the remove button when disabled', () => {
  const removeDisabled = createBoolean();
  const component = renderer.create(
    <AudioQualityPresetRow removeDisabled={removeDisabled} />,
  );
  const button = component.root.findByType(ImageButton);

  expect(button.props.disabled).toBe(removeDisabled);
});

it('calls onQualityChange when quality is changed', () => {
  const quality = createNumber();
  const onQualityChange = jest.fn();
  const component = renderer.create(
    <AudioQualityPresetRow onQualityChange={onQualityChange} />,
  );
  const input = component.root.findByType(NumberInput);

  input.props.onValueChange(quality);

  expect(onQualityChange).toHaveBeenCalledWith(quality);
});

it('calls onRemove when the button is pressed', () => {
  const onRemove = jest.fn();
  const component = renderer.create(
    <AudioQualityPresetRow onRemove={onRemove} />,
  );
  const button = component.root.findByType(ImageButton);

  button.props.onPress();

  expect(onRemove).toHaveBeenCalled();
});

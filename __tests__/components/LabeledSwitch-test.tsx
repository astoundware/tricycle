import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import {Pressable, Switch, Text} from 'react-native';

import {LabeledSwitch} from '@components';

it('renders the label correctly', () => {
  const label = 'test';
  const component = renderer.create(<LabeledSwitch label={label} />);
  const text = component.root.findByType(Text);

  expect(text.props.children).toBe(label);
});

it('renders the value correctly', () => {
  const value = true;
  const component = renderer.create(<LabeledSwitch value={value} />);
  const sw = component.root.findByType(Switch);

  expect(sw.props.value).toBe(value);
});

it('calls onValueChange when the switch is toggled', () => {
  const value = true;
  const onValueChange = jest.fn();
  const component = renderer.create(
    <LabeledSwitch onValueChange={onValueChange} />,
  );
  const sw = component.root.findByType(Switch);

  sw.props.onValueChange(value);

  expect(onValueChange).toHaveBeenCalledWith(value);
});

it('calls onValueChange when the label is pressed', () => {
  const value = true;
  const onValueChange = jest.fn();
  const component = renderer.create(
    <LabeledSwitch onValueChange={onValueChange} />,
  );
  const pressable = component.root.findByType(Pressable);

  pressable.props.onPress();

  expect(onValueChange).toHaveBeenCalledWith(value);
});

it('does not throw error when onValueChange is undefined', () => {
  const component = renderer.create(<LabeledSwitch />);
  const pressable = component.root.findByType(Pressable);

  pressable.props.onPress();
});

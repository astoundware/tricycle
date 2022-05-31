import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import {Switch, Text} from 'react-native';

import {LabeledSwitch} from '../../App/components';

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

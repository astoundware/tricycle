import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import {Text} from 'react-native';

import {NumberInput, VideoCodecQualityRow} from '@components';
import {createNumber, createString} from '@test-utils/fixtures';

it('renders the codec name correctly', () => {
  const name = createString();
  const component = renderer.create(<VideoCodecQualityRow codecName={name} />);
  const input = component.root.findByType(Text);

  expect(input.props.children).toBe(name);
});

it('renders the min value correctly', () => {
  const min = createNumber();
  const component = renderer.create(<VideoCodecQualityRow min={min} />);
  const inputs = component.root.findAllByType(NumberInput);

  expect(inputs[0].props.value).toBe(min);
});

it('renders the max value correctly', () => {
  const max = createNumber();
  const component = renderer.create(<VideoCodecQualityRow max={max} />);
  const inputs = component.root.findAllByType(NumberInput);

  expect(inputs[1].props.value).toBe(max);
});

it('renders the steps value correctly', () => {
  const steps = createNumber();
  const component = renderer.create(<VideoCodecQualityRow steps={steps} />);
  const inputs = component.root.findAllByType(NumberInput);

  expect(inputs[2].props.value).toBe(steps);
});

it('calls onMinChange when min value is changed', () => {
  const min = createNumber();
  const onMinChange = jest.fn();
  const component = renderer.create(
    <VideoCodecQualityRow onMinChange={onMinChange} />,
  );
  const inputs = component.root.findAllByType(NumberInput);

  inputs[0].props.onValueChange(min);

  expect(onMinChange).toHaveBeenCalledWith(min);
});

it('calls onMaxChange when max value is changed', () => {
  const max = createNumber();
  const onMaxChange = jest.fn();
  const component = renderer.create(
    <VideoCodecQualityRow onMaxChange={onMaxChange} />,
  );
  const inputs = component.root.findAllByType(NumberInput);

  inputs[1].props.onValueChange(max);

  expect(onMaxChange).toHaveBeenCalledWith(max);
});

it('calls onStepsChange when steps value is changed', () => {
  const steps = createNumber();
  const onStepsChange = jest.fn();
  const component = renderer.create(
    <VideoCodecQualityRow onStepsChange={onStepsChange} />,
  );
  const inputs = component.root.findAllByType(NumberInput);

  inputs[2].props.onValueChange(steps);

  expect(onStepsChange).toHaveBeenCalledWith(steps);
});

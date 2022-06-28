import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';

import {
  ImageButton,
  PlatformTextInput,
  TemplateRow,
} from '../../App/components';

it('renders the name correctly', () => {
  const name = 'test';
  const component = renderer.create(<TemplateRow name={name} />);
  const input = component.root.findByType(PlatformTextInput);

  expect(input.props.value).toBe(name);
});

it('calls onNameChange when the text is changed', () => {
  const name = 'test';
  const onNameChange = jest.fn();
  const component = renderer.create(
    <TemplateRow onNameChange={onNameChange} />,
  );
  const input = component.root.findByType(PlatformTextInput);

  input.props.onChangeText(name);

  expect(onNameChange).toHaveBeenCalledWith(name);
});

it('calls onRemove when the button is pressed', () => {
  const onRemove = jest.fn();
  const component = renderer.create(<TemplateRow onRemove={onRemove} />);
  const button = component.root.findByType(ImageButton);

  button.props.onPress();

  expect(onRemove).toHaveBeenCalled();
});

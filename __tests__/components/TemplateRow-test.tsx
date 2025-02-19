import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';

import {ImageButton, PlatformTextInput, TemplateRow} from '@components';
import {createBoolean, createString} from '@test-utils/fixtures';

it('renders the name correctly', () => {
  const name = createString();
  const component = renderer.create(<TemplateRow name={name} />);
  const input = component.root.findByType(PlatformTextInput);

  expect(input.props.value).toBe(name);
});

it('disables the remove button when disabled', () => {
  const removeDisabled = createBoolean();
  const component = renderer.create(
    <TemplateRow removeDisabled={removeDisabled} />,
  );
  const button = component.root.findByType(ImageButton);

  expect(button.props.disabled).toBe(removeDisabled);
});

it('calls onNameChange when the text is changed', () => {
  const name = createString();
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

import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';

import {ImageButton} from '../../App/components';
import {trash} from '../../App/images';
import colors from '../../App/constants/colors';

it('renders the image source correctly', () => {
  const component = renderer.create(<ImageButton imageSource={trash} />);
  const image = component.root.findByType(Image);

  expect(image.props.source).toBe(trash);
});

it('renders the background color correctly when pressed', () => {
  const component = renderer.create(<ImageButton />);
  const pressable = component.root.findByType(Pressable);
  const style = StyleSheet.flatten(pressable.props.style({pressed: true}));

  expect(style.backgroundColor).toBe(colors.buttonBackgroundPressed);
});

it('renders the background color correctly when not pressed', () => {
  const component = renderer.create(<ImageButton />);
  const pressable = component.root.findByType(Pressable);
  const style = StyleSheet.flatten(pressable.props.style({pressed: false}));

  expect(style.backgroundColor).toBe(colors.buttonBackground);
});

it('calls onPress when pressed', () => {
  const onPress = jest.fn();
  const component = renderer.create(<ImageButton onPress={onPress} />);
  const pressable = component.root.findByType(Pressable);

  pressable.props.onPress();

  expect(onPress).toHaveBeenCalled();
});

it('disables pressing when disabled', () => {
  const disabled = true;
  const component = renderer.create(<ImageButton disabled={disabled} />);
  const pressable = component.root.findByType(Pressable);

  expect(pressable.props.disabled).toBe(disabled);
});

it('changes styles when disabled', () => {
  const component = renderer.create(<ImageButton disabled={true} />);
  const pressable = component.root.findByType(Pressable);
  const image = component.root.findByType(Image);
  const containerStyle = StyleSheet.flatten(pressable.props.style({}));
  const imageStyle = StyleSheet.flatten(image.props.style);

  expect(containerStyle.borderWidth).toBe(0);
  expect(imageStyle.opacity).toBe(0.25);
});

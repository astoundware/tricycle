import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

import {SelectionList} from '@components';
import {theme} from '@config';

const items = [
  {key: '1', text: 'A'},
  {key: '2', text: 'B'},
];

it('renders the correct number of items', () => {
  const component = renderer.create(<SelectionList items={items} />);
  const pressables = component.root.findAllByType(Pressable);

  expect(pressables).toHaveLength(items.length);
});

it('renders the text of each item correctly', () => {
  const component = renderer.create(<SelectionList items={items} />);
  const pressables = component.root.findAllByType(Pressable);

  items.forEach((item, i) => {
    const pressable = pressables[i];
    const text = pressable.findByType(Text);

    expect(text.props.children).toBe(item.text);
  });
});

it('renders the background color of each item correctly', () => {
  const selectedIndex = 1;
  const selectedKey = items[selectedIndex].key;
  const component = renderer.create(
    <SelectionList items={items} selectedKey={selectedKey} />,
  );
  const pressables = component.root.findAllByType(Pressable);

  items.forEach((_, i) => {
    const pressable = pressables[i];
    const style = StyleSheet.flatten(pressable.props.style);
    const expected =
      i === selectedIndex ? theme.colors.selectionBackground : 'transparent';

    expect(style.backgroundColor).toBe(expected);
  });
});

it('renders the text color of each item correctly', () => {
  const selectedIndex = 1;
  const selectedKey = items[selectedIndex].key;
  const component = renderer.create(
    <SelectionList items={items} selectedKey={selectedKey} />,
  );
  const pressables = component.root.findAllByType(Pressable);

  items.forEach((_, i) => {
    const pressable = pressables[i];
    const text = pressable.findByType(Text);
    const style = StyleSheet.flatten(text.props.style);
    const expected = i === selectedIndex ? theme.colors.selectionFont : 'black';

    expect(style.color).toBe(expected);
  });
});

it('calls onSelectionChange when different item is pressed', () => {
  const onSelectionChange = jest.fn();
  const selectedKey = items[0].key;
  const component = renderer.create(
    <SelectionList
      items={items}
      selectedKey={selectedKey}
      onSelectionChange={onSelectionChange}
    />,
  );
  const pressables = component.root.findAllByType(Pressable);

  pressables[1].props.onPress();

  expect(onSelectionChange).toHaveBeenCalledWith(items[1].key);
});

it('does not call onSelectionChange when same item is pressed', () => {
  const onSelectionChange = jest.fn();
  const selectedIndex = 0;
  const selectedKey = items[selectedIndex].key;
  const component = renderer.create(
    <SelectionList
      items={items}
      selectedKey={selectedKey}
      onSelectionChange={onSelectionChange}
    />,
  );
  const pressables = component.root.findAllByType(Pressable);

  pressables[selectedIndex].props.onPress();

  expect(onSelectionChange).not.toHaveBeenCalled();
});

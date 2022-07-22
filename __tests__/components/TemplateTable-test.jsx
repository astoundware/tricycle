import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import {FlatList} from 'react-native';

import {TemplateTable} from '../../App/components';
import '../../App/config/i18n';

const element = {
  index: 1,
  item: {
    key: 2,
    name: 'test',
  },
};

it('renders the row correctly', () => {
  const component = renderer.create(<TemplateTable />);
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  expect(row.props.name).toBe(element.item.name);
});

it("calls onNameChange when the row's name is changed", () => {
  const newName = 'updated';
  const onNameChange = jest.fn();
  const component = renderer.create(
    <TemplateTable onNameChange={onNameChange} />,
  );
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  row.props.onNameChange(newName);

  expect(onNameChange).toHaveBeenCalledWith(element.index, newName);
});

it('calls onRemove when the row is removed', () => {
  const onRemove = jest.fn();
  const component = renderer.create(<TemplateTable onRemove={onRemove} />);
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  row.props.onRemove();

  expect(onRemove).toHaveBeenCalledWith(element.index);
});

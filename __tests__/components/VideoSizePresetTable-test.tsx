import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {VideoSizePresetTable} from '@components';
import '@config/i18n';
import {VideoSizePreset} from '@models';
import {
  createListRenderItemInfo,
  createNumber,
  createString,
  createVideoSizePreset,
} from '@test-utils/fixtures';

let element: ListRenderItemInfo<VideoSizePreset>;

beforeEach(() => {
  element = createListRenderItemInfo(createVideoSizePreset);
});

it('renders the row name correctly', () => {
  const component = renderer.create(<VideoSizePresetTable />);
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  expect(row.props.name).toBe(element.item.name);
});

it('renders the row width value correctly', () => {
  const component = renderer.create(<VideoSizePresetTable />);
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  expect(row.props.width).toBe(element.item.width);
});

it('renders the row height value correctly', () => {
  const component = renderer.create(<VideoSizePresetTable />);
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  expect(row.props.height).toBe(element.item.height);
});

it('disables row removal when disabled', () => {
  const component = renderer.create(<VideoSizePresetTable />);
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  expect(row.props.removeDisabled).toBe(element.item.removeDisabled);
});

it("calls onNameChange when the row's name value is changed", () => {
  const newName = createString();
  const onNameChange = jest.fn();
  const component = renderer.create(
    <VideoSizePresetTable onNameChange={onNameChange} />,
  );
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  row.props.onNameChange(newName);

  expect(onNameChange).toHaveBeenCalledWith(element.item.key, newName);
});

it("calls onWidthChange when the row's width value is changed", () => {
  const newWidth = createNumber();
  const onWidthChange = jest.fn();
  const component = renderer.create(
    <VideoSizePresetTable onWidthChange={onWidthChange} />,
  );
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  row.props.onWidthChange(newWidth);

  expect(onWidthChange).toHaveBeenCalledWith(element.item.key, newWidth);
});

it("calls onHeightChange when the row's height value is changed", () => {
  const newHeight = createNumber();
  const onHeightChange = jest.fn();
  const component = renderer.create(
    <VideoSizePresetTable onHeightChange={onHeightChange} />,
  );
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  row.props.onHeightChange(newHeight);

  expect(onHeightChange).toHaveBeenCalledWith(element.item.key, newHeight);
});

import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {VideoCodecQualityTable} from '@components';
import '@config/i18n';
import {VideoCodecQuality} from '@models';
import {
  createVideoCodecQuality,
  createListRenderItemInfo,
  createNumber,
  createString,
} from '@test-utils/fixtures';

let element: ListRenderItemInfo<VideoCodecQuality>;

beforeEach(() => {
  element = createListRenderItemInfo(createVideoCodecQuality);
});

it('renders the row name correctly', () => {
  const component = renderer.create(<VideoCodecQualityTable />);
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  expect(row.props.codecName).toBe(element.item.name);
});

it('renders the row min value correctly', () => {
  const component = renderer.create(<VideoCodecQualityTable />);
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  expect(row.props.min).toBe(element.item.min);
});

it('renders the row max value correctly', () => {
  const component = renderer.create(<VideoCodecQualityTable />);
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  expect(row.props.max).toBe(element.item.max);
});

it('renders the row steps value correctly', () => {
  const component = renderer.create(<VideoCodecQualityTable />);
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  expect(row.props.steps).toBe(element.item.steps);
});

it("calls onMinChange when the row's min value is changed", () => {
  const newMin = createNumber();
  const onMinChange = jest.fn();
  const component = renderer.create(
    <VideoCodecQualityTable onMinChange={onMinChange} />,
  );
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  row.props.onMinChange(newMin);

  expect(onMinChange).toHaveBeenCalledWith(element.item.key, newMin);
});

it("calls onMaxChange when the row's max value is changed", () => {
  const newMax = createNumber();
  const onMaxChange = jest.fn();
  const component = renderer.create(
    <VideoCodecQualityTable onMaxChange={onMaxChange} />,
  );
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  row.props.onMaxChange(newMax);

  expect(onMaxChange).toHaveBeenCalledWith(element.item.key, newMax);
});

it("calls onStepsChange when the row's steps value is changed", () => {
  const newSteps = createNumber();
  const onStepsChange = jest.fn();
  const component = renderer.create(
    <VideoCodecQualityTable onStepsChange={onStepsChange} />,
  );
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  row.props.onStepsChange(newSteps);

  expect(onStepsChange).toHaveBeenCalledWith(element.item.key, newSteps);
});

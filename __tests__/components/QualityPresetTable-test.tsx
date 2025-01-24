import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import {FlatList} from 'react-native';

import {QualityPresetTable} from '@components';
import '@config/i18n';

const element = {
  item: {
    key: 2,
    format: 'aac',
    mixdown: 'stereo',
    quality: 256,
  },
};

it('renders the row format options correctly', () => {
  const items = [
    {key: 'aac', text: 'AAC'},
    {key: 'dd', text: 'Dolby Digital'},
  ];
  const component = renderer.create(<QualityPresetTable formatItems={items} />);
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  expect(row.props.formatItems).toBe(items);
});

it('renders the row format correctly', () => {
  const component = renderer.create(<QualityPresetTable />);
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  expect(row.props.format).toBe(element.item.format);
});

it('renders the row mixdown options correctly', () => {
  const items = [
    {key: 'mono', text: 'Mono'},
    {key: 'stereo', text: 'Stereo'},
  ];
  const component = renderer.create(
    <QualityPresetTable mixdownItems={items} />,
  );
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  expect(row.props.mixdownItems).toBe(items);
});

it('renders the row mixdown correctly', () => {
  const component = renderer.create(<QualityPresetTable />);
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  expect(row.props.mixdown).toBe(element.item.mixdown);
});

it('renders the row quality correctly', () => {
  const component = renderer.create(<QualityPresetTable />);
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  expect(row.props.quality).toBe(element.item.quality);
});

it("calls onFormatChange when the row's format is changed", () => {
  const newFormat = 'aac';
  const onFormatChange = jest.fn();
  const component = renderer.create(
    <QualityPresetTable onFormatChange={onFormatChange} />,
  );
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  row.props.onFormatChange(newFormat);

  expect(onFormatChange).toHaveBeenCalledWith(element.item.key, newFormat);
});

it("calls onMixdownChange when the row's mixdown is changed", () => {
  const newMixdown = 'aac';
  const onMixdownChange = jest.fn();
  const component = renderer.create(
    <QualityPresetTable onMixdownChange={onMixdownChange} />,
  );
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  row.props.onMixdownChange(newMixdown);

  expect(onMixdownChange).toHaveBeenCalledWith(element.item.key, newMixdown);
});

it("calls onQualityChange when the row's quality is changed", () => {
  const newQuality = 256;
  const onQualityChange = jest.fn();
  const component = renderer.create(
    <QualityPresetTable onQualityChange={onQualityChange} />,
  );
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  row.props.onQualityChange(newQuality);

  expect(onQualityChange).toHaveBeenCalledWith(element.item.key, newQuality);
});

it('calls onRemove when the row is removed', () => {
  const onRemove = jest.fn();
  const component = renderer.create(<QualityPresetTable onRemove={onRemove} />);
  const list = component.root.findByType(FlatList);
  const row = list.props.renderItem(element);

  row.props.onRemove();

  expect(onRemove).toHaveBeenCalledWith(element.item.key);
});

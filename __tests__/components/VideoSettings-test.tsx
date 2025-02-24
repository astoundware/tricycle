import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import {Picker} from '@react-native-picker/picker';

import {
  VideoSettings,
  NumberInput,
  VideoCodecQualityTable,
  VideoAspectRatioPresetTable,
  VideoSizePresetTable,
} from '@components';
import '@config/i18n';
import {
  createDisplayValues,
  createNumber,
  createString,
  createVideoAspectRatioPresets,
  createVideoCodecQualities,
  createVideoSizePresets,
} from '@test-utils/fixtures';

it('renders the deinterlace options correctly', () => {
  const items = createDisplayValues();
  const component = renderer.create(<VideoSettings deinterlaceItems={items} />);
  const picker = component.root.findByType(Picker);
  const pickerItems = picker.props.children;

  expect(pickerItems).toHaveLength(items.length);

  items.forEach((item, i) => {
    const pickerItem = pickerItems[i];

    expect(pickerItem.props.label).toBe(item.text);
    expect(pickerItem.props.value).toBe(item.key);
  });
});

it('renders the selected deinterlace correctly', () => {
  const deinterlace = createString();
  const component = renderer.create(
    <VideoSettings deinterlace={deinterlace} />,
  );
  const picker = component.root.findByType(Picker);

  expect(picker.props.selectedValue).toBe(deinterlace);
});

it('calls onDeinterlaceChange when deinterlace is changed', () => {
  const deinterlace = createString();
  const onDeinterlaceChange = jest.fn();
  const component = renderer.create(
    <VideoSettings onDeinterlaceChange={onDeinterlaceChange} />,
  );
  const picker = component.root.findByType(Picker);

  picker.props.onValueChange(deinterlace);

  expect(onDeinterlaceChange).toHaveBeenCalledWith(deinterlace);
});

it('renders the size divisor correctly', () => {
  const divisor = createNumber();
  const component = renderer.create(<VideoSettings sizeDivisor={divisor} />);
  const input = component.root.findByType(NumberInput);

  expect(input.props.value).toBe(divisor);
});

it('calls onSizeDivisorChange when size divisor is changed', () => {
  const divisor = createNumber();
  const onSizeDivisorChange = jest.fn();
  const component = renderer.create(
    <VideoSettings onSizeDivisorChange={onSizeDivisorChange} />,
  );
  const input = component.root.findByType(NumberInput);

  input.props.onValueChange(divisor);

  expect(onSizeDivisorChange).toHaveBeenCalledWith(divisor);
});

it('renders the codec qualities correctly', () => {
  const codecQualities = createVideoCodecQualities();
  const component = renderer.create(
    <VideoSettings codecQualities={codecQualities} />,
  );
  const table = component.root.findByType(VideoCodecQualityTable);

  expect(table.props.codecs).toBe(codecQualities);
});

it('calls onCodecQualityMinChange when codec quality min value is changed', () => {
  const key = createString();
  const min = createNumber();
  const onCodecQualityMinChange = jest.fn();
  const component = renderer.create(
    <VideoSettings onCodecQualityMinChange={onCodecQualityMinChange} />,
  );
  const table = component.root.findByType(VideoCodecQualityTable);

  table.props.onMinChange(key, min);

  expect(onCodecQualityMinChange).toHaveBeenCalledWith(key, min);
});

it('calls onCodecQualityMaxChange when codec quality max value is changed', () => {
  const key = createString();
  const max = createNumber();
  const onCodecQualityMaxChange = jest.fn();
  const component = renderer.create(
    <VideoSettings onCodecQualityMaxChange={onCodecQualityMaxChange} />,
  );
  const table = component.root.findByType(VideoCodecQualityTable);

  table.props.onMaxChange(key, max);

  expect(onCodecQualityMaxChange).toHaveBeenCalledWith(key, max);
});

it('calls onCodecQualityStepsChange when codec quality steps value is changed', () => {
  const key = createString();
  const steps = createNumber();
  const onCodecQualityStepsChange = jest.fn();
  const component = renderer.create(
    <VideoSettings onCodecQualityStepsChange={onCodecQualityStepsChange} />,
  );
  const table = component.root.findByType(VideoCodecQualityTable);

  table.props.onStepsChange(key, steps);

  expect(onCodecQualityStepsChange).toHaveBeenCalledWith(key, steps);
});

it('renders the size presets correctly', () => {
  const sizePresets = createVideoSizePresets();
  const component = renderer.create(
    <VideoSettings sizePresets={sizePresets} />,
  );
  const table = component.root.findByType(VideoSizePresetTable);

  expect(table.props.presets).toBe(sizePresets);
});

it('calls onSizePresetNameChange when size preset name is changed', () => {
  const key = createString();
  const name = createString();
  const onSizePresetNameChange = jest.fn();
  const component = renderer.create(
    <VideoSettings onSizePresetNameChange={onSizePresetNameChange} />,
  );
  const table = component.root.findByType(VideoSizePresetTable);

  table.props.onNameChange(key, name);

  expect(onSizePresetNameChange).toHaveBeenCalledWith(key, name);
});

it('calls onSizePresetWidthChange when size preset width value is changed', () => {
  const key = createString();
  const width = createNumber();
  const onSizePresetWidthChange = jest.fn();
  const component = renderer.create(
    <VideoSettings onSizePresetWidthChange={onSizePresetWidthChange} />,
  );
  const table = component.root.findByType(VideoSizePresetTable);

  table.props.onWidthChange(key, width);

  expect(onSizePresetWidthChange).toHaveBeenCalledWith(key, width);
});

it('calls onSizePresetHeightChange when size preset height value is changed', () => {
  const key = createString();
  const height = createNumber();
  const onSizePresetHeightChange = jest.fn();
  const component = renderer.create(
    <VideoSettings onSizePresetHeightChange={onSizePresetHeightChange} />,
  );
  const table = component.root.findByType(VideoSizePresetTable);

  table.props.onHeightChange(key, height);

  expect(onSizePresetHeightChange).toHaveBeenCalledWith(key, height);
});

it('calls onSizePresetRemove when size preset is removed', () => {
  const key = createString();
  const onSizePresetRemove = jest.fn();
  const component = renderer.create(
    <VideoSettings onSizePresetRemove={onSizePresetRemove} />,
  );
  const table = component.root.findByType(VideoSizePresetTable);

  table.props.onRemove(key);

  expect(onSizePresetRemove).toHaveBeenCalledWith(key);
});

it('renders the aspect ratio presets correctly', () => {
  const aspectRatioPresets = createVideoAspectRatioPresets();
  const component = renderer.create(
    <VideoSettings aspectRatioPresets={aspectRatioPresets} />,
  );
  const table = component.root.findByType(VideoAspectRatioPresetTable);

  expect(table.props.presets).toBe(aspectRatioPresets);
});

it('calls onAspectRatioPresetNameChange when aspect ratio preset name is changed', () => {
  const key = createString();
  const name = createString();
  const onAspectRatioPresetNameChange = jest.fn();
  const component = renderer.create(
    <VideoSettings
      onAspectRatioPresetNameChange={onAspectRatioPresetNameChange}
    />,
  );
  const table = component.root.findByType(VideoAspectRatioPresetTable);

  table.props.onNameChange(key, name);

  expect(onAspectRatioPresetNameChange).toHaveBeenCalledWith(key, name);
});

it('calls onAspectRatioPresetWidthChange when aspect ratio preset width value is changed', () => {
  const key = createString();
  const width = createNumber();
  const onAspectRatioPresetWidthChange = jest.fn();
  const component = renderer.create(
    <VideoSettings
      onAspectRatioPresetWidthChange={onAspectRatioPresetWidthChange}
    />,
  );
  const table = component.root.findByType(VideoAspectRatioPresetTable);

  table.props.onWidthChange(key, width);

  expect(onAspectRatioPresetWidthChange).toHaveBeenCalledWith(key, width);
});

it('calls onAspectRatioPresetHeightChange when aspect ratio preset height value is changed', () => {
  const key = createString();
  const height = createNumber();
  const onAspectRatioPresetHeightChange = jest.fn();
  const component = renderer.create(
    <VideoSettings
      onAspectRatioPresetHeightChange={onAspectRatioPresetHeightChange}
    />,
  );
  const table = component.root.findByType(VideoAspectRatioPresetTable);

  table.props.onHeightChange(key, height);

  expect(onAspectRatioPresetHeightChange).toHaveBeenCalledWith(key, height);
});

it('calls onAspectRatioPresetRemove when aspect ratio preset is removed', () => {
  const key = createString();
  const onAspectRatioPresetRemove = jest.fn();
  const component = renderer.create(
    <VideoSettings onAspectRatioPresetRemove={onAspectRatioPresetRemove} />,
  );
  const table = component.root.findByType(VideoAspectRatioPresetTable);

  table.props.onRemove(key);

  expect(onAspectRatioPresetRemove).toHaveBeenCalledWith(key);
});

import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';

import {
  AudioSettings,
  AudioQualityPresetTable,
  LabeledSwitch,
} from '@components';
import '@config/i18n';
import {
  createAudioQualityPresets,
  createBoolean,
  createDisplayValues,
  createKey,
  createNumber,
  createString,
} from '@test-utils/fixtures';

it('renders the passthru matching tracks value correctly', () => {
  const value = createBoolean();
  const component = renderer.create(
    <AudioSettings passthruMatchingTracksEnabled={value} />,
  );
  const sw = component.root.findByType(LabeledSwitch);

  expect(sw.props.value).toBe(value);
});

it('calls onPassthruMatchingTracksChange when passthru matching tracks is toggled', () => {
  const value = createBoolean();
  const onPassthruMatchingTracksChange = jest.fn();
  const component = renderer.create(
    <AudioSettings
      onPassthruMatchingTracksChange={onPassthruMatchingTracksChange}
    />,
  );
  const switches = component.root.findAllByType(LabeledSwitch);

  switches[0].props.onValueChange(value);

  expect(onPassthruMatchingTracksChange).toHaveBeenCalledWith(value);
});

it('renders the quality presets correctly', () => {
  const presets = createAudioQualityPresets();
  const component = renderer.create(<AudioSettings qualityPresets={presets} />);
  const table = component.root.findByType(AudioQualityPresetTable);

  expect(table.props.presets).toBe(presets);
});

it('renders the quality preset format options correctly', () => {
  const items = createDisplayValues();
  const component = renderer.create(<AudioSettings formatItems={items} />);
  const table = component.root.findByType(AudioQualityPresetTable);

  expect(table.props.formatItems).toBe(items);
});

it('renders the quality preset mixdown options correctly', () => {
  const items = createDisplayValues();
  const component = renderer.create(<AudioSettings mixdownItems={items} />);
  const table = component.root.findByType(AudioQualityPresetTable);

  expect(table.props.mixdownItems).toBe(items);
});

it('calls onQualityPresetFormatChange when quality preset format is changed', () => {
  const key = createKey();
  const format = createString();
  const onQualityPresetFormatChange = jest.fn();
  const component = renderer.create(
    <AudioSettings onQualityPresetFormatChange={onQualityPresetFormatChange} />,
  );
  const table = component.root.findByType(AudioQualityPresetTable);

  table.props.onFormatChange(key, format);

  expect(onQualityPresetFormatChange).toHaveBeenCalledWith(key, format);
});

it('calls onQualityPresetMixdownChange when quality preset mixdown is changed', () => {
  const key = createKey();
  const mixdown = createString();
  const onQualityPresetMixdownChange = jest.fn();
  const component = renderer.create(
    <AudioSettings
      onQualityPresetMixdownChange={onQualityPresetMixdownChange}
    />,
  );
  const table = component.root.findByType(AudioQualityPresetTable);

  table.props.onMixdownChange(key, mixdown);

  expect(onQualityPresetMixdownChange).toHaveBeenCalledWith(key, mixdown);
});

it('calls onQualityPresetQualityChange when quality preset quality is changed', () => {
  const key = createKey();
  const quality = createNumber();
  const onQualityPresetQualityChange = jest.fn();
  const component = renderer.create(
    <AudioSettings
      onQualityPresetQualityChange={onQualityPresetQualityChange}
    />,
  );
  const table = component.root.findByType(AudioQualityPresetTable);

  table.props.onQualityChange(key, quality);

  expect(onQualityPresetQualityChange).toHaveBeenCalledWith(key, quality);
});

it('calls onQualityPresetRemove when quality preset is removed', () => {
  const key = createKey();
  const onQualityPresetRemove = jest.fn();
  const component = renderer.create(
    <AudioSettings onQualityPresetRemove={onQualityPresetRemove} />,
  );
  const table = component.root.findByType(AudioQualityPresetTable);

  table.props.onRemove(key);

  expect(onQualityPresetRemove).toHaveBeenCalledWith(key);
});

import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import {Picker} from '@react-native-picker/picker';

import {AdvancedSettings, LabeledSwitch, PlatformTextInput} from '@components';
import '@config/i18n';

it('renders the trace logging value correctly', () => {
  const value = true;
  const component = renderer.create(
    <AdvancedSettings traceLoggingEnabled={value} />,
  );
  const labeledSwitch = component.root.findByType(LabeledSwitch);

  expect(labeledSwitch.props.value).toBe(value);
});

it('calls onTraceLoggingChange when trace logging is toggled', () => {
  const value = true;
  const onTraceLoggingChange = jest.fn();
  const component = renderer.create(
    <AdvancedSettings onTraceLoggingChange={onTraceLoggingChange} />,
  );
  const labeledSwitch = component.root.findByType(LabeledSwitch);

  labeledSwitch.props.onValueChange(value);

  expect(onTraceLoggingChange).toHaveBeenCalledWith(value);
});

it('renders the x264 preset options correctly', () => {
  const items = [
    {key: 'slow', text: 'Slow'},
    {key: 'fast', text: 'Fast'},
  ];
  const component = renderer.create(
    <AdvancedSettings x264PresetItems={items} />,
  );
  const pickers = component.root.findAllByType(Picker);
  const pickerItems = pickers[0].props.children;

  expect(pickerItems).toHaveLength(items.length);

  items.forEach((item, i) => {
    const pickerItem = pickerItems[i];

    expect(pickerItem.props.label).toBe(item.text);
    expect(pickerItem.props.value).toBe(item.key);
  });
});

it('renders the selected x264 preset correctly', () => {
  const preset = 'fast';
  const component = renderer.create(<AdvancedSettings x264Preset={preset} />);
  const pickers = component.root.findAllByType(Picker);

  expect(pickers[0].props.selectedValue).toBe(preset);
});

it('calls onX264PresetChange when x264 preset is changed', () => {
  const preset = 'fast';
  const onX264PresetChange = jest.fn();
  const component = renderer.create(
    <AdvancedSettings onX264PresetChange={onX264PresetChange} />,
  );
  const pickers = component.root.findAllByType(Picker);

  pickers[0].props.onValueChange(preset);

  expect(onX264PresetChange).toHaveBeenCalledWith(preset);
});

it('renders the x265 preset options correctly', () => {
  const items = [
    {key: 'slow', text: 'Slow'},
    {key: 'fast', text: 'Fast'},
  ];
  const component = renderer.create(
    <AdvancedSettings x265PresetItems={items} />,
  );
  const pickers = component.root.findAllByType(Picker);
  const pickerItems = pickers[1].props.children;

  expect(pickerItems).toHaveLength(items.length);

  items.forEach((item, i) => {
    const pickerItem = pickerItems[i];

    expect(pickerItem.props.label).toBe(item.text);
    expect(pickerItem.props.value).toBe(item.key);
  });
});

it('renders the selected x265 preset correctly', () => {
  const preset = 'fast';
  const component = renderer.create(<AdvancedSettings x265Preset={preset} />);
  const pickers = component.root.findAllByType(Picker);

  expect(pickers[1].props.selectedValue).toBe(preset);
});

it('calls onX265PresetChange when x265 preset is changed', () => {
  const preset = 'fast';
  const onX265PresetChange = jest.fn();
  const component = renderer.create(
    <AdvancedSettings onX265PresetChange={onX265PresetChange} />,
  );
  const pickers = component.root.findAllByType(Picker);

  pickers[1].props.onValueChange(preset);

  expect(onX265PresetChange).toHaveBeenCalledWith(preset);
});

it('renders the HEVC tag correctly', () => {
  const tag = 'hvc1';
  const component = renderer.create(<AdvancedSettings hevcTag={tag} />);
  const inputs = component.root.findAllByType(PlatformTextInput);

  expect(inputs[0].props.value).toBe(tag);
});

it('calls onHevcTagChange when HEVC tag is changed', () => {
  const tag = 'hvc1';
  const onHevcTagChange = jest.fn();
  const component = renderer.create(
    <AdvancedSettings onHevcTagChange={onHevcTagChange} />,
  );
  const inputs = component.root.findAllByType(PlatformTextInput);

  inputs[0].props.onChangeText(tag);

  expect(onHevcTagChange).toHaveBeenCalledWith(tag);
});

it('renders the AAC codec correctly', () => {
  const codec = 'aac';
  const component = renderer.create(<AdvancedSettings aacCodec={codec} />);
  const inputs = component.root.findAllByType(PlatformTextInput);

  expect(inputs[1].props.value).toBe(codec);
});

it('calls onAacCodecChange when AAC codec is changed', () => {
  const codec = 'aac';
  const onAacCodecChange = jest.fn();
  const component = renderer.create(
    <AdvancedSettings onAacCodecChange={onAacCodecChange} />,
  );
  const inputs = component.root.findAllByType(PlatformTextInput);

  inputs[1].props.onChangeText(codec);

  expect(onAacCodecChange).toHaveBeenCalledWith(codec);
});

it('renders the Dolby Digital codec correctly', () => {
  const codec = 'ac3';
  const component = renderer.create(
    <AdvancedSettings dolbyDigitalCodec={codec} />,
  );
  const inputs = component.root.findAllByType(PlatformTextInput);

  expect(inputs[2].props.value).toBe(codec);
});

it('calls onDolbyDigitalCodecChange when Dolby Digital codec is changed', () => {
  const codec = 'ac3';
  const onDolbyDigitalCodecChange = jest.fn();
  const component = renderer.create(
    <AdvancedSettings onDolbyDigitalCodecChange={onDolbyDigitalCodecChange} />,
  );
  const inputs = component.root.findAllByType(PlatformTextInput);

  inputs[2].props.onChangeText(codec);

  expect(onDolbyDigitalCodecChange).toHaveBeenCalledWith(codec);
});

it('renders the crop detect options correctly', () => {
  const options = '0.125:2:0';
  const component = renderer.create(
    <AdvancedSettings cropDetectOptions={options} />,
  );
  const inputs = component.root.findAllByType(PlatformTextInput);

  expect(inputs[3].props.value).toBe(options);
});

it('calls onCropDetectOptionsChange when crop detect options are changed', () => {
  const options = '0.125:2:0';
  const onCropDetectOptionsChange = jest.fn();
  const component = renderer.create(
    <AdvancedSettings onCropDetectOptionsChange={onCropDetectOptionsChange} />,
  );
  const inputs = component.root.findAllByType(PlatformTextInput);

  inputs[3].props.onChangeText(options);

  expect(onCropDetectOptionsChange).toHaveBeenCalledWith(options);
});

it('renders the deinterlace options correctly', () => {
  const options = 'bwdif';
  const component = renderer.create(
    <AdvancedSettings deinterlaceOptions={options} />,
  );
  const inputs = component.root.findAllByType(PlatformTextInput);

  expect(inputs[4].props.value).toBe(options);
});

it('calls onDeinterlaceOptionsChange when deinterlace options are changed', () => {
  const options = 'bwdif';
  const onDeinterlaceOptionsChange = jest.fn();
  const component = renderer.create(
    <AdvancedSettings
      onDeinterlaceOptionsChange={onDeinterlaceOptionsChange}
    />,
  );
  const inputs = component.root.findAllByType(PlatformTextInput);

  inputs[4].props.onChangeText(options);

  expect(onDeinterlaceOptionsChange).toHaveBeenCalledWith(options);
});

it('renders the denoise options correctly', () => {
  const options = 'hqdn3d';
  const component = renderer.create(
    <AdvancedSettings denoiseOptions={options} />,
  );
  const inputs = component.root.findAllByType(PlatformTextInput);

  expect(inputs[5].props.value).toBe(options);
});

it('calls onDenoiseOptionsChange when denoise options are changed', () => {
  const options = 'hqdn3d';
  const onDenoiseOptionsChange = jest.fn();
  const component = renderer.create(
    <AdvancedSettings onDenoiseOptionsChange={onDenoiseOptionsChange} />,
  );
  const inputs = component.root.findAllByType(PlatformTextInput);

  inputs[5].props.onChangeText(options);

  expect(onDenoiseOptionsChange).toHaveBeenCalledWith(options);
});

it('renders the tonemap options correctly', () => {
  const options = 'hable';
  const component = renderer.create(
    <AdvancedSettings tonemapOptions={options} />,
  );
  const inputs = component.root.findAllByType(PlatformTextInput);

  expect(inputs[6].props.value).toBe(options);
});

it('calls onTonemapOptionsChange when tonemap options are changed', () => {
  const options = 'hable';
  const onTonemapOptionsChange = jest.fn();
  const component = renderer.create(
    <AdvancedSettings onTonemapOptionsChange={onTonemapOptionsChange} />,
  );
  const inputs = component.root.findAllByType(PlatformTextInput);

  inputs[6].props.onChangeText(options);

  expect(onTonemapOptionsChange).toHaveBeenCalledWith(options);
});

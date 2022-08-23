import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import {Picker} from '@react-native-picker/picker';

import {
  GeneralSettings,
  ImageButton,
  LabeledSwitch,
  PlatformTextInput,
  TemplateTable,
} from '../../App/components';
import '../../App/config/i18n';

it('renders the completion alert value correctly', () => {
  const value = true;
  const component = renderer.create(
    <GeneralSettings completionAlertEnabled={value} />,
  );
  const switches = component.root.findAllByType(LabeledSwitch);

  expect(switches[0].props.value).toBe(value);
});

it('calls onCompletionAlertChange when completion alert is toggled', () => {
  const value = true;
  const onCompletionAlertChange = jest.fn();
  const component = renderer.create(
    <GeneralSettings onCompletionAlertChange={onCompletionAlertChange} />,
  );
  const switches = component.root.findAllByType(LabeledSwitch);

  switches[0].props.onValueChange(value);

  expect(onCompletionAlertChange).toHaveBeenCalledWith(value);
});

it('renders the incomplete deletion value correctly', () => {
  const value = true;
  const component = renderer.create(
    <GeneralSettings incompleteDeletionEnabled={value} />,
  );
  const switches = component.root.findAllByType(LabeledSwitch);

  expect(switches[1].props.value).toBe(value);
});

it('calls onIncompleteDeletionChange when incomplete deletion is toggled', () => {
  const value = true;
  const onIncompleteDeletionChange = jest.fn();
  const component = renderer.create(
    <GeneralSettings onIncompleteDeletionChange={onIncompleteDeletionChange} />,
  );
  const switches = component.root.findAllByType(LabeledSwitch);

  switches[1].props.onValueChange(value);

  expect(onIncompleteDeletionChange).toHaveBeenCalledWith(value);
});

it('renders the forced subtitles value correctly', () => {
  const value = true;
  const component = renderer.create(
    <GeneralSettings forcedSubtitlesEnabled={value} />,
  );
  const switches = component.root.findAllByType(LabeledSwitch);

  expect(switches[2].props.value).toBe(value);
});

it('calls onForcedSubtitlesChange when forced subtitles is toggled', () => {
  const value = true;
  const onForcedSubtitlesChange = jest.fn();
  const component = renderer.create(
    <GeneralSettings onForcedSubtitlesChange={onForcedSubtitlesChange} />,
  );
  const switches = component.root.findAllByType(LabeledSwitch);

  switches[2].props.onValueChange(value);

  expect(onForcedSubtitlesChange).toHaveBeenCalledWith(value);
});

it('renders the soft subtitles value correctly', () => {
  const value = true;
  const component = renderer.create(
    <GeneralSettings softSubtitlesEnabled={value} />,
  );
  const switches = component.root.findAllByType(LabeledSwitch);

  expect(switches[3].props.value).toBe(value);
});

it('calls onSoftSubtitlesChange when soft subtitles is toggled', () => {
  const value = true;
  const onSoftSubtitlesChange = jest.fn();
  const component = renderer.create(
    <GeneralSettings onSoftSubtitlesChange={onSoftSubtitlesChange} />,
  );
  const switches = component.root.findAllByType(LabeledSwitch);

  switches[3].props.onValueChange(value);

  expect(onSoftSubtitlesChange).toHaveBeenCalledWith(value);
});

it('renders the MP4 file extension correctly', () => {
  const extension = 'm4v';
  const component = renderer.create(
    <GeneralSettings mp4FileExtension={extension} />,
  );
  const inputs = component.root.findAllByType(PlatformTextInput);

  expect(inputs[0].props.value).toBe(extension);
});

it('calls onMp4FileExtensionChange when MP4 file extension is changed', () => {
  const extension = 'm4v';
  const onMp4FileExtensionChange = jest.fn();
  const component = renderer.create(
    <GeneralSettings onMp4FileExtensionChange={onMp4FileExtensionChange} />,
  );
  const inputs = component.root.findAllByType(PlatformTextInput);

  inputs[0].props.onChangeText(extension);

  expect(onMp4FileExtensionChange).toHaveBeenCalledWith(extension);
});

it('renders the MKV file extension correctly', () => {
  const extension = 'mkv';
  const component = renderer.create(
    <GeneralSettings mkvFileExtension={extension} />,
  );
  const inputs = component.root.findAllByType(PlatformTextInput);

  expect(inputs[1].props.value).toBe(extension);
});

it('calls onMkvFileExtensionChange when MKV file extension is changed', () => {
  const extension = 'mkv';
  const onMkvFileExtensionChange = jest.fn();
  const component = renderer.create(
    <GeneralSettings onMkvFileExtensionChange={onMkvFileExtensionChange} />,
  );
  const inputs = component.root.findAllByType(PlatformTextInput);

  inputs[1].props.onChangeText(extension);

  expect(onMkvFileExtensionChange).toHaveBeenCalledWith(extension);
});

it('renders the destination mode options correctly', () => {
  const items = [
    {key: 'manual', text: 'Manual'},
    {key: 'auto', text: 'Auto'},
  ];
  const component = renderer.create(
    <GeneralSettings destinationModeItems={items} />,
  );
  const picker = component.root.findByType(Picker);
  const pickerItems = picker.props.children;

  expect(pickerItems).toHaveLength(items.length);

  items.forEach((item, i) => {
    const pickerItem = pickerItems[i];

    expect(pickerItem.props.label).toBe(item.text);
    expect(pickerItem.props.value).toBe(item.key);
  });
});

it('renders the selected destination mode correctly', () => {
  const mode = 'auto';
  const component = renderer.create(<GeneralSettings destinationMode={mode} />);
  const picker = component.root.findByType(Picker);

  expect(picker.props.selectedValue).toBe(mode);
});

it('calls onDestinationModeChange when destination mode is changed', () => {
  const mode = 'auto';
  const onDestinationModeChange = jest.fn();
  const component = renderer.create(
    <GeneralSettings onDestinationModeChange={onDestinationModeChange} />,
  );
  const picker = component.root.findByType(Picker);

  picker.props.onValueChange(mode);

  expect(onDestinationModeChange).toHaveBeenCalledWith(mode);
});

it('renders the destination folder correctly', () => {
  const folder = 'movies';
  const component = renderer.create(
    <GeneralSettings destinationFolder={folder} />,
  );
  const inputs = component.root.findAllByType(PlatformTextInput);

  expect(inputs[2].props.value).toBe(folder);
});

it('calls onDestinationFolderBrowse when browse button is pressed', () => {
  const onDestinationFolderBrowse = jest.fn();
  const component = renderer.create(
    <GeneralSettings onDestinationFolderBrowse={onDestinationFolderBrowse} />,
  );
  const button = component.root.findByType(ImageButton);

  button.props.onPress();

  expect(onDestinationFolderBrowse).toHaveBeenCalled();
});

it('renders the templates correctly', () => {
  const templates = [
    {key: 1, name: 'Template 1'},
    {key: 2, name: 'Template 2'},
  ];
  const component = renderer.create(<GeneralSettings templates={templates} />);
  const table = component.root.findByType(TemplateTable);

  expect(table.props.templates).toBe(templates);
});

it('calls onTemplateNameChange when destination mode is changed', () => {
  const index = 1;
  const name = 'New Template';
  const onTemplateNameChange = jest.fn();
  const component = renderer.create(
    <GeneralSettings onTemplateNameChange={onTemplateNameChange} />,
  );
  const table = component.root.findByType(TemplateTable);

  table.props.onNameChange(index, name);

  expect(onTemplateNameChange).toHaveBeenCalledWith(index, name);
});

it('calls onTemplateRemove when destination mode is changed', () => {
  const index = 1;
  const onTemplateRemove = jest.fn();
  const component = renderer.create(
    <GeneralSettings onTemplateRemove={onTemplateRemove} />,
  );
  const table = component.root.findByType(TemplateTable);

  table.props.onRemove(index);

  expect(onTemplateRemove).toHaveBeenCalledWith(index);
});

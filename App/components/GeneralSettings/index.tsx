import React from 'react';
import {Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTranslation} from 'react-i18next';

import {folderBrowse} from '@images';
import {DisplayValue, Template, ValueChangeHandler} from '@models';
import ImageButton from '../ImageButton';
import LabeledSwitch from '../LabeledSwitch';
import PlatformTextInput from '../PlatformTextInput';
import TemplateTable from '../TemplateTable';
import styles from './styles';

export type Props = {
  style?: any;
  completionAlertEnabled?: boolean;
  onCompletionAlertChange?: ValueChangeHandler<boolean>;
  incompleteDeletionEnabled?: boolean;
  onIncompleteDeletionChange?: ValueChangeHandler<boolean>;
  forcedSubtitlesEnabled?: boolean;
  onForcedSubtitlesChange?: ValueChangeHandler<boolean>;
  softSubtitlesEnabled?: boolean;
  onSoftSubtitlesChange?: ValueChangeHandler<boolean>;
  mp4FileExtension?: string;
  onMp4FileExtensionChange?: ValueChangeHandler<string>;
  mkvFileExtension?: string;
  onMkvFileExtensionChange?: ValueChangeHandler<string>;
  destinationModeItems?: DisplayValue[];
  destinationMode?: string;
  onDestinationModeChange?: ValueChangeHandler<string>;
  destinationFolder?: string;
  isDestinationFolderBrowseDisabled?: boolean;
  onDestinationFolderBrowse?: () => void;
  templates?: Template[];
  onTemplateNameChange?: (index: number, name: string) => void;
  onTemplateRemove?: (index: number) => void;
};

export default function GeneralSettings({
  style,
  completionAlertEnabled,
  onCompletionAlertChange,
  incompleteDeletionEnabled,
  onIncompleteDeletionChange,
  forcedSubtitlesEnabled,
  onForcedSubtitlesChange,
  softSubtitlesEnabled,
  onSoftSubtitlesChange,
  mp4FileExtension,
  onMp4FileExtensionChange,
  mkvFileExtension,
  onMkvFileExtensionChange,
  destinationModeItems,
  destinationMode,
  onDestinationModeChange,
  destinationFolder,
  isDestinationFolderBrowseDisabled,
  onDestinationFolderBrowse,
  templates,
  onTemplateNameChange,
  onTemplateRemove,
}: Props) {
  const {t} = useTranslation();

  return (
    <View style={[styles.container, style]}>
      <LabeledSwitch
        label={t('settings.completionAlert')}
        value={completionAlertEnabled}
        onValueChange={onCompletionAlertChange}
      />
      <LabeledSwitch
        label={t('settings.deleteIncompleteFiles')}
        value={incompleteDeletionEnabled}
        onValueChange={onIncompleteDeletionChange}
      />
      <LabeledSwitch
        label={t('settings.enableForcedSubtitles')}
        value={forcedSubtitlesEnabled}
        onValueChange={onForcedSubtitlesChange}
      />
      <LabeledSwitch
        label={t('settings.enableSoftSubtitles')}
        value={softSubtitlesEnabled}
        onValueChange={onSoftSubtitlesChange}
      />
      <View style={styles.table}>
        <View style={styles.column}>
          <View style={[styles.row, styles.labelRow]}>
            <Text style={styles.label}>{t('settings.mp4FileExtension')}</Text>
          </View>
          <View style={[styles.row, styles.labelRow]}>
            <Text style={styles.label}>{t('settings.mkvFileExtension')}</Text>
          </View>
          <View style={styles.labelRow}>
            <Text style={styles.label}>{t('settings.destinationFolder')}</Text>
          </View>
        </View>
        <View>
          <PlatformTextInput
            style={[styles.row, styles.input]}
            value={mp4FileExtension}
            onChangeText={onMp4FileExtensionChange}
          />
          <PlatformTextInput
            style={[styles.row, styles.input]}
            value={mkvFileExtension}
            onChangeText={onMkvFileExtensionChange}
          />
          <Picker
            style={styles.input}
            selectedValue={destinationMode}
            onValueChange={onDestinationModeChange}>
            {(destinationModeItems || []).map((item: DisplayValue) => (
              <Picker.Item key={item.key} label={item.text} value={item.key} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={[styles.row, styles.destinationRow]}>
        <PlatformTextInput
          style={styles.folderInput}
          value={destinationFolder}
          editable={false}
        />
        <ImageButton
          imageSource={folderBrowse}
          disabled={isDestinationFolderBrowseDisabled}
          onPress={onDestinationFolderBrowse}
        />
      </View>
      <View style={styles.templateContainer}>
        <View style={styles.templateHeader}>
          <Text style={styles.templateTitle}>{t('templates.title')}</Text>
        </View>
        <TemplateTable
          templates={templates}
          onNameChange={onTemplateNameChange}
          onRemove={onTemplateRemove}
        />
      </View>
    </View>
  );
}

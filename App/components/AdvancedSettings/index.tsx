import React from 'react';
import {Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTranslation} from 'react-i18next';

import {LabeledSwitch, PlatformTextInput} from '@components';
import {DisplayValue, ValueChangeHandler} from '@models';
import styles from './styles';

export type Props = {
  style?: any;
  traceLoggingEnabled?: boolean;
  onTraceLoggingChange?: ValueChangeHandler<boolean>;
  x264PresetItems?: DisplayValue[];
  x264Preset?: string;
  onX264PresetChange?: ValueChangeHandler<string>;
  x265PresetItems?: DisplayValue[];
  x265Preset?: string;
  onX265PresetChange?: ValueChangeHandler<string>;
  hevcTag?: string;
  onHevcTagChange?: ValueChangeHandler<string>;
  aacCodec?: string;
  onAacCodecChange?: ValueChangeHandler<string>;
  dolbyDigitalCodec?: string;
  onDolbyDigitalCodecChange?: ValueChangeHandler<string>;
  cropDetectOptions?: string;
  onCropDetectOptionsChange?: ValueChangeHandler<string>;
  deinterlaceOptions?: string;
  onDeinterlaceOptionsChange?: ValueChangeHandler<string>;
  denoiseOptions?: string;
  onDenoiseOptionsChange?: ValueChangeHandler<string>;
  tonemapOptions?: string;
  onTonemapOptionsChange?: ValueChangeHandler<string>;
};

export default function AdvancedSettings({
  style,
  traceLoggingEnabled,
  onTraceLoggingChange,
  x264PresetItems,
  x264Preset,
  onX264PresetChange,
  x265PresetItems,
  x265Preset,
  onX265PresetChange,
  hevcTag,
  onHevcTagChange,
  aacCodec,
  onAacCodecChange,
  dolbyDigitalCodec,
  onDolbyDigitalCodecChange,
  cropDetectOptions,
  onCropDetectOptionsChange,
  deinterlaceOptions,
  onDeinterlaceOptionsChange,
  denoiseOptions,
  onDenoiseOptionsChange,
  tonemapOptions,
  onTonemapOptionsChange,
}: Props) {
  const {t} = useTranslation();

  return (
    <View style={[styles.container, style]}>
      <LabeledSwitch
        label={`${t('settings.traceLogging')} (${t(
          'settings.restartRequired',
        )})`}
        value={traceLoggingEnabled}
        onValueChange={onTraceLoggingChange}
      />
      <View style={styles.table}>
        <View style={styles.column}>
          <View style={[styles.row, styles.labelRow]}>
            <Text style={styles.label}>{t('settings.x264Preset')}</Text>
          </View>
          <View style={[styles.row, styles.labelRow]}>
            <Text style={styles.label}>{t('settings.x265Preset')}</Text>
          </View>
          <View style={[styles.row, styles.labelRow]}>
            <Text style={styles.label}>{t('settings.hevcTag')}</Text>
          </View>
          <View style={[styles.row, styles.labelRow]}>
            <Text style={styles.label}>{t('settings.aacCodec')}</Text>
          </View>
          <View style={[styles.row, styles.labelRow]}>
            <Text style={styles.label}>{t('settings.dolbyDigitalCodec')}</Text>
          </View>
          <View style={[styles.row, styles.labelRow]}>
            <Text style={styles.label}>{t('settings.cropDetectOptions')}</Text>
          </View>
          <View style={[styles.row, styles.labelRow]}>
            <Text style={styles.label}>{t('settings.deinterlaceOptions')}</Text>
          </View>
          <View style={[styles.row, styles.labelRow]}>
            <Text style={styles.label}>{t('settings.denoiseOptions')}</Text>
          </View>
          <View style={[styles.row, styles.labelRow]}>
            <Text style={styles.label}>{t('settings.tonemapOptions')}</Text>
          </View>
        </View>
        <View>
          <Picker
            style={styles.input}
            selectedValue={x264Preset}
            onValueChange={onX264PresetChange}>
            {(x264PresetItems || []).map((item: DisplayValue) => (
              <Picker.Item key={item.key} label={item.text} value={item.key} />
            ))}
          </Picker>
          <Picker
            style={styles.input}
            selectedValue={x265Preset}
            onValueChange={onX265PresetChange}>
            {(x265PresetItems || []).map((item: DisplayValue) => (
              <Picker.Item key={item.key} label={item.text} value={item.key} />
            ))}
          </Picker>
          <PlatformTextInput
            style={[styles.row, styles.input]}
            value={hevcTag}
            onChangeText={onHevcTagChange}
          />
          <PlatformTextInput
            style={[styles.row, styles.input]}
            value={aacCodec}
            onChangeText={onAacCodecChange}
          />
          <PlatformTextInput
            style={[styles.row, styles.input]}
            value={dolbyDigitalCodec}
            onChangeText={onDolbyDigitalCodecChange}
          />
          <PlatformTextInput
            style={[styles.row, styles.input]}
            value={cropDetectOptions}
            onChangeText={onCropDetectOptionsChange}
          />
          <PlatformTextInput
            style={[styles.row, styles.input]}
            value={deinterlaceOptions}
            onChangeText={onDeinterlaceOptionsChange}
          />
          <PlatformTextInput
            style={[styles.row, styles.input]}
            value={denoiseOptions}
            onChangeText={onDenoiseOptionsChange}
          />
          <PlatformTextInput
            style={[styles.row, styles.input]}
            value={tonemapOptions}
            onChangeText={onTonemapOptionsChange}
          />
        </View>
      </View>
    </View>
  );
}

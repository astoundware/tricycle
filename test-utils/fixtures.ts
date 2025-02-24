import {faker} from '@faker-js/faker';
import {ListRenderItemInfo} from 'react-native';

import {
  AudioQualityPreset,
  DisplayValue,
  Template,
  VideoAspectRatioPreset,
  VideoCodecQuality,
  VideoDimensionsPreset,
  VideoSizePreset,
} from '@models';

export const createBoolean = () => faker.datatype.boolean();

export const createNumber = (min?: number, max?: number) =>
  faker.number.int({min, max});

export const createString = () => faker.string.alphanumeric();

export const createKey = () => faker.string.ulid();

export const createListRenderItemInfo = <T>(
  factory: () => T,
  index?: number,
): ListRenderItemInfo<T> => ({
  index: index ?? createNumber(),
  item: factory(),
  separators: {
    highlight: jest.fn(),
    unhighlight: jest.fn(),
    updateProps: jest.fn(),
  },
});

export const createDisplayValue = (
  displayValue?: Partial<DisplayValue>,
): DisplayValue => ({
  key: displayValue?.key || createKey(),
  text: displayValue?.text || createString(),
});

export const createDisplayValues = (count?: number): DisplayValue[] =>
  createMany(createDisplayValue, count);

export const createAudioQualityPreset = (
  preset?: Partial<AudioQualityPreset>,
): AudioQualityPreset => ({
  key: preset?.key || createKey(),
  format: preset?.format || createString(),
  mixdown: preset?.mixdown || createString(),
  quality: preset?.quality || createNumber(),
  removeDisabled: preset?.removeDisabled || createBoolean(),
});

export const createAudioQualityPresets = (count?: number) =>
  createMany(createAudioQualityPreset, count);

export const createTemplate = (template?: Partial<Template>): Template => ({
  key: template?.key || createKey(),
  name: template?.name || createString(),
  removeDisabled: template?.removeDisabled || createBoolean(),
});

export const createTemplates = (count?: number): Template[] =>
  createMany(createTemplate, count);

export const createVideoAspectRatioPreset = (
  videoAspectRatioPreset?: Partial<VideoAspectRatioPreset>,
): VideoAspectRatioPreset =>
  createVideoDimensionsPreset(videoAspectRatioPreset);

export const createVideoAspectRatioPresets = (count?: number) =>
  createMany(createVideoAspectRatioPreset, count);

export const createVideoCodecQuality = (
  videoCodecQuality?: Partial<VideoCodecQuality>,
): VideoCodecQuality => ({
  key: videoCodecQuality?.key || createKey(),
  name: videoCodecQuality?.name || createString(),
  min: videoCodecQuality?.min || createNumber(),
  max: videoCodecQuality?.max || createNumber(),
  steps: videoCodecQuality?.steps || createNumber(),
});

export const createVideoCodecQualities = (count?: number) =>
  createMany(createVideoCodecQuality, count);

export const createVideoDimensionsPreset = (
  videoDimensionsPreset?: Partial<VideoDimensionsPreset>,
): VideoDimensionsPreset => ({
  key: videoDimensionsPreset?.key || createKey(),
  name: videoDimensionsPreset?.name || createString(),
  width: videoDimensionsPreset?.width || createNumber(),
  height: videoDimensionsPreset?.height || createNumber(),
});

export const createVideoSizePreset = (
  videoSizePreset?: Partial<VideoSizePreset>,
): VideoSizePreset => createVideoDimensionsPreset(videoSizePreset);

export const createVideoSizePresets = (count?: number) =>
  createMany(createVideoSizePreset, count);

const createMany = <T>(factory: () => T, count?: number): T[] =>
  Array.from({length: count ?? createNumber(2, 5)}, factory);

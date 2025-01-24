import {faker} from '@faker-js/faker';
import {ListRenderItemInfo} from 'react-native';

import {AudioQualityPreset, DisplayValue, Template} from '@models';

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
});

export const createTemplate = (template?: Partial<Template>): Template => ({
  key: createKey(),
  name: createString(),
});

export const createTemplates = (count?: number): Template[] =>
  createMany(createTemplate, count);

const createMany = <T>(factory: () => T, count?: number): T[] =>
  Array.from({length: count ?? createNumber(2, 5)}, factory);

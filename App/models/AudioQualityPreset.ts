import {Removable} from './Removable';

export type AudioQualityPreset = Removable & {
  key: string;
  format: string;
  mixdown: string;
  quality: number;
};

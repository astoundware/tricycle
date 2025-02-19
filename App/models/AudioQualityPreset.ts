import {Removable} from './Removable';

export type AudioQualityPreset = Removable & {
  format: string;
  mixdown: string;
  quality: number;
};

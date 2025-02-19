import {Removable} from './Removable';

export type VideoSizePreset = Removable & {
  key: string;
  name: string;
  width: number;
  height: number;
};

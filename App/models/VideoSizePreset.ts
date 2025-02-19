import {Removable} from './Removable';

export type VideoSizePreset = Removable & {
  name: string;
  width: number;
  height: number;
};

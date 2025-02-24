import {Removable} from './Removable';

export type VideoDimensionsPreset = Removable & {
  name: string;
  width: number;
  height: number;
};

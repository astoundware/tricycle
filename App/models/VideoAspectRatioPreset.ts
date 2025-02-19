import {Removable} from './Removable';

export type VideoAspectRatioPreset = Removable & {
  name: string;
  width: number;
  height: number;
};

import {Removable} from './Removable';

export type VideoAspectRatioPreset = Removable & {
  key: string;
  name: string;
  width: number;
  height: number;
};

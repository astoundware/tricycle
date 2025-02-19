import {Removable} from './Removable';

export type Template = Removable & {
  key?: any;
  name?: string;
};

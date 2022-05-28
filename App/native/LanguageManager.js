import {NativeEventEmitter, NativeModules} from 'react-native';

export const {LanguageManager} = NativeModules;
export const LanguageManagerEvents = new NativeEventEmitter(LanguageManager);

import React, {useEffect, useRef} from 'react';
import {NativeEventEmitter, NativeModules, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Settings} from './screens';
import styles from './styles';
import './config/i18n';

const langEmitter = new NativeEventEmitter(NativeModules.LanguageManager);

export default function App() {
  const {i18n} = useTranslation();
  const langListenerRef = useRef(
    langEmitter.addListener('onLanguageChange', lang => {
      console.log('language changed:', lang);
      i18n.changeLanguage(lang);
    }),
  );

  useEffect(() => {
    const langListener = langListenerRef.current;

    NativeModules.LanguageManager.init();

    return function cleanup() {
      langListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Settings />
    </View>
  );
}

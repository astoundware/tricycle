import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {LanguageManager, LanguageManagerEvents} from './native';
import {Settings} from './screens';
import styles from './styles';
import './config/i18n';

export default function App() {
  const {i18n} = useTranslation();
  const langListenerRef = useRef(
    LanguageManagerEvents.addListener('onLanguageChange', i18n.changeLanguage),
  );

  useEffect(() => {
    const langListener = langListenerRef.current;

    LanguageManager.init();

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

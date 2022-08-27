import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import {EmitterSubscription} from 'react-native';

import {LanguageManager, LanguageManagerEvents} from '@native';
import App from '../App/index';

const mockChangeLanguage = jest.fn();

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({
    i18n: {
      changeLanguage: mockChangeLanguage,
    },
    t: jest.fn(),
  }),
}));

jest.mock('../App/native', () => ({
  LanguageManager: {
    init: jest.fn(),
  },
  LanguageManagerEvents: {
    addListener: jest.fn(),
  },
}));

it('renders correctly', () => {
  renderer.create(<App />);
});

it('calls init on LanguageManager', () => {
  renderer.create(<App />);

  expect(LanguageManager.init).toHaveBeenCalled();
});

it('calls i18n.changeLanguage on language change', () => {
  const lang = 'fr';
  LanguageManagerEvents.addListener = jest.fn((name, handle) => {
    if (name === 'onLanguageChange') {
      handle(lang);
    }

    return {} as EmitterSubscription;
  });

  renderer.create(<App />);

  expect(mockChangeLanguage).toHaveBeenCalledWith(lang);
});

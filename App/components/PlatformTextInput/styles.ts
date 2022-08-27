import {StyleSheet} from 'react-native';

import {theme} from '@config';

export default StyleSheet.create({
  text: {
    backgroundColor: theme.colors.inputBackground,
    borderColor: theme.colors.border,
    borderWidth: 0.5,
    borderBottomColor: '#c5c4c3',
    borderBottomWidth: 1,
    padding: 2,
    paddingBottom: 3,
  },
});
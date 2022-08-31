import {StyleSheet} from 'react-native';

import {theme} from '@config';

export default StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  itemContainer: {
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
});

import {StyleSheet} from 'react-native';

import {theme} from '@config';

export default StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 12,
    paddingVertical: 5,
    alignItems: 'center',
  },
  image: {
    width: 16,
    height: 16,
    opacity: 1,
  },
});

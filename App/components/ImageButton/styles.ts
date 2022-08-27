import {StyleSheet} from 'react-native';

import colors from '@constants/colors';

export default StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.border,
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

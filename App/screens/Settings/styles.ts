import {StyleSheet} from 'react-native';

import {theme} from '@config';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  list: {
    flex: 1,
    marginRight: 10,
  },
  section: {
    flex: 3,
    backgroundColor: theme.colors.panelBackground,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    color: theme.colors.panelTitle,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

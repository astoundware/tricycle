import {StyleSheet} from 'react-native';

import {theme} from '@config';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  tableContainer: {
    flex: 1,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  tableTitle: {
    fontWeight: 'bold',
  },
});

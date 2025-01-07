import {StyleSheet} from 'react-native';
import {theme} from '@config';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  table: {
    flexDirection: 'row',
    marginTop: 10,
  },
  column: {
    alignContent: 'center',
    marginRight: 10,
  },
  row: {
    marginBottom: 10,
  },
  labelRow: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {},
  input: {
    width: 100,
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

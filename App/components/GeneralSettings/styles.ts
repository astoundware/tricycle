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
    width: 175,
  },
  destinationRow: {
    flexDirection: 'row',
  },
  folderInput: {
    flex: 1,
    marginRight: 5,
  },
  templateContainer: {
    flex: 1,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  templateTitle: {
    fontWeight: 'bold',
  },
});

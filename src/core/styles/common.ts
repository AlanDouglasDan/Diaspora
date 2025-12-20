import { StyleSheet } from 'react-native';
import { palette } from './palette';

export const common = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  shadow: {
    shadowColor: palette.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  w100: {
    width: '100%',
  },
  h100: {
    height: '100%',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: palette.BLACK,
    opacity: 0.15,
  },
});

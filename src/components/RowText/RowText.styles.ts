import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';

const StyleRowText = StyleSheet.create({
  rowInfo: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: theme.light.quintary,
    fontSize:theme.size.fontSmaller
  }
});

export default StyleRowText;
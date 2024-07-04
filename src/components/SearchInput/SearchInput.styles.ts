import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';

const StyleSearchInput = StyleSheet.create({

  containerSearch : {
    width: `${theme.withScreen.medium}%`,
    paddingVertical: 10,
    margin: 40,
    backgroundColor: theme.light.backgroundPrimary,
  },
  input: {
    width: `${theme.withScreen.big}%`,
    height: 60,
    fontSize: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: theme.light.border,
    borderRadius: 8,
    overflow: 'hidden',
  }
});

export default StyleSearchInput;
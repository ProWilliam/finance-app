import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';

const StyleListFinance = StyleSheet.create({

  containerList : {
    width: `${theme.withScreen.medium}%`,

    borderWidth: 1,
    borderColor: theme.light.border,
    borderRadius: 8,

    marginBottom: 100,
  },
  separator: {
    width: `${theme.withScreen.big}%`,
    height: 2,
    backgroundColor: theme.light.backgroundSecondary 
  } 
});

export default StyleListFinance;
import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';

const StyleInfoProductScreen =  StyleSheet.create({
  container: {
    height: '100%',
    alignItems: "center",
    backgroundColor: theme.light.primary,
  },
  buttonSection: {
    width: `${theme.withScreen.big}%`,
    marginTop: 80,
    alignItems: "center",
  }
});

export default StyleInfoProductScreen; 
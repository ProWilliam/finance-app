import { StyleSheet, Platform } from 'react-native';
import theme from '../../theme/theme';
import {DimecionsScreenPlataforms} from '../../utils/DimencionsScreenPlataform';

const StyleInfoProductScreen =  StyleSheet.create({
  body: {
    height: "100%",
    alignItems: "center",
    backgroundColor: theme.light.primary,
  },
  container: {
    flex: 1,
    width: `${DimecionsScreenPlataforms()}%`,
    height: "100%",
    alignItems: "center",
    backgroundColor: theme.light.primary,
    justifyContent: "space-between",
  },
  buttonSection: {
    width: `${theme.withScreen.big}%`,
    marginBottom: 80,
    alignItems: "center",
  }
});

export default StyleInfoProductScreen; 
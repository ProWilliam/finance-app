import { StyleSheet, Platform } from 'react-native';
import theme from '../../theme/theme';
import {DimecionsScreenPlataforms} from '../../utils/DimencionsScreenPlataform';

const StylesFinanceProducts = StyleSheet.create({
  body: {
    height: "100%",
    alignItems: "center",
    backgroundColor: theme.light.primary,
  },
  container: {
    paddingBottom: 20,
    flex: 1,
    width: `${DimecionsScreenPlataforms()}%`,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: theme.light.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  }
});

export default StylesFinanceProducts;
import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';

const StylesFinanceProducts = StyleSheet.create({
  container: {
    paddingBottom: 20,
    flex: 1,
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
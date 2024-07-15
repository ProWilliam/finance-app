import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme/theme';

const styleAppNavigatior = StyleSheet.create({
  container : {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    backgroundColor: theme.light.primary,
  }
})
export default styleAppNavigatior;
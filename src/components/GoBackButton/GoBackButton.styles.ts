import { StyleSheet, Platform } from 'react-native';
import theme from '../../theme/theme';

const GoBackButtonStyles =  StyleSheet.create({
  iconCard: {
    marginLeft: Platform.OS === 'web' ? 200 : 0,
    color: theme.light.tertiary
  },
});

export default GoBackButtonStyles;
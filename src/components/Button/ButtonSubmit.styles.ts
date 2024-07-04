import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';

const StylesButtonSubmit = StyleSheet.create({
  button: {
    width: `${theme.withScreen.medium}%`,
    height: 60,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { 
    padding: 10, 
    color: theme.light.quaternary,
    fontSize: theme.size.fontSmaller,
    fontWeight: 'bold',
  },  
  colorPrimaryButton: {
    backgroundColor: theme.light.secondary,
  },
  colorSecondaryButton: {
    backgroundColor: theme.light.tertiary,
  },
  colorTertiary: {
    backgroundColor: theme.light.sentary,
  }
});

export default StylesButtonSubmit;
import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';

const StyleInputDate = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.light.tertiary,
    borderRadius: 5,
    color: theme.light.primary
  },
  textInput: {
    color: theme.light.quaternary,
    fontSize: theme.size.fontLittle,
    padding: 10,
  },
  inputWeb: {
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: theme.light.border,
    borderWidth: 1,
    borderRadius: 5,
  }
});


export default StyleInputDate
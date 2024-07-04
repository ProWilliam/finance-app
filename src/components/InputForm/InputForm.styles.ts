import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';


const StylesInput = StyleSheet.create({
  containerInput:{
    marginBottom: 5
  },
  input: {
    width: `${theme.withScreen.big}%`,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 20,
    fontSize: theme.size.fontLittle,
    
  },
  textError: {
    marginTop: 5,
    fontSize: 14,
    color: theme.light.sentary,
  },
  borderError: {
    borderColor: theme.light.sentary,
  },
  border: {
    borderColor: theme.light.tertiary,
  },
  colorPlaceHolder: {
    color: theme.light.quintary,
  }
})

export default StylesInput;
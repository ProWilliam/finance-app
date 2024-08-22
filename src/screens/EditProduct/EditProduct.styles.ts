import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';

const EditProductStyle =  StyleSheet.create({
  containerRegister: {
    width: `${theme.withScreen.big}%`,
    flex:1,
    paddingBottom: 20,
    paddingLeft: 60,
    backgroundColor: '#fefefe',
  },
  scroll:{
    width: `${theme.withScreen.big}%`,
  },
  title: {
    fontSize: theme.size.fontMedium
  }
})

export default EditProductStyle;
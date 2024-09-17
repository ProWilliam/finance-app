import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';
import { DimecionsScreenPlataforms } from '../../utils/DimencionsScreenPlataform';

const RegisterFormStyle =  StyleSheet.create({
  body: {
    height: "100%",
    alignItems: "center",
    backgroundColor: theme.light.primary,
  },
  containerRegister: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.light.primary,
    width: `${DimecionsScreenPlataforms()}%`,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: theme.size.fontMedium
  }, 
  scroll:{
    marginLeft: '20%',
    width: `${theme.withScreen.big}%`,
  },
})

export default RegisterFormStyle;
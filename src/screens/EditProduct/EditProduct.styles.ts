import { StyleSheet, Platform } from 'react-native';
import theme from '../../theme/theme';
import { DimecionsScreenPlataforms } from '../../utils/DimencionsScreenPlataform';

const EditProductStyle =  StyleSheet.create({
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
  iconCard: {
    marginLeft: Platform.OS === 'web' ? 200 : 0,
    color: theme.light.tertiary
  },
  title: {
    fontSize: theme.size.fontMedium
  }, 
  scroll:{
    marginLeft: '20%',
    width: `${theme.withScreen.big}%`,
  },
})

export default EditProductStyle;
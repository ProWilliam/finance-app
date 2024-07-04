import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';

const StyleListFinance = StyleSheet.create({

  containerCard : {
    width: `${theme.withScreen.medium}%`,
  },
  titleCard: {
    marginVertical: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  iconCard: {
    color: theme.light.tertiary
  },
  bodyCard: {
    padding: 10,

  },
  textTitle: {
    fontSize: theme.size.fontMedium,
    fontWeight: 'bold'
  },
  sectionLogo:{
    marginVertical:30,
  },
  imageCard: {
    width: 200,
    height: 113,
    borderRadius: 4,
    marginLeft: 80
  }
});

export default StyleListFinance;
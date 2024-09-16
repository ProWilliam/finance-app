import {Dimensions} from 'react-native';
import theme from '../theme/theme';

export const DimecionsScreenPlataforms = (): string => {

  const { width, height } = Dimensions.get("window");

  return width > height ? `${theme.Plataform.webWith}` : `${theme.withScreen.big}`
}
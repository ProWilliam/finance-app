import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigatorRouteProps = {
  Home: undefined,
  Info: undefined,
  AddProduct: undefined,
  params?: { id: string } | undefined,
}

export type NavigationProps = NativeStackNavigationProp<NavigatorRouteProps>

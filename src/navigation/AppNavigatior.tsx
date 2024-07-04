import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Components
import Header from '../components/Header/Header';
import FinanceProductsScreen from '../screens/Products/FinanceProductsScreen';
import InfoProductScreen from '../screens/InfoProduct/InfoProductScreen';
import RegisterFormScreen from '../screens/RegisterForm/RegisterFormScreen'; 

// Styles
import styleMain from './AppNavigatior.styles';

const Stack = createNativeStackNavigator();

const AppNavigatior: React.FC = () => {

  return (
    <View style={styleMain.container}>
      <Header />
      <Stack.Navigator initialRouteName="Home"> 
        <Stack.Screen name="Home" component={FinanceProductsScreen} options={{headerShown: false}} />
        <Stack.Screen name="Info" initialParams={{id: ''}} component={InfoProductScreen} options={{headerShown: false}} /> 
        <Stack.Screen name="AddProduct" component={RegisterFormScreen} options={{headerShown: false}} /> 
      </Stack.Navigator>
    </View>
  )
}

export default AppNavigatior;
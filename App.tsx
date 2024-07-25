import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainScreen from './src/navigation/AppNavigatior';
import { ProductProvider } from './src/context/ProductContext';

export default function App() {
  return (
    <ProductProvider>
      <NavigationContainer>
        <MainScreen />
      </NavigationContainer>
    </ProductProvider>
  );
}



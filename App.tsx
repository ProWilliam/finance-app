import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainScreen from './src/navigation/AppNavigatior';

export default function App() {
  return (
    <NavigationContainer>
      <MainScreen />
    </NavigationContainer>
  );
}



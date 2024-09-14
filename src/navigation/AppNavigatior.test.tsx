import React from 'react';
import renderer, { act, ReactTestRenderer } from 'react-test-renderer';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppNavigatior from './AppNavigatior'; 
import Header from '../components/Header/Header';

// Mocks for components
jest.mock('../components/Header/Header', () => 'Header');
jest.mock('../screens/Products/FinanceProductsScreen', () => 'FinanceProductsScreen');
jest.mock('../screens/InfoProduct/InfoProductScreen', () => 'InfoProductScreen');
jest.mock('../screens/RegisterForm/RegisterFormScreen', () => 'RegisterFormScreen');
jest.mock('../screens/EditProduct/EditProductScreen', () => 'EditProductScreen');

// Mock React Navigation modules if necessary
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: jest.fn().mockReturnValue({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
  };
});

describe('<AppNavigatior />', () => {
  let tree: ReactTestRenderer;


  afterEach(() => {
    jest.clearAllMocks
  })

  it('should render correctly', async () => {
    
    await act(() => {
      tree = renderer.create(
        <NavigationContainer>
          <AppNavigatior />
        </NavigationContainer>
      );
    })
    
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render Header component', async () => {
    
    const root = tree.root;
    
    // Verify that the Header component is rendered
    expect(root.findByType(Header)).toBeDefined();
  });

  it('should contain Stack.Navigator', () => {
    
    const root = tree.root;
    
    // Verifica que el Stack.Navigator esté renderizado
    const navigator = root.findByType(View).findByType(createNativeStackNavigator().Navigator);
    expect(navigator).toBeDefined();
  });

  it('should have initial route name as Home', () => {
    
    const root = tree.root;
    
    // Verifica que el Stack.Navigator tenga el nombre de ruta inicial correcto
    const navigator = root.findByType(createNativeStackNavigator().Navigator);
    expect(navigator.props.initialRouteName).toBe('Home');
  });

});

import React, { useEffect } from 'react';
import { useNavigation, StackActions  } from '@react-navigation/native';

// Types
import { NavigationProps } from '../types/hook/useAppNavigator.types';


const useAppNavigation = () => {
  const navigation = useNavigation<NavigationProps>();

  const appNavigation = (route: string, params?: {id: string}) => {

    const resetToHome = StackActions.replace('Home', params);
    const resetToInfo = StackActions.replace('Info', params);
    const resetToAddProduct = StackActions.replace('AddProduct', params);

    useEffect(() => {
      if(route.includes('home')) {
        navigation.dispatch(resetToHome);
        
      }else if(route.includes('info')) {
        navigation.dispatch(resetToInfo);
        
      }else if(route.includes('addProduct')) {
        navigation.dispatch(resetToAddProduct);

      }

      // Reset state route.
      route = '';

    }, [route, navigation, params])
  }
 
  return {
    appNavigation,
  
  };
}

export default useAppNavigation;
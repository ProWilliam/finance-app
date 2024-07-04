import React, { useState } from 'react';
import { TouchableOpacity , Text, StyleProp, ViewStyle } from 'react-native';

// Hooks
import useAppNavigation from '../../hooks/useAppNavigation';

// Styles and Types
import styles from './ButtonSubmit.styles';
import { ButtonSubmitProps } from '../../types/components/Button.types';

const ButtonSubmit : React.FC<ButtonSubmitProps>= ({ title, color, navigationRoot, press}) => {

  const [route, setRoute] = useState('');
  const { appNavigation } = useAppNavigation();
  
  appNavigation(route)

  const butonStyles: StyleProp<ViewStyle>[]  = [
    styles.button,
    color == 'send' && styles.colorPrimaryButton,
    color == 'edit' && styles.colorSecondaryButton,
    color == 'deleted' && styles.colorTertiary,
  ]

  const actionPress = () => {
    if(press){
      press();
    }else if(navigationRoot){
      setRoute(navigationRoot)
    }
  };
 
  return (
    <TouchableOpacity 
      onPress={() => actionPress()}
      style={butonStyles}
    >
      <Text style={styles.text}>
        { title }
      </Text>
    </TouchableOpacity>
  )
}

export default ButtonSubmit;
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

// Components, styles and hook
import useAppNavigation from '../../hooks/useAppNavigation';
import IconClose from '../../assets/icons/IconClose';
import style from './GoBackButton.styles';

const GoBackButton: React.FC = () => {

  const [route, setRoute] = useState('');
  const { appNavigation } = useAppNavigation();

  appNavigation(route);

  const goBack = () => {
    setRoute('home');
  }

  return (
    <TouchableOpacity
      onPress={goBack}
    >
      <IconClose style={style.iconCard}/>
    </TouchableOpacity>
  )
}

export default GoBackButton;
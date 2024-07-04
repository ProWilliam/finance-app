import React from 'react';
import { View } from 'react-native';

// Components
import CardInfo from '../../components/CardInfo/CardInfo';
import ButtonSubmit from '../../components/Button/ButtonSubmit';

// Styles and config
import styleInfoProduct from './InfoProductScreen.styles';
import data from '../../data/allDataGet';


const InfoProductScreen: React.FC = () => {

  const props = data;
  
  return (
    <View style={styleInfoProduct.container} >
      <CardInfo {...props} />
      <View style={styleInfoProduct.buttonSection}>
        <ButtonSubmit title='Editar' color='edit'/>
        <ButtonSubmit title='Eliminar' color='deleted'/>
      </View>
    </View>
  )
}

export default InfoProductScreen;
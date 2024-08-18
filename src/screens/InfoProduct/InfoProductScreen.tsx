import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

// Components
import useApi from '../../hooks/useApi';
import CardInfo from '../../components/CardInfo/CardInfo';
import ButtonSubmit from '../../components/Button/ButtonSubmit';

// Styles and config
import styleInfoProduct from './InfoProductScreen.styles';
// import data from '../../data/allDataGet';
import config from '../../../app.config';


const InfoProductScreen: React.FC = () => {

  const routePath = useRoute();
  const {id} = routePath.params as {id: string}

  const { data, loading } = useApi(config.extra.productUrl + id);

  const newData = {
    ...data,
    logo: config.extra.logo,
    info_text: config.extra.rootInfo
  }
  
  const props = newData;
  
  return (
    <View>
      {
        loading
        ? 
        <View>
          <Text>
            loading...
          </Text>
        </View>
        : 
        <View style={styleInfoProduct.container} >
          <CardInfo {...props} />
          <View style={styleInfoProduct.buttonSection}>
            <ButtonSubmit title='Editar' color='edit'/>
            <ButtonSubmit title='Eliminar' color='deleted'/>
          </View>
        </View>
      }
    </View>
  )
}

export default InfoProductScreen;
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

// hook and Components
import useApi from '../../hooks/useApi';
import apiClient from '../../api/apiClient';
import CardInfo from '../../components/CardInfo/CardInfo';
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import DeleteProduct from '../../components/DeleteProduct/DeleteProduct';

// Styles and config
import config from '../../../app.config';
import styleInfoProduct from './InfoProductScreen.styles';
// import data from '../../data/allDataGet';


const InfoProductScreen: React.FC = () => {

  const [showDeleted, setShowDeleted] = useState<boolean>(false);

  const routePath = useRoute();
  const {id} = routePath.params as {id: string}

  const { data, loading } = useApi(config.extra.productUrl + id);

  const newData = {
    ...data,
    logo: config.extra.logo,
    info_text: config.extra.infoText
  }
  
  const props = newData;

  const habdleConfirm = async () => {
    await apiClient(config.extra.productUrl + id, { method: "DELETE" });
    setShowDeleted(false)
  }

  const handleCancel = () => {
    setShowDeleted(false);
  }

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
            <ButtonSubmit title='Editar' color='edit' navigationRoot={config.extra.rootEditProduct} id={id}/>
            <ButtonSubmit title='Eliminar' color='deleted' press={() => setShowDeleted(true)}/>
          </View>
          <DeleteProduct visible={showDeleted} onCancel={handleCancel} onConfirm={habdleConfirm} info={data.name} id={data.id}/>
        </View> 
      }
    </View>
  )
}

export default InfoProductScreen;
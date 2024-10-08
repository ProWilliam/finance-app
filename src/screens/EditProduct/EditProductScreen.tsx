import React, { useEffect, useState } from 'react';
import {View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

// Hook and components
import useForm from '../../hooks/useForm';
import useAppNavigation from '../../hooks/useAppNavigation';
import useApi from '../../hooks/useApi';
import AddProduct from '../../components/AddProduct/AddProduct';
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import IconClose from '../../assets/icons/IconClose';

// Styles and config
import style from './EditProduct.styles';
import config from '../../../app.config';
import { FormState } from '../../types/hook/useForm.type'
import apiClient from '../../api/apiClient';

const EditProductScreen: React.FC = () => {  

  const [route, setRoute] = useState('');
  const { appNavigation } = useAppNavigation();

  appNavigation(route)
  
  const goBack = () => {
    setRoute('home');
  }

  const routePath = useRoute();
  const {id} = routePath.params as {id: string}

  const { data, loading } = useApi(config.extra.productUrl + id);
  const { formData, handleInputChange, setForm } = useForm();

  const submit = async () => {
    await apiClient(config.extra.productUrl + id , {method: "PUT", body: formData})
  }

  useEffect(() => {
    if(data){
      setForm(data as FormState)
    }
  }, [data]);

  return(
    <View style={style.body}>
      <View style={style.containerRegister}>
        <View style={style.sectionTitle}>
          <Text style={style.title}>
            Actualizar Producto 
          </Text>
          <TouchableOpacity
            onPress={goBack}
          >
            <IconClose style={style.iconCard}/>
          </TouchableOpacity>
        </View>
        {
          loading
          ?
          <Text>
            Loading...
          </Text>
          :
          <ScrollView style={style.scroll}>
            <AddProduct title='ID' placeHolder='Numero de ID' keySelect={'id'} onChange={handleInputChange} type='numeric' value={formData.id} />
            <AddProduct title='Nombre' placeHolder='Tarjeta Crédito' keySelect={'name'} onChange={handleInputChange} type='default' value={formData.name}/>
            <AddProduct title='Descripción' placeHolder='Descripción' keySelect={'description'} onChange={handleInputChange} type='default' value={formData.description}/>
            <AddProduct title='Logo' placeHolder='Logo'  keySelect={'logo'} onChange={handleInputChange} type='default' value={formData.logo}/>
            <AddProduct title='Fecha Liberación' placeHolder='22/02/2023'  keySelect={'date_release'} onChange={handleInputChange} type='date' value={formData.date_release}/>
            <AddProduct title='Fecha Revisión' placeHolder='22/02/2024'  keySelect={'date_revision'} onChange={handleInputChange} type='date' value={formData.date_revision}/>
            <ButtonSubmit title='Actualizar' color='send' press={submit} navigationRoot={config.extra.rootInfo} id={id}/>
            <ButtonSubmit title='Cancelar' color='edit' navigationRoot={config.extra.rootInfo} id={id}/>
          </ScrollView>
        }
      </View>
    </View>
  );
}


export default EditProductScreen;
import React, { useState } from 'react';
import {View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Hook and components
import useForm from '../../hooks/useForm';
import useAppNavigation from '../../hooks/useAppNavigation';
import AddProduct from '../../components/AddProduct/AddProduct';
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import IconClose from '../../assets/icons/IconClose';

// Styles
import style from './RegisterForm.styles';


const RegisterFormScreen: React.FC = () => {

  const [route, setRoute] = useState('');
  const { appNavigation } = useAppNavigation();

  appNavigation(route)

  const { formData, handleInputChange, handleSubmit, error, resetForm } = useForm();
  const navigation = useNavigation();

  const goBack = () => {
    setRoute('home');
  }

  const submit = async () => {

    try {
      await handleSubmit();
      Alert.alert(error ? error : 'Se registro correctamente');
      navigation.navigate('Home' as never);

    } catch (err) {
      Alert.alert('Intentalo mas tarde, No se pudo crear registro');
      
    }
  }

  return(
    <View style={style.body}>
      <View style={style.containerRegister}>
        <View style={style.sectionTitle}>
          <Text style={style.title}>
            Registro de Productos
          </Text>
          <TouchableOpacity
            onPress={goBack}
          >
            <IconClose style={style.iconCard}/>
          </TouchableOpacity>
        </View>
        <ScrollView style={style.scroll}>
          <AddProduct title='ID' placeHolder='Numero de ID' keySelect={'id'} onChange={handleInputChange} type='numeric' value={formData.id} />
          <AddProduct title='Nombre' placeHolder='Tarjeta Crédito' keySelect={'name'} onChange={handleInputChange} type='default' value={formData.name}/>
          <AddProduct title='Descripción' placeHolder='Descripción' keySelect={'description'} onChange={handleInputChange} type='default' value={formData.description}/>
          <AddProduct title='Logo' placeHolder='Logo'  keySelect={'logo'} onChange={handleInputChange} type='default' value={formData.logo}/>
          <AddProduct title='Fecha Liberación' placeHolder='22/02/2023'  keySelect={'date_release'} onChange={handleInputChange} type='date' value={formData.date_release}/>
          <AddProduct title='Fecha Revisión' placeHolder='22/02/2024'  keySelect={'date_revision'} onChange={handleInputChange} type='date' value={formData.date_revision}/>
          <ButtonSubmit title='Enviar' color='send' press={submit} />
          <ButtonSubmit title='Reiniciar' color='edit' press={resetForm} />
        </ScrollView>
      </View>
    </View>
  );
}


export default RegisterFormScreen;
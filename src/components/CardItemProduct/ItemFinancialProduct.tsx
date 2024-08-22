import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

// Hook and Component
import useAppNavigation from '../../hooks/useAppNavigation';
import IconAngleRight from '../../assets/icons/IconAngleRight';

// Styles and config
import style from './ItemFinancialProduct.styles';
import config from '../../../app.config';
import ItemFinancialProductProps from '../../types/components/ItemFinancialProduct.types';

const ItemFinancialProduct: React.FC<ItemFinancialProductProps> = ({ id, name }) => {

  const [route, setRoute] = useState('');
  const { appNavigation } = useAppNavigation();

  appNavigation(route, {id});

  return (
    <TouchableOpacity 
      style={style.containerItem}
      onPress={() => {setRoute(config.extra.rootInfo)}}   
    >
      <View>
        <Text style={style.text}>{name}</Text>
        <Text style={style.textId}>ID:{id}</Text>
      </View>
      <IconAngleRight style={style.icon} />
    </TouchableOpacity>
  );
}

export default ItemFinancialProduct;
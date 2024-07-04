import React from 'react';
import { View, Text } from 'react-native';

// Components
import InputForm from '../InputForm/InputForm';

// Styles and Types
import styles from './AddProduct.styles';
import { AddProductProps } from '../../types/components/AddProduct.types';


const AddProduct: React.FC<AddProductProps> = ({title, ...props}) => {
  return(
    <View style={styles.containerAdd}>
      <Text style={styles.text}>
        {title}
      </Text>
      <InputForm {...props} />
    </View>
  )
}

export default AddProduct;
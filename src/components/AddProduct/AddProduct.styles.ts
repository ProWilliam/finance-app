import React  from 'react';
import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';

const StyleAddProduct = StyleSheet.create({
  containerAdd: {
    width: `${theme.withScreen.medium}%`
  },
  text:{
    marginVertical: 10,
    fontSize: theme.size.fontSmaller,
  }
})

export default StyleAddProduct;
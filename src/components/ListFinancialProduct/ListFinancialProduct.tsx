import React from 'react';
import { FlatList, View } from 'react-native';

// Components
import ItemFinancialProduct from '../CardItemProduct/ItemFinancialProduct';

// Styles and Types
import style from './ListFinancialProduct.styles';
import { FinanceProductsProps } from '../../types/components/ListFinancialProduct.types';


const ListFinancialProduct: React.FC<FinanceProductsProps> = ({ data }) => {
  return(
    <FlatList 
      style={style.containerList}
      data={data}
      ItemSeparatorComponent={() => <View style={style.separator}/>}
      renderItem={({ item: product}) => 
        <ItemFinancialProduct id={product.id} name={product.name}/>
      }
    />
  )
}


export default ListFinancialProduct;
import React from 'react';
import { FlatList, View} from 'react-native';

// Context
import { useMyContextProduct } from '../../context/ProductContext';

// Components
import ItemFinancialProduct from '../CardItemProduct/ItemFinancialProduct';

// Styles and Types
import style from './ListFinancialProduct.styles';

const ListFinancialProduct: React.FC = () => {

  const { products } = useMyContextProduct();

  return(
    products &&
    <FlatList 
        style={style.containerList}
        data={products}
        ItemSeparatorComponent={() => <View style={style.separator}/>}
        keyExtractor={(product) => product.id.toString()}
        renderItem={({ item: product}) => 
          <ItemFinancialProduct id={product.id} name={product.name}/>
        }
      />
  )
}


export default ListFinancialProduct;
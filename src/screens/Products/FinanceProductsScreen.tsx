import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

// Hook and Context
import useApi from '../../hooks/useApi';
import { useMyContextProduct } from '../../context/ProductContext';

// Components
import SearchInput from '../../components/SearchInput/SearchInput';
import ListFinancialProduct from '../../components/ListFinancialProduct/ListFinancialProduct';
import ButtonSubmit from '../../components/Button/ButtonSubmit';

// Styles and config
import stylesHome from './FinanceProductsScreen.styles';
import config from '../../../app.config';


const FinanceProducts: React.FC = () => {

  const { data, loading } = useApi(config.extra.productUrl);
  const { setProducts } = useMyContextProduct();

  useEffect(() => {
    if (data && data.data.length > 0 ){
      setProducts(data.data);
    }
  }, [data, setProducts]);

  return (
    <View style={stylesHome.container}>
      <SearchInput placeholder='Search...' />
      {
        loading
        ? <Text>Loading...</Text>
        : <ListFinancialProduct />
      }
      <ButtonSubmit title='Agregar' color='send' navigationRoot={config.extra.rootAddProduct}/>
    </View>
  )
}

export default FinanceProducts;
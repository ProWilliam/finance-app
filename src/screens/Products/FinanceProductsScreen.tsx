import React from 'react';
import { View, Text } from 'react-native';

// Hook
import useApi from '../../hooks/useApi';

// Components
import SearchInput from '../../components/SearchInput/SearchInput';
import ListFinancialProduct from '../../components/ListFinancialProduct/ListFinancialProduct';
import ButtonSubmit from '../../components/Button/ButtonSubmit';

// Styles and config
import stylesHome from './FinanceProductsScreen.styles';
import config from '../../../app.config';


const FinanceProducts: React.FC = () => {

  const { data, loading } = useApi(config.extra.productUrl);

  return (
    <View style={stylesHome.container}>
      <SearchInput placeholder='Search...' />
      {
        loading
        ? <Text>Loading...</Text>
        : <ListFinancialProduct {...data} />
      }
      <ButtonSubmit title='Agregar' color='send' navigationRoot={config.extra.rootAddProduct}/>
    </View>
  )
}

export default FinanceProducts;
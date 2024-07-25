import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

// Hook
import useApi from '../../hooks/useApi';

// Component
import SearchInputProps from '../../types/components/SearchInput.types';

// Styles and Config
import style from './SearchInput.styles';
import config from '../../../app.config';
import { useMyContextProduct } from '../../context/ProductContext';

const SearchInput: React.FC<SearchInputProps> = ({ placeholder}) => {

  const [searchText, setSearchText] = useState<string>('');
  const { setProducts } = useMyContextProduct();
  
  const url = `${config.extra.productUrl + searchText}`
  const { data, refetch } = useApi(url);

  const handleSearch = async () => {

    await refetch();

    if (searchText === ''){
      setProducts(data.data)
    } else {
      setProducts([{
        id: data.id,
        name: data.name
      }])
    }
  }

  return (
    <View style={style.containerSearch}>
      <TextInput
        keyboardType='number-pad' 
        style={style.input}
        placeholder={placeholder}
        placeholderTextColor='black'
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        onSubmitEditing={handleSearch}
        returnKeyType='done'
      />
    </View>
  )
}

export default SearchInput
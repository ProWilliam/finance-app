import React, { useState } from 'react';
import { Alert, TextInput, View } from 'react-native';

// Component
import SearchInputProps from '../../types/components/SearchInput.types';

// Styles
import style from './SearchInput.styles';

const SearchInput: React.FC<SearchInputProps> = ({ placeholder}) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearch = () => {
    Alert.alert('Buscando...');
  }

  return (
    <View style={style.containerSearch}>
      <TextInput 
        style={style.input}
        placeholder={placeholder}
        placeholderTextColor='black'
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
      />
    </View>
  )
}

export default SearchInput
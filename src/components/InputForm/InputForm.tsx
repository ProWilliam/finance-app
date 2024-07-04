import React, { useState } from 'react';
import { TextInput, View, Text, KeyboardTypeOptions } from 'react-native';

// Components
import InputDate from '../InputDate/InputDate';

// Styles and Types
import styles from './InputForm.styles';
import InputFormProps from '../../types/components/InputForm.types';


const InputForm: React.FC<InputFormProps> = ({placeHolder, keySelect, errorMessage, onChange, type, value }) => {

  const [error, setError] = useState<string | null>(errorMessage || null);
  const [text, setText] = useState<string>('');

  const validatorText = () => {
    if(text.trim() === ''){
      setError('Este campo es obligatorio!');
    } else {
      setError(null);
    }
  }

  const handleChangeText = (value: string) => {

    setText(value);
    onChange(keySelect, value);

    if (value.trim() !== '') {
      setError(null);
    }else {
      setError('Este campo es obligatorio!');
    }
  }

  // Change of styles for action
  const inputStyles = [
    styles.input,
    error !== null
    ? styles.borderError 
    : styles.border,
  ]

  return (
    <View style={styles.containerInput}>
      {
        type ==='date'
        ? <InputDate 
            title={placeHolder}
            keyValue={keySelect}
            onChangeForm={onChange}
            value={value}
          />
        :
        <TextInput 
          style={inputStyles} 
          placeholder={placeHolder}
          placeholderTextColor={styles.colorPlaceHolder.color}
          onBlur={validatorText}
          onChangeText={(text) => handleChangeText(text)}
          value={value}
          blurOnSubmit 
          keyboardType={type as KeyboardTypeOptions}
          testID='error-message'
        /> 

      }      

      { error && <Text testID='error-message' style={styles.textError}>{error}</Text> }
    </View>
  )
}

export default InputForm;
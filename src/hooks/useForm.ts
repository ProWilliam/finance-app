import config from '../../app.config';
import { useState } from 'react';

// Hook
import { FormState } from '../types/hook/useForm.type';

const useForm = () => {

  const initialState: FormState = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: '',
  };
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormState>(initialState);

  const handleInputChange = (field: keyof FormState, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    
    const isEmptyField = globalThis.Object.values(formData).some(value => !value.trim());
    
    if( isEmptyField === false ) {
      
      fetch(`${config.extra.apiUrl}${config.extra.productUrl}`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
        })
        .then(response => { 
          setError(null)
          return response.json()

        })
        .catch(() => setError('Intentalo más tarde'));
        
    } else {
      setError('Todos los campos son necesarios')

    }
  };

  const resetForm = () => {
    setFormData(initialState);
    
  };

  const setForm = (setData: FormState ) => {
    setFormData(setData)
  }

  return {
    formData,
    handleInputChange,
    handleSubmit,
    resetForm,
    error,
    setForm
  };
};

export default useForm;
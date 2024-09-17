import React from 'react';
import { Alert } from 'react-native';
import renderer, { act, ReactTestRenderer } from 'react-test-renderer';
import RegisterFormScreen from './RegisterFormScreen';
import useForm from '../../hooks/useForm';
import { useNavigation } from '@react-navigation/native';

import AddProduct from '../../components/AddProduct/AddProduct';

// Mock de dependencias
jest.mock('../../hooks/useForm');
jest.mock('../../hooks/useAppNavigation', () => ({
  __esModule: true,
  default: () => ({
    appNavigation: jest.fn(),
  }),
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));
jest.mock('../../components/AddProduct/AddProduct', () => 'AddProduct');
jest.mock('../../components/Button/ButtonSubmit', () => 'ButtonSubmit');

describe('<RegisterFormScreen />', () => {

  let tree: ReactTestRenderer;
  const mockHandleSubmit = jest.fn();
  const mockResetForm = jest.fn();
  const mockNavigation = { navigate: jest.fn() };

  beforeEach(() => {
    (useForm as jest.Mock).mockReturnValue({
      formData: { id: '', name: '', description: '', logo: '', date_release: '', date_revision: '' },
      handleInputChange: jest.fn(),
      handleSubmit: mockHandleSubmit,
      error: null,
      resetForm: mockResetForm,
    });

    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);

    jest.clearAllMocks();
  });

  it('should submit the form correctly', () => {
    
    act(() => {
      tree = renderer.create(<RegisterFormScreen />);
    });

    const addProductFields = tree.root.findAllByType(AddProduct);
    expect(addProductFields).toHaveLength(6); 

    const submitButton = tree.root.findByProps({ title: 'Enviar' });
    expect(submitButton).toBeTruthy();

    const resetButton = tree.root.findByProps({ title: 'Reiniciar' });
    expect(resetButton).toBeTruthy();
  });

  it('should update form values when handleInputChange is called', () => {
    const mockHandleInputChange = jest.fn();
    (useForm as jest.Mock).mockReturnValue({
      formData: { id: '', name: '', description: '', logo: '', date_release: '', date_revision: '' },
      handleInputChange: mockHandleInputChange,
      handleSubmit: mockHandleSubmit,
      error: null,
      resetForm: mockResetForm,
    });

    act(() => {
      tree = renderer.create(<RegisterFormScreen />);
    });

    const nameField = tree.root.findByProps({ title: 'Nombre' });
    act(() => {
      nameField.props.onChange('Nuevo Producto');
    });

    expect(mockHandleInputChange).toHaveBeenCalledWith('Nuevo Producto');
  });

  it('should handle form submission correctly', async () => {
    const mockAlert = jest.spyOn(Alert, 'alert');
    mockHandleSubmit.mockResolvedValueOnce(undefined);

    await act(async () => {
      tree = renderer.create(<RegisterFormScreen />);
    });

    const submitButton = tree.root.findByProps({ title: 'Enviar' });
    await act(async () => {
      submitButton.props.press();
    });

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);

    expect(mockAlert).toHaveBeenCalledWith('Se registro correctamente');

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Home');
  });

  it('should handle errors when submitting the form', async () => {
    const mockAlert = jest.spyOn(Alert, 'alert');
    (useForm as jest.Mock).mockReturnValueOnce({
      formData: { id: '', name: '', description: '', logo: '', date_release: '', date_revision: '' },
      handleInputChange: jest.fn(),
      handleSubmit: jest.fn().mockRejectedValueOnce('Error'),
      error: 'Intentalo mas tarde, No se pudo crear registro',
      resetForm: mockResetForm,
    });

    await act(async () => {
      tree = renderer.create(<RegisterFormScreen />);
    });

    const submitButton = tree.root.findByProps({ title: 'Enviar' });
    await act(async () => {
      submitButton.props.press();
    });

    expect(mockAlert).toHaveBeenCalledWith('Intentalo mas tarde, No se pudo crear registro');
  });

  it('should restart the form correctly', async () => {

    await act(async () => {
      tree = renderer.create(<RegisterFormScreen />);
    });

    const resetButton = tree.root.findByProps({ title: 'Reiniciar' });
    await act(async () => {
      resetButton.props.press();
    });

    expect(mockResetForm).toHaveBeenCalledTimes(1);
  });
});

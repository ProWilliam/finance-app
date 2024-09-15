import React from 'react';
import renderer, { act, ReactTestRenderer } from 'react-test-renderer';
import { Text } from 'react-native';
import { useNavigation, useRoute, StackActions } from '@react-navigation/native';

import EditProductScreen from './EditProductScreen';
import useApi from '../../hooks/useApi';
import apiClient from '../../api/apiClient';

// Mock the `useApi` hook
jest.mock('../../hooks/useApi');

jest.mock('../../api/apiClient');

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
  useNavigation: jest.fn(),
  StackActions: {
    replace: jest.fn()
  }
}));

describe('<EditProductScreen />', () => {

  let tree: ReactTestRenderer;

  afterEach(() => {
    jest.clearAllMocks;
  });

  it('should render the component correctly', async () => {
    
    (useApi as jest.Mock).mockReturnValue({ data: {}, loading: false });
    
    (useRoute as jest.Mock).mockReturnValue({
      params: { id: '1' }, 
    });

    (useNavigation as jest.Mock).mockReturnValue({
      navigate: jest.fn(), 
    });

    (StackActions.replace as jest.Mock).mockReturnValue({
      type: 'replace',
      routeName: 'Home',
    });

    await act(async () => {
      tree = renderer.create(<EditProductScreen />);
    });

    expect(tree).toMatchSnapshot();
  });

  it('should show "Loading..." while data is loading', async () => {
    // Simula que los datos aún no se han cargado
    (useApi as jest.Mock).mockReturnValue({ data: null, loading: true });
  
    await act(async () => {
      tree = renderer.create(<EditProductScreen />);
    });
  
    const textItems = tree.root.findAllByType(Text);
    const loadingText = textItems[1].props.children;

    expect(loadingText).toBe('Loading...');
  });

  it('should call dispatch function correctly', async () => {

    (useApi as jest.Mock).mockReturnValue({ data: { id: '1', name: 'Producto' }, loading: false });
  
    await act(async () => {
      tree = renderer.create(<EditProductScreen />);
    });
  
    const buttonSubmit = tree.root.findByProps({ title: 'Actualizar' });
    await act(async () => {
      buttonSubmit.props.press();
    });
  
    expect(apiClient).toHaveBeenCalledWith('bp/products/1', { method: 'PUT', body: { id: '1', name: 'Producto'} });
  });

  it('should update form status when data is received', async () => {

    (useApi as jest.Mock).mockReturnValue({ data: { id: '1', name: 'Producto' }, loading: false });
  
    await act(async () => {
      tree = renderer.create(<EditProductScreen />);
    });
  
    const addProductInput = tree.root.findByProps({ keySelect: 'name' });
    expect(addProductInput.props.value).toBe('Producto');
  });
});

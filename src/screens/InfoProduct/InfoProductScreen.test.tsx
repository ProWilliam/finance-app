import React from 'react';
import renderer, { act, ReactTestRenderer } from 'react-test-renderer';
import { Text } from 'react-native';

import InfoProductScreen from './InfoProductScreen';
import useApi from '../../hooks/useApi';
import { useNavigation, useRoute, StackActions } from '@react-navigation/native';
import apiClient from '../../api/apiClient';

import CardInfo from '../../components/CardInfo/CardInfo';
import DeleteProduct from '../../components/DeleteProduct/DeleteProduct';

// Mock dependencies
jest.mock('../../hooks/useApi');
jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
  useNavigation: jest.fn(),
  StackActions: {
    replace: jest.fn()
  }
}));
jest.mock('../../api/apiClient');

describe('<InfoProductScreen />', () => {
  
  let tree: ReactTestRenderer;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show charging status correctly', async () => {
    
    (useApi as jest.Mock).mockReturnValue({ data: {}, loading: true });
    (useRoute as jest.Mock).mockReturnValue({ params: { id: '2' } });

    await act(async () => {
      tree = renderer.create(<InfoProductScreen />);
    });

    const loadingText = tree.root.findByType(Text).props.children;
    expect(loadingText).toBe('loading...');
  });

  it('should render correctly when data has been loaded', async () => {
    const mockData = {
      id: '1',
      name: 'Producto Test',
      description: 'Descripción del producto',
    };
    (useApi as jest.Mock).mockReturnValue({ data: mockData, loading: false });
    (useRoute as jest.Mock).mockReturnValue({ params: { id: '1' } });

    await act(async () => {
      tree = renderer.create(<InfoProductScreen />);
    });

    const cardInfo = tree.root.findByType(CardInfo);
    expect(cardInfo.props.name).toBe(mockData.name);
    expect(cardInfo.props.description).toBe(mockData.description);
  });

  it('should show confirmation alert when pressing "Delete"', async () => {
    const mockData = {
      id: '3',
      name: 'Producto Test',
      description: 'Descripción del producto',
    };
    (useApi as jest.Mock).mockReturnValue({ data: mockData, loading: false });
    (useRoute as jest.Mock).mockReturnValue({ params: { id: '3' } });

    await act(async () => {
      tree = renderer.create(<InfoProductScreen />);
    });

    const deleteButton = tree.root.findByProps({ title: 'Eliminar' });
    await act(async () => {
      deleteButton.props.press();
    });

    const deleteProduct = tree.root.findByType(DeleteProduct);
    expect(deleteProduct.props.visible).toBe(true);
  });

  it('should call API and delete product on commit', async () => {
    const mockData = {
      id: '1',
      name: 'Producto Test',
      description: 'Descripción del producto',
    };
    (useApi as jest.Mock).mockReturnValue({ data: mockData, loading: false });
    (useRoute as jest.Mock).mockReturnValue({ params: { id: '1' } });

    await act(async () => {
      tree = renderer.create(<InfoProductScreen />);
    });

    const deleteButton = tree.root.findByProps({ title: 'Eliminar' });
    await act(async () => {
      deleteButton.props.press();
    });

    const deleteProduct = tree.root.findByType(DeleteProduct);
    await act(async () => {
      deleteProduct.props.onConfirm();
    });

    expect(apiClient).toHaveBeenCalledWith(expect.stringContaining('1'), expect.objectContaining({ method: 'DELETE' }));
  });

  it('should hide the alert when canceling the deletion', async () => {
    const mockData = {
      id: '3',
      name: 'Producto Test',
      description: 'Descripción del producto',
    };
    (useApi as jest.Mock).mockReturnValue({ data: mockData, loading: false });
    (useRoute as jest.Mock).mockReturnValue({ params: { id: '3' } });

    await act(async () => {
      tree = renderer.create(<InfoProductScreen />);
    });

    const deleteButton = tree.root.findByProps({ title: 'Eliminar' });
    await act(async () => {
      deleteButton.props.press();
    });

    const deleteProduct = tree.root.findByType(DeleteProduct);
    await act(async () => {
      deleteProduct.props.onCancel();
    });

    expect(deleteProduct.props.visible).toBe(false);
  });
});

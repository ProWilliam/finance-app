import React from 'react';
import renderer, { act, ReactTestRenderer } from 'react-test-renderer';
import { Text } from 'react-native';

import FinanceProductsScreen from './FinanceProductsScreen';
import useApi from '../../hooks/useApi';
import { useMyContextProduct } from '../../context/ProductContext';

import ListFinancialProduct from '../../components/ListFinancialProduct/ListFinancialProduct';
import SearchInput from '../../components/SearchInput/SearchInput';
import config from '../../../app.config';

// Mock dependencies
jest.mock('../../hooks/useApi');
jest.mock('../../context/ProductContext');
jest.mock('../../components/ListFinancialProduct/ListFinancialProduct', () => 'ListFinancialProduct');
jest.mock('../../components/SearchInput/SearchInput', () => 'SearchInput');
jest.mock('../../components/Button/ButtonSubmit', () => 'ButtonSubmit');

describe('<FinanceProducts />', () => {
  
  let tree: ReactTestRenderer;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show charging status correctly', async () => {
  
    (useApi as jest.Mock).mockReturnValue({ data: { data:[] }, loading: true });
    const setProductsMock = jest.fn();
    (useMyContextProduct as jest.Mock).mockReturnValue({ setProducts: setProductsMock });

    await act(async () => {
      tree = renderer.create(<FinanceProductsScreen />);
    });

    const loadingText = tree.root.findByType(Text).props.children;
    expect(loadingText).toBe('Loading...');
  });

  it('should render correctly when data has been loaded', async () => {
    const mockData = {
      data: [
        { id: '1', name: 'Producto 1' },
        { id: '2', name: 'Producto 2' },
      ],
    };
    (useApi as jest.Mock).mockReturnValue({ data: mockData, loading: false });

    const setProductsMock = jest.fn();
    (useMyContextProduct as jest.Mock).mockReturnValue({ setProducts: setProductsMock });

    await act(async () => {
      tree = renderer.create(<FinanceProductsScreen />);
    });

    const listFinancialProduct = tree.root.findByType(ListFinancialProduct);
    expect(listFinancialProduct).toBeTruthy();
  });

  it('should call setProducts when data is fetched', async () => {
    const mockData = {
      data: [
        { id: '1', name: 'Producto 1' },
        { id: '2', name: 'Producto 2' },
      ],
    };

    (useApi as jest.Mock).mockReturnValue({ data: mockData, loading: false });
    const setProductsMock = jest.fn();
    (useMyContextProduct as jest.Mock).mockReturnValue({ setProducts: setProductsMock });

    await act(async () => {
      tree = renderer.create(<FinanceProductsScreen />);
    });

    expect(setProductsMock).toHaveBeenCalledWith(mockData.data);
  });

  it('should render SearchInput component correctly', async () => {
    (useApi as jest.Mock).mockReturnValue({ data: { data: []}, loading: true });
    const setProductsMock = jest.fn();
    (useMyContextProduct as jest.Mock).mockReturnValue({ setProducts: setProductsMock });

    await act(async () => {
      tree = renderer.create(<FinanceProductsScreen />);
    });

    const searchInput = tree.root.findByType(SearchInput);
    expect(searchInput).toBeTruthy();
  });

  it('should navigate when adding a product by pressing "Agregar"', async () => {
    const mockData = {
      data: [],
    };

    (useApi as jest.Mock).mockReturnValue({ data: mockData, loading: false });
    const setProductsMock = jest.fn();
    (useMyContextProduct as jest.Mock).mockReturnValue({ setProducts: setProductsMock });

    await act(async () => {
      tree = renderer.create(<FinanceProductsScreen />);
    });

    const addButton = tree.root.findByProps({ title: 'Agregar' });
    
    expect(addButton.props.navigationRoot).toBe(config.extra.rootAddProduct);
  });
});

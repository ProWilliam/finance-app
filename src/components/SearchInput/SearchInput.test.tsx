import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TextInput } from 'react-native';

import { useMyContextProduct } from '../../context/ProductContext';

import SearchInput from './SearchInput';

const MockuseApi = jest.fn();

jest.mock('../../hooks/useApi', () => ({
  __esModule: true,
  default: () => ({
    appNavigation: MockuseApi,
  }),
}));

jest.mock('../../context/ProductContext', () => ({
  useMyContextProduct: jest.fn(),
}));

describe('<SearchInput />', () => {

  const mockRefetch = jest.fn();
  const mockSetProducts = jest.fn();

  beforeEach(() => {
    MockuseApi.mockReturnValue({
      data: { data: [
        { id: '1', name: 'Product 1' }, 
        { id: '2', name: 'Product 2' },
        { id: '3', name: 'Product 3' }
      ] },
      refetch: mockRefetch,
    });

    (useMyContextProduct as jest.Mock).mockReturnValue({
      setProducts: mockSetProducts,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  })

  it('renders SearchInput component correctly', () => {
    const tree = renderer.create(<SearchInput placeholder="Search..." />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('displays the correct placeholder', () => {
    const instance = renderer.create(<SearchInput placeholder="Search..." />).root;
    const input = instance.findByType(TextInput);

    expect(input.props.placeholder).toBe('Search...');
  });

  it('updates searchText on text input change', () => {
    const instance = renderer.create(<SearchInput placeholder="Search..." />).root;
    const input = instance.findByType(TextInput);

    act(() => input.props.onChangeText('2'));

    expect(input.props.value).toBe('2');
  });
  
  it('sets returnKeyType to "done"', () => {
    const instance = renderer.create(<SearchInput placeholder="Search..." />).root;
    const input = instance.findByType(TextInput);

    expect(input.props.returnKeyType).toBe('done');
  });

});
import React from 'react';
import renderer, { act } from 'react-test-renderer';

// Context and Components
import { useMyContextProduct} from '../../context/ProductContext';
import ListFinancialProduct from './ListFinancialProduct';
import ItemFinancialProduct from '../CardItemProduct/ItemFinancialProduct';

// Types and Styles
import { Product } from '../../context/ProductContext.type';
import styles from './ListFinancialProduct.styles';

jest.mock('../../context/ProductContext', () => ({
  useMyContextProduct: jest.fn(),
}));

// Mock useAppNavigation hook
const MockuseAppNavigation = jest.fn();
jest.mock('../../hooks/useAppNavigation', () => ({
  __esModule: true,
  default: () => ({
    appNavigation: MockuseAppNavigation,
  }),
}));

describe('<ListFinancialProduct />', () => {

  let mockProducts: Product[];

  afterEach(() => {
    mockProducts = [
      { id: '1', name: 'Product 1' },
      { id: '2', name: 'Product 2' },
    ];

    jest.clearAllMocks();
  }); 

  it('renders correctly with products', () => {
    
    (useMyContextProduct as jest.Mock).mockReturnValue({ products: mockProducts });

    let tree;

    act(() => {
      tree = renderer.create(<ListFinancialProduct />).toJSON();
    });
  
    expect(tree).toMatchSnapshot();
  });

  it('does not render anything if products is null or undefined', () => {
    (useMyContextProduct as jest.Mock).mockReturnValue({ products: null });

    const tree =  renderer.create(<ListFinancialProduct />).toJSON();

    expect(tree).toBeNull();
  });

  it('renders the correct number of ItemFinancialProduct components', () => {

    (useMyContextProduct as jest.Mock).mockReturnValue({ products: mockProducts });
    MockuseAppNavigation.mockReturnValue({ appNavigation: mockProducts })  
    
    const tree =  renderer.create(
      <ListFinancialProduct />
    );
    
    const items =  tree.root.findAllByType(ItemFinancialProduct);

    expect(items).toHaveLength(mockProducts.length);
  });

  it('renders the correct separator component', () => {
    (useMyContextProduct as jest.Mock).mockReturnValue({ products: mockProducts });

    const tree =  renderer.create(<ListFinancialProduct />);
    const separators = tree.root.findAllByProps({ style: styles.separator});
    
    expect(separators).toHaveLength(mockProducts.length);
  });
});

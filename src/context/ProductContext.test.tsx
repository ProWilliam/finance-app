import React from 'react';
import renderer, { act, ReactTestRenderer } from 'react-test-renderer';
import { Text, View, TouchableOpacity } from 'react-native';

import { ProductProvider, useMyContextProduct } from './ProductContext';

// Helper component to access the context values in tests
const TestComponent: React.FC = () => {
  const { products, setProducts } = useMyContextProduct();
  const listProduct = [
    { id: '2', name: 'Product 2' },
    { id: '3', name: 'Product 3' }
  ]
  return (
    <View>
      {products.map((product) => (
        <Text key={product.id} testID="product-item">{product.name}</Text>
      ))}
      <TouchableOpacity onPress={() => setProducts(listProduct)} testID="update-button">
        Update Products
      </TouchableOpacity>
    </View>
  );
};

describe('<ProductContext />', () => {

  let component: ReactTestRenderer;  

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <ProductProvider>
        <TestComponent />
      </ProductProvider>).toJSON();

    expect(tree).toMatchSnapshot();
  });
  
  it('provides default empty products array', () => {
    
    act(() => {
      component = renderer.create(
        <ProductProvider>
          <TestComponent />
        </ProductProvider>
      );
    });

    
    const productItems = component.root.findAllByProps({ testID: 'product-item' });
    expect(productItems.length).toBe(0); // Expect the default state to have an empty products array
    
  });

  it('updates products in context when setProducts is called', () => {
    
    act(() => {
      component = renderer.create(
        <ProductProvider>
          <TestComponent />
        </ProductProvider>
      );
    });

    
    // Simulate button click to update products
    act(() => {
      component.root.findByProps({ testID: 'update-button' }).props.onPress();
    });

    const productItems = component.root.findAllByType(Text);
    
    expect(productItems.length).toBe(2);
    expect(productItems[0].props.children).toContain('Product 2');
    expect(productItems[1].props.children).toContain('Product 3');
    
  });

  it('initializes with the default state', () => {
    
    act(() => {
      component = renderer.create(
        <ProductProvider>
          <TestComponent />
        </ProductProvider>
      );
    });

    
    const productItems = component.root.findAllByProps(Text);
    expect(productItems.length).toBe(0);
    
  });

  it('does not affect context state when ProductProvider is re-rendered', () => {
    
    act(() => {
      component = renderer.create(
        <ProductProvider>
          <TestComponent />
        </ProductProvider>
      );
    });

    
    act(() => {
      component.update(
        <ProductProvider>
          <TestComponent />
        </ProductProvider>
      );
    });

    const productItems = component.root.findAllByType(Text);
    expect(productItems.length).toBe(0); // Should still be empty after re-render
    
  });
  
});

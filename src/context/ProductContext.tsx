import React, { createContext, useState, useContext } from 'react';

// Types
import { GlobalProviderProps, ProductContextInterface, Product } from './ProductContext.type';


// Default State Context by products.
const defaultStateProduct = {
  products: [{
    id: '',
    name: ''
  }],
  setProducts: (product: Product[]) => {}

} as ProductContextInterface

const MyContextProducts = createContext<ProductContextInterface>(defaultStateProduct);

export const useMyContextProduct = () => {
  const context = useContext(MyContextProducts);

  if(!context) {
    throw new Error('useMycontext must be used within a MyContextProvider');
  }

  return context;
}

export const ProductProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [ products, setProducts ] = useState<Product[]>([]);

  return (
    <MyContextProducts.Provider value={{ products, setProducts }}>
      {children}
    </MyContextProducts.Provider>
  );
};
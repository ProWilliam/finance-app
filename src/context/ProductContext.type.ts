import { ReactNode, Dispatch, SetStateAction } from 'react';

export type Product = {
  id: string,
  name: string
}

export interface ProductContextInterface {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

export interface GlobalProviderProps {
  children: ReactNode;
}
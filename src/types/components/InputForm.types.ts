import { AddProductProps } from './AddProduct.types';              

export default interface InputFormProps {
  value: AddProductProps['value'];
  type:  AddProductProps['type'];
  placeHolder: AddProductProps['placeHolder'];
  keySelect: AddProductProps['keySelect'];
  onChange: AddProductProps['onChange'];
  errorMessage?: string ;
}
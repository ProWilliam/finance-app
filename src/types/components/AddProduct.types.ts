import {FormState} from '../../types/hook/useForm.type';

export interface AddProductProps {
  value: string;
  title: string;
  placeHolder: string;
  keySelect: keyof FormState;
  type: string,
  onChange: (field: keyof FormState, value: string) => void;
}
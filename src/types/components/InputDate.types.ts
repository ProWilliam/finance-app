import { FormState } from '../hook/useForm.type';

export default interface DateProps{
  value: string;
  title: string;
  keyValue: keyof FormState;
  onChangeForm: (field: keyof FormState, value: string) => void;
}
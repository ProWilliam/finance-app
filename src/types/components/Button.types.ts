export interface ButtonSubmitProps {
  title: string;
  color: string;
  navigationRoot?: string;
  press?: () => void;
  id?: string | undefined;
}
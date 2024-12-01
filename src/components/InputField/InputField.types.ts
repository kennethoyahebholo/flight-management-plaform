export interface IInputField {
  label?: string;
  name?: string;
  title?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  marginBottom?: string;
  error?: string | boolean;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  minValue?: number | string;
  maxValue?: number | string;
  inputClass?: string;
  hidePlaceholderAnimation?: boolean;
}

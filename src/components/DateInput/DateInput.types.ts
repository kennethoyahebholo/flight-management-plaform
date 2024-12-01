export interface IDateInput {
  // eslint-disable-next-line no-unused-vars
  onChange?: (date: Date) => void;
  label: string;
  className?: string;
  isValue?: boolean;
  error?: string | false;
  maxDate?: Date;
  disabled?: boolean;
  value?: string;
  name?: string;
  placeholder?: string;
  dateFormat?: string;
  dateInputClassName?: string;
}

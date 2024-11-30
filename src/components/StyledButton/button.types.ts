export interface IStyledButton {
  title: string;
  textDecoration?: string;
  color?: 'primary' | 'outlined';
  icon?: React.ReactNode;
  fontFamily?: string;
  padding?: string;
  width?: string;
  className?: string;
  fontSize?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  border?: string;
  borderRadius?: string;
  rightIconBtnClassName?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

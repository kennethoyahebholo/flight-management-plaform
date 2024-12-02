export interface IStyledButton {
  title: string;
  color?: 'primary' | 'outlined';
  icon?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  rightIconBtnClassName?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

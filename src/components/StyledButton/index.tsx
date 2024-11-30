import React from 'react';
import { IStyledButton } from './button.types';

import './button.scss';

const StyledButton = ({
  title,
  color = 'primary',
  icon,
  className,
  onClick,
  disabled,
  rightIconBtnClassName,
  type = 'button'
}: IStyledButton) => {
  return (
    <button
      disabled={disabled}
      className={`button-${color} ${className}`}
      onClick={onClick}
      type={type}>
      {title}
      {icon && <span className={rightIconBtnClassName}>{icon}</span>}
    </button>
  );
};
export default StyledButton;

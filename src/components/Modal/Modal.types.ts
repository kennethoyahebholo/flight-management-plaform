import React from 'react';

export interface IModal extends React.HTMLProps<HTMLDivElement> {
  isShow: boolean;
  onClickAway?: () => void;
  onClose?: () => void;
  className?: string;
  childrenClassName?: string;
  contentClassName?: string;
  isTopIcon?: boolean;
  topIcon?: React.ReactNode;
  isShowCloseIcon?: boolean;
  closeClassName?: string;
  isShowBottomLogo: boolean;
  loading?: boolean;
}

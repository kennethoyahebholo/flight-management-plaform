import React from 'react';

export interface IModal extends React.HTMLProps<HTMLDivElement> {
  isShow: boolean;
  className?: string;
  childrenClassName?: string;
  contentClassName?: string;
  isTopIcon?: boolean;
  isShowBackToLogin?: boolean;
  topIcon?: React.ReactNode;
  onClickAway?: () => void;
  onClose?: () => void;
  onBack?: () => void;
  isShowBackButton?: boolean;
  isShowCloseIcon?: boolean;
  closeClassName?: string;
  isShowBottomLogo: boolean;
  loading?: boolean;
}

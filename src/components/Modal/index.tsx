import React from 'react';
import ClickAwayListener from 'react-click-away-listener';

import { IModal } from './Modal.types';
import SuspenseLoader from '../SuspenseLoader';

import { ReactComponent as ModalCloseIcon } from '../../assets/images/circled-close-icon.svg';
import PrimaryLogo from '../../assets/images/primaryLogo.png';

import ModalStyles from './Modal.module.scss';

const Modal = ({
  children,
  isShow,
  onClickAway,
  onClose,
  className,
  childrenClassName,
  contentClassName,
  isTopIcon,
  topIcon,
  isShowCloseIcon = true,
  closeClassName,
  isShowBottomLogo,
  loading
}: IModal) => {
  if (!isShow) return null;

  return (
    <div className={`${ModalStyles.modal} ${className}`}>
      {loading ? (
        <div className={ModalStyles.modal__loader}>
          <SuspenseLoader />
        </div>
      ) : (
        <ClickAwayListener onClickAway={() => onClickAway?.()}>
          <div className={`${ModalStyles.modal__content}  ${contentClassName}`}>
            <div className={ModalStyles.modal__header}>
              {isShowCloseIcon && (
                <div className={`${ModalStyles.modal__close} ${closeClassName}`}>
                  <ModalCloseIcon
                    className={ModalStyles.modal__closeIcon}
                    onClick={() => onClose?.()}
                  />
                </div>
              )}
            </div>

            <div className={`${ModalStyles.modal__children} ${childrenClassName}`}>
              {isTopIcon && <div className={ModalStyles.modal__topIcon}>{topIcon}</div>}

              {children}

              {isShowBottomLogo && (
                <div className={ModalStyles.modal__bottomLogo}>
                  <img
                    className={ModalStyles.modal__logoImg}
                    src={PrimaryLogo}
                    alt="primary_logo"
                  />
                </div>
              )}
            </div>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default Modal;

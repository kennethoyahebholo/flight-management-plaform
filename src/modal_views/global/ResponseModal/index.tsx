import React, { ReactNode } from 'react';
import Modal from '../../../components/Modal';

import ResponseModalStyles from './ResponseModal.module.scss';
import { StyledButton } from '../../../components';

interface IResponseModal {
  isShow: boolean;
  icon?: React.ReactNode;
  title?: string;
  subTitle?: ReactNode;
  btnTitle?: string;
  onClick?: () => void;
  isShowCloseIcon?: boolean;
}

const ResponseModal = ({
  isShow,
  icon,
  title,
  subTitle,
  btnTitle,
  onClick,
  isShowCloseIcon
}: IResponseModal) => {
  return (
    <Modal isShow={isShow} isShowCloseIcon={isShowCloseIcon} isShowBottomLogo={false}>
      <div className={ResponseModalStyles.wrapper}>
        <div className={ResponseModalStyles.wrapper__icon}>{icon}</div>

        {title && <div className={ResponseModalStyles.wrapper__title}>{title}</div>}

        {subTitle && <div className={ResponseModalStyles.wrapper__subTitle}>{subTitle}</div>}

        {btnTitle && (
          <div>
            <StyledButton
              className={ResponseModalStyles.wrapper__btn}
              title={btnTitle}
              color="primary"
              onClick={onClick}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ResponseModal;

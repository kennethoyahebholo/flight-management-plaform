import React from 'react';

import { Modal } from '../../../../../../components';
import Sidebar from '../..';

import SideModalStyles from './SidebarModal.module.scss';

interface ISidebarModal {
  isShowSidebarModal: boolean;
  onClickAwaySidebarModal: () => void;
}

const SidebarModal = ({ isShowSidebarModal, onClickAwaySidebarModal }: ISidebarModal) => {
  return (
    <Modal
      isShow={isShowSidebarModal}
      className={SideModalStyles.sidebarModal}
      contentClassName={SideModalStyles.sidebarModal__content}
      childrenClassName={SideModalStyles.sidebarModal__children}
      onClickAway={onClickAwaySidebarModal}
      isTopIcon={false}
      isShowBackToLogin={false}
      isShowBackButton={false}
      isShowCloseIcon={false}
      isShowBottomLogo={false}>
      <Sidebar />
    </Modal>
  );
};

export default SidebarModal;

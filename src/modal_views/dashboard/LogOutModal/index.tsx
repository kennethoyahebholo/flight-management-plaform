import React from 'react';

import { useNavigate } from 'react-router-dom';

import Modal from '../../../components/Modal';
import { ILogoutModal } from './LogoutModal.types';
import { useAppDispatch } from '../../../redux/hooks';
import LogoutModalIcon from '../../../assets/images/logout-icon.svg';

import LogoutModalStyles from './LogoutModal.module.scss';
import { StyledButton } from '../../../components';
import { setUser } from '../../../redux/slices/auth';
import { removeUserTokenCookie } from '../../../utils/helpers/auth/cookieUtility';

const LogoutModal = ({
  showLogoutModal,
  onClickAwayLogoutModal,
  onCloseLogoutModal,
  onCancelLogoutModal
}: ILogoutModal) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogoutClick = () => {
    removeUserTokenCookie();
    dispatch(setUser({}));
    navigate('/');
    window.location.reload();
  };

  return (
    <Modal
      isShow={showLogoutModal}
      isShowBackButton={false}
      onBack={onClickAwayLogoutModal}
      onClickAway={onClickAwayLogoutModal}
      onClose={onCloseLogoutModal}
      isShowCloseIcon={false}
      isShowBackToLogin={false}
      className={LogoutModalStyles.logoutModal}
      isShowBottomLogo={false}>
      <div className={LogoutModalStyles.logoutModal__content}>
        <div className={LogoutModalStyles.logoutModal__logo}>
          <div className={LogoutModalStyles.logoutModal__logoItem}>
            <img src={LogoutModalIcon} alt="Logout Icon" />
          </div>
        </div>
        <h3 className={LogoutModalStyles.logoutModal__headText}>Logout</h3>

        <p className={LogoutModalStyles.logoutModal__subtext}>Are you sure you want to log out?</p>

        <div className={LogoutModalStyles.logoutModal__bottom}>
          <StyledButton
            onClick={onCancelLogoutModal}
            title="Cancel"
            className={LogoutModalStyles.logoutModal__firstButton}
          />

          <StyledButton
            onClick={onLogoutClick}
            title="Yes, Log out"
            className={LogoutModalStyles.logoutModal__secondButton}
          />
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;

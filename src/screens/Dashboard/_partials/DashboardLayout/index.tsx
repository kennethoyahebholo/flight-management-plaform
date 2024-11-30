import React, { PropsWithChildren, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import DashboardSidebar from '../DashboardSidebar';
import SidebarModal from '../DashboardSidebar/_partials/SidebarModal';

import DashboardHeader from '../DashboardHeader';
import DashboardLayoutStyles from './DashboardLayout.module.scss';
import { LogOutModal } from '../../../../modal_views/dashboard';
import { setIsShowLogOutModal } from '../../../../redux/slices/dashboard';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  const { isShowLogOutModal } = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  useEffect(() => {
    setIsShowSidebar(false);
  }, [pathname]);

  const onModalLogOutModalClose = () => {
    dispatch(setIsShowLogOutModal(false));
  };

  const renderSidebarModal = () => {
    return (
      <SidebarModal
        isShowSidebarModal={isShowSidebar}
        onClickAwaySidebarModal={() => {
          setIsShowSidebar(false);
        }}
      />
    );
  };

  return (
    <div className={DashboardLayoutStyles.dashboardLayout}>
      {renderSidebarModal()}

      <div
        className={`${
          !isCollapsed
            ? DashboardLayoutStyles.dashboardLayout__sidebar
            : DashboardLayoutStyles['dashboardLayout__sidebar--collapsed']
        }`}>
        <DashboardSidebar isCollapsed={isCollapsed} />
      </div>

      <div className={DashboardLayoutStyles.dashboardLayout__body}>
        <DashboardHeader
          handleToggleHamburger={() => {
            setIsShowSidebar(!isShowSidebar);
          }}
          handleCollapse={handleCollapse}
          isCollapsed={isCollapsed}
        />
        <div className={`${DashboardLayoutStyles.dashboardLayout__children} `}>{children}</div>
      </div>

      {isShowLogOutModal && (
        <LogOutModal
          showLogoutModal={isShowLogOutModal}
          onClickAwayLogoutModal={onModalLogOutModalClose}
          onCloseLogoutModal={onModalLogOutModalClose}
          onCancelLogoutModal={onModalLogOutModalClose}
        />
      )}
    </div>
  );
};

export default DashboardLayout;

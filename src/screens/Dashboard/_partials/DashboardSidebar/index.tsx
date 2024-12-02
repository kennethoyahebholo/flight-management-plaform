import React from 'react';

import { useLocation } from 'react-router-dom';

import SidebarLink from './_partials/SidebarLink';
import { ISidebar } from './Sidebar.types';
import { bottomSidebarLinks, topSidebarLinks } from './_partials/SidebarRoutes';

import PrimaryLogo from '../../../../assets/images/primaryLogo.png';
import PrimaryLogoWithText from '../../../../assets/images/PrimaryLogoWithText.png';

import SidebarStyles from './Sidebar.module.scss';

const DashboardSidebar = ({ onCloseSidebar, isCollapsed }: ISidebar) => {
  const { pathname } = useLocation();

  return (
    <div className={SidebarStyles.sidebar}>
      <div
        className={`${
          !isCollapsed ? SidebarStyles.sidebar__logo : SidebarStyles['sidebar__logo--collapsed']
        }`}>
        {isCollapsed ? (
          <img className={SidebarStyles.sidebar__logoImg} src={PrimaryLogo} alt="primary_logo" />
        ) : (
          <img
            className={SidebarStyles.sidebar__logoImgWithText}
            src={PrimaryLogoWithText}
            alt="primary_logo"
          />
        )}
      </div>

      <div
        className={`${
          !isCollapsed ? SidebarStyles.sidebar__group : SidebarStyles['sidebar__group--collapsed']
        }`}>
        <div className={SidebarStyles.sidebar__top}>
          {topSidebarLinks?.map((list) => (
            <div className={SidebarStyles.sidebar__link} key={list?.title}>
              <SidebarLink
                title={isCollapsed ? '' : list?.title}
                pathname={pathname}
                icon={list?.icon}
                linkTo={list?.linkTo}
                activeIcon={list?.activeIcon}
                onClick={onCloseSidebar}
                activeLink={list?.activeLink}
                isCollapsed={isCollapsed}
              />
              {list?.hasLinkSeparator && <div className={SidebarStyles.sidebar__linkSeparator} />}
            </div>
          ))}
        </div>

        <div className={SidebarStyles.sidebar__bottom}>
          {bottomSidebarLinks?.map((list) => (
            <div key={list?.title} className={SidebarStyles.sidebar__link}>
              <SidebarLink
                title={isCollapsed ? '' : list?.title}
                pathname={pathname}
                icon={list?.icon}
                linkTo={list?.linkTo}
                activeIcon={list?.activeIcon}
                onClick={onCloseSidebar}
                activeLink={list?.activeLink}
                isCollapsed={isCollapsed}
              />
              {list?.hasLinkSeparator && <div className={SidebarStyles.sidebar__linkSeparator} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default DashboardSidebar;

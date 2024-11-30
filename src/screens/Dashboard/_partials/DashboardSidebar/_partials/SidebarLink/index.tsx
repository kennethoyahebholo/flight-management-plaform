import React from 'react';
import { Link } from 'react-router-dom';

import SidebarTab from './SidebarTab';
import { ISidebarLink } from './SidebarLink.types';
import { setIsShowLogOutModal } from '../../../../../../redux/slices/dashboard';
import { useAppDispatch } from '../../../../../../redux/hooks';

const SidebarLink = ({
  title,
  pathname,
  icon,
  activeIcon,
  activeLink,
  linkTo,
  handleShowLogOutModal,
  isCollapsed
}: ISidebarLink) => {
  const dispatch = useAppDispatch();
  const handleSubTabsOrLogOut = () => {
    dispatch(setIsShowLogOutModal(true));
  };

  const handleSelectSideTabState = () => {
    if (linkTo === '') {
      return (
        <SidebarTab
          activeLink={activeLink}
          activeIcon={activeIcon}
          linkTo={linkTo}
          icon={icon}
          title={title}
          pathname={pathname}
          onClick={handleSubTabsOrLogOut}
          isCollapsed={isCollapsed}
        />
      );
    }

    return (
      <Link to={linkTo as string} style={{ textDecoration: 'none' }}>
        <SidebarTab
          activeLink={activeLink}
          activeIcon={activeIcon}
          linkTo={linkTo}
          icon={icon}
          title={title}
          pathname={pathname}
          isCollapsed={isCollapsed}
        />
      </Link>
    );
  };

  return <div>{handleSelectSideTabState()}</div>;
};
export default SidebarLink;

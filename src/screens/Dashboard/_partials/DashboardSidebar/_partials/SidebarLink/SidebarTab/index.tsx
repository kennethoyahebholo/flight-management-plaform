import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../../../../../redux/hooks';
import { ISidebarLink } from '../SidebarLink.types';

import SidebarTabStyles from './SidebarTab.module.scss';
import { setActivePage } from '../../../../../../../redux/slices/dashboard';

const SidebarTab = ({ title, activeIcon, icon, pathname, activeLink, onClick }: ISidebarLink) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeLink.includes(pathname)) {
      dispatch(setActivePage(title));
    }
  }, [pathname]);

  return (
    <div className={SidebarTabStyles.sideBarLink}>
      <div
        className={
          activeLink.includes(pathname)
            ? SidebarTabStyles?.sidebarLink__mainLink
            : SidebarTabStyles['sidebarLink__mainLink--inactive']
        }
        onClick={onClick}>
        <span className={SidebarTabStyles.sidebarLink__mainLinkIcon}>
          {activeLink.includes(pathname) ? activeIcon : icon}
        </span>
        <div className={SidebarTabStyles.sidebarLink__mainLinkTitle}>
          <div className={SidebarTabStyles.sidebarLink__mainLinkTitleContent}>{title}</div>
        </div>
      </div>
    </div>
  );
};

export default SidebarTab;

import React, { useEffect } from 'react';

import { useAppDispatch } from '../../../../../../../redux/hooks';
import { ISidebarLink } from '../SidebarLink.types';
import { setActivePage } from '../../../../../../../redux/slices/dashboard';

import SidebarTabStyles from './SidebarTab.module.scss';

const isActiveLink = (activeLink: string[], pathname: string) => {
  const links = Array.isArray(activeLink) ? activeLink : [activeLink];

  return links.some((link) => {
    if (link.includes(':')) {
      const staticPart = link.split(':')[0];

      return pathname.startsWith(staticPart);
    }

    return pathname === link;
  });
};

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
          isActiveLink(activeLink as string[], pathname)
            ? SidebarTabStyles?.sidebarLink__mainLink
            : SidebarTabStyles['sidebarLink__mainLink--inactive']
        }
        onClick={onClick}>
        <span className={SidebarTabStyles.sidebarLink__mainLinkIcon}>
          {isActiveLink(activeLink as string[], pathname) ? activeIcon : icon}
        </span>
        <div className={SidebarTabStyles.sidebarLink__mainLinkTitle}>
          <div className={SidebarTabStyles.sidebarLink__mainLinkTitleContent}>{title}</div>
        </div>
      </div>
    </div>
  );
};

export default SidebarTab;

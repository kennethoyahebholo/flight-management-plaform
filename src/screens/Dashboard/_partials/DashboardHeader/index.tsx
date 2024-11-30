import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ProfileAvatar from '../../../../assets/svg_component/ProfileAvatar';
import NotificationIcon from '../../../../assets/svg_component/NotificationIcon';
import HambugerIcon from '../../../../assets/svg_component/HambugerIcon';
import ArrowHeadIcon from '../../../../assets/svg_component/ArrowHeadIcon';

import DashboardHeaderStyle from './DashboardHeader.module.scss';

interface IDashboardHeader {
  handleToggleHamburger?: () => void;
  isCollapsed?: boolean;
  handleCollapse?: () => void;
}

const DashboardHeader = ({
  handleToggleHamburger,
  isCollapsed,
  handleCollapse
}: IDashboardHeader) => {
  const pathname = useLocation();

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  useEffect(() => {
    setIsOptionsOpen(false);
  }, [pathname]);

  return (
    <div className={DashboardHeaderStyle.dashboardHeader}>
      <div className={DashboardHeaderStyle.dashboardHeader__activityBar}>
        <div
          className={`${DashboardHeaderStyle.dashboardHeader__collapseIcon} ${
            isCollapsed
              ? DashboardHeaderStyle['dashboardHeader__collapseIcon--collapsed']
              : DashboardHeaderStyle['dashboardHeader__collapseIcon--open']
          }`}
          onClick={handleCollapse}>
          <ArrowHeadIcon />
        </div>
        <span className={DashboardHeaderStyle.dashboardHeader__right}>
          <span className={DashboardHeaderStyle.dashboardHeader__clickable}>
            <NotificationIcon />
          </span>

          <span className={DashboardHeaderStyle.dashboardHeader__avatar}>
            <span
              className={DashboardHeaderStyle.dashboardHeader__avatarGroup}
              onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
              <span className={DashboardHeaderStyle.dashboardHeader__avatarImage}>
                <ProfileAvatar />
              </span>
            </span>
          </span>
          <span className={DashboardHeaderStyle.dashboardHeader__hamburger}>
            <HambugerIcon onClick={handleToggleHamburger} />
          </span>
        </span>
      </div>
    </div>
  );
};
export default DashboardHeader;

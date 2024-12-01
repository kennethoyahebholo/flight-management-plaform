import React from 'react';

import { ISidebarLinkItem } from '../../Sidebar.types';
import SidebarHomeIcon from '../../../../../../assets/svg_component/SidebarHomeIcon';
import SidebarLogoutIcon from '../../../../../../assets/svg_component/SidebarLogoutIcon';
import SidebarFlightsIcon from '../../../../../../assets/svg_component/SidebarFlightsIcon';

export const topSidebarLinks: ISidebarLinkItem[] = [
  {
    title: 'Dashboard',
    linkTo: '/dashboard',
    activeLink: ['/dashboard'],
    icon: <SidebarHomeIcon />,
    activeIcon: <SidebarHomeIcon />,
    key: 'HOME_ICON'
  },
  {
    title: 'Flights',
    linkTo: '/dashboard/flights/all?page=1',
    activeLink: [
      '/dashboard/flights',
      '/dashboard/flights/all',
      '/dashboard/flights/flight-details/:id'
    ],
    icon: <SidebarFlightsIcon />,
    activeIcon: <SidebarFlightsIcon />,
    key: 'FLIGHTS'
  }
];

export const bottomSidebarLinks: ISidebarLinkItem[] = [
  {
    title: 'Logout',
    linkTo: '',
    activeLink: '',
    icon: <SidebarLogoutIcon />,
    activeIcon: <SidebarLogoutIcon />,
    key: 'LOGOUT_ICON'
  }
];

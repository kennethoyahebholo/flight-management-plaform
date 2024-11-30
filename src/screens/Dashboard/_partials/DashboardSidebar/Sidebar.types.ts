export interface ISidebar {
  onCloseSidebar?: () => void;
  isCollapsed?: boolean;
}

export interface ISubTabStatus {
  [key: string]: boolean;
}

export interface ISidebarLinkItem {
  title: string;
  linkTo: string;
  activeLink: string[] | string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  key: string;
  isNew?: boolean;
  hasLinkSeparator?: boolean;
  subTabs?: Array<{
    id: string;
    title: string;
    linkTo: string;
    isNew?: boolean;
    activeLink: string[];
  }>;
}

export interface ISidebarLink {
  title: string;
  pathname: string | never;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  activeLink: string[] | string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  linkTo?: string | null;
  handleShowLogOutModal?: () => void;
  handleSubTabsOrLogOut?: () => void;
  isCollapsed?: boolean;
}

export interface SideBarItem {
  label: string;
  icon: string;
  route?: string;
  children?: SideBarItemChild[];
  isEnabled: boolean;
  collapsed?: boolean; // add this
}

export interface SideBarItemChild {
  label: string;
  route: string;
  isEnabled: boolean;
}
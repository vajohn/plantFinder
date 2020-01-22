export interface Navigations {
  name: string;
  path: string;
  icon?: string;
  children?: Navigations[];
}

export interface Dropdown {
  value: string;
  viewValue: string;
}


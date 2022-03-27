interface IBaseMenuItem {
  [key: string]: {
    title: string;
    href?: string;
  };
}

export type SubItem = {
  [key: string]: IBaseMenuItem['key'] & { href: string };
};

export type ISideMenuItem = {
  [key: string]: IBaseMenuItem['key'] & {
    subItems?: SubItem[];
    icon?: JSX.Element;
  };
};

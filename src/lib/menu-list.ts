import { CreditCardIcon, LayoutGrid, LucideIcon, PenIcon, Settings, Users } from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(_pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/dashboard',
          label: 'Dashboard',
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: '/writer',
          label: 'Writer',
          icon: PenIcon,
          submenus: [],
        },
      ],
    },

    {
      groupLabel: 'Settings',
      menus: [
        {
          href: '/account',
          label: 'Users',
          icon: Users,
        },
        {
          href: '/settings',
          label: 'Settings',
          icon: Settings,
        },
        {
          href: '/billings',
          label: 'Billings',
          icon: CreditCardIcon,
        },
      ],
    },
  ];
}

import { Chip } from '@mui/material';
import {
  TbLayoutDashboard,
  TbLayoutDashboardFilled,
  TbArrowsLeftRight,
  TbUsers,
  TbMessage,
  TbMessageFilled,
  TbBlocks,
  TbChalkboard,
  TbCherry,
  TbCherryFilled,
  TbChartTreemap,
  TbSettings,
  TbSettingsFilled,
} from 'react-icons/tb';

import { useAppDispatch, useAppSelector } from '../store';
import { setDashboardCollapsed, setDashboardLoading } from '../store/slices/settings.slice';

export type iSidebarOptions = {
  title?: string;
  options: {
    title: string;
    url: string;
    alternativeLinks?: string[];
    icon: React.ReactElement<any>;
    activeIcon?: React.ReactElement<any>;
    endIcon?: React.ReactElement<any>;
    submenu?: {
      title: string;
      url: string;
    }[];
  }[];
}[];

export const useSidebarOptions: () => iSidebarOptions = () => {
  const sidebarOptions = [
    {
      options: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          alternativeLinks: ['/', '/home'],
          icon: <TbLayoutDashboard />,
          activeIcon: <TbLayoutDashboardFilled />,
        },
        {
          title: 'Payment',
          url: '/payment',
          icon: <TbArrowsLeftRight />,
        },
        {
          title: 'Customers',
          url: '/customers',
          icon: <TbUsers />,
        },
        {
          title: 'Messages',
          url: '/messages',
          icon: <TbMessage />,
          activeIcon: <TbMessageFilled />,
          endIcon: <Chip label="8" size="small" sx={{ borderRadius: 2 }} />,
        },
      ],
    },
    {
      title: 'General',
      options: [
        {
          title: 'Settings',
          url: '/settings',
          icon: <TbSettings />,
          activeIcon: <TbSettingsFilled />,
        },
        {
          title: 'Blocks',
          url: '/blocks',
          icon: <TbBlocks />,
          submenu: [
            {
              title: 'Styles',
              url: '/blocks/styles',
            },
            {
              title: 'Options',
              url: '/blocks/options',
            },
            {
              title: 'Forms',
              url: '/blocks/forms',
            },
            {
              title: 'Themes',
              url: '/blocks/themes',
            },
          ],
        },
        {
          title: 'Widgets',
          url: '/widgets',
          icon: <TbChalkboard />,
        },
        {
          title: 'Elements',
          url: '/elements',
          icon: <TbCherry />,
          activeIcon: <TbCherryFilled />,
        },
        {
          title: 'Tables',
          url: '/tables',
          icon: <TbChartTreemap />,
        },
      ],
    },
  ];

  return sidebarOptions;
};

const useDashboard = () => {
  const loading = useAppSelector((state) => state.settings?.dashboard.loading) || false;
  const collapsed = useAppSelector((state) => state.settings?.dashboard.collapsed) || false;

  const dispatch = useAppDispatch();

  const setLoading = (value: boolean) => {
    dispatch(setDashboardLoading(value));
  };

  const setCollapsed = (value: boolean) => {
    dispatch(setDashboardCollapsed(value));
  };

  return { loading, setLoading, collapsed, setCollapsed };
};

export default useDashboard;

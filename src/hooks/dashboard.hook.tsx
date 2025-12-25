import { Chip } from '@mui/material';
import type { iSidebarOptions } from '@/layouts/dashboard/sidebar/types';
import type { SxProps } from '@/store/interfaces/settings';
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
import { useAppDispatch, useAppSelector } from '@/store';
import {
  setDashboardCollapsed,
  setDashboardContainerMaxWidth,
  setDashboardCustomSx,
  setDashboardLoading,
} from '@/store/slices/settings.slice';
import { useEffect, useLayoutEffect } from 'react';

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

        // Hide for now
        ...(false
          ? [
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
                endIcon: (
                  <Chip
                    label="8"
                    size="small"
                    sx={{
                      borderRadius: 2,
                    }}
                  />
                ),
              },
            ]
          : []),
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
          title: 'Components',
          url: '/components',
          icon: <TbBlocks />,
          submenu: [
            {
              title: 'Kanban',
              url: '/kanban',
            },
            {
              title: 'Pomodoro',
              url: '/pomodoro',
            },
            ...(true
              ? []
              : [
                  {
                    title: 'Options',
                    url: '/options',
                  },
                  {
                    title: 'Forms',
                    url: '/forms',
                  },
                  {
                    title: 'Themes',
                    url: '/themes',
                  },
                ]),
          ],
        },
        ...(true
          ? []
          : [
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
            ]),
      ],
    },
  ];

  return sidebarOptions;
};

const useDashboard = ({ disableReload }: { disableReload?: boolean } = {}) => {
  const loading = useAppSelector((state) => state.settings?.dashboard.loading) || false;
  const collapsed = useAppSelector((state) => state.settings?.dashboard.collapsed) || false;
  const containerMaxWidth = useAppSelector((state) => state.settings?.dashboard.containerMaxWidth);
  const sx = useAppSelector((state) => state.settings?.dashboard.customSx);

  const dispatch = useAppDispatch();

  const setLoading = (value: boolean) => {
    dispatch(setDashboardLoading(value));
  };

  const setCollapsed = (value: boolean) => {
    dispatch(setDashboardCollapsed(value));
  };

  const setContainerMaxWidth = (value: 'sm' | 'md' | 'lg' | 'xl' | false) => {
    dispatch(setDashboardContainerMaxWidth(value));
  };

  const setCustomDashboardSx = (value: SxProps) => {
    dispatch(setDashboardCustomSx(value));
  };

  return {
    loading,
    setLoading,
    collapsed,
    setCollapsed,
    containerMaxWidth,
    sx,
    setContainerMaxWidth,
    setCustomDashboardSx,
  };
};

export default useDashboard;

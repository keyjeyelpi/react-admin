import { lazy } from 'react';
import { BlocksRoute } from './blocks.dashboard';

const DashboardLayout = lazy(() => import('../../layouts/dashboard/layout.dashboard'));
const Dashboard = lazy(() => import('../../pages/dashboard.page'));
const NotFound = lazy(() => import('../../pages/not-found.page'));
const Settings = lazy(() => import('../../pages/settings.page'));

const dashboardRoutes = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
  },
  {
    path: 'settings',
    element: <Settings />,
  },
  BlocksRoute,
  {
    path: '*',
    element: <NotFound />,
  },
];

export const DashboardRoute = {
  path: '/',
  element: <DashboardLayout />,
  children: dashboardRoutes,
};

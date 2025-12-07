import { lazy, Suspense } from 'react';
import DashboardSkeleton from '@/pages/dashboard/components/skeleton.dashboard';
import { ComponentsRoute } from './components.dashboard';

const DashboardLayout = lazy(() => import('../../layouts/dashboard/layout.dashboard'));
const Dashboard = lazy(() => import('../../pages/dashboard'));
const NotFound = lazy(() => import('../../pages/not-found.page'));
const Settings = lazy(() => import('../../pages/settings'));

const dashboardRoutes = [
  {
    index: true,
    element: (
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
      </Suspense>
    ),
  },
  {
    path: 'dashboard',
    element: (
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
      </Suspense>
    ),
  },
  {
    path: 'settings',
    element: <Settings />,
  },
  ComponentsRoute,
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

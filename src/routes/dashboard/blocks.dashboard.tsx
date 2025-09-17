import { lazy } from 'react';

const Kanban = lazy(() => import('../../pages/components/kanban.components'));

const componentsRoutes = [
  {
    path: 'kanban',
    element: <Kanban />,
  },
];

export const ComponentsRoute = {
  path: '/components',
  children: componentsRoutes,
};

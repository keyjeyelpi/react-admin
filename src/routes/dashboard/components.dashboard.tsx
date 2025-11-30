import { lazy } from 'react';

const Kanban = lazy(() => import('../../pages/components/kanban.component'));
const Pomodoro = lazy(() => import('../../pages/components/pomodoro.component'));

const componentsRoutes = [
  {
    path: 'kanban',
    element: <Kanban />,
  },
  {
    path: 'pomodoro',
    element: <Pomodoro />,
  },
];

export const ComponentsRoute = {
  path: '/components',
  children: componentsRoutes,
};

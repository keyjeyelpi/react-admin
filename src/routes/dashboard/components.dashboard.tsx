import Kanban from '@/pages/components/kanban';
import Pomodoro from '@/pages/components/pomodoro';

const componentsRoutes = [
  {
    path: 'kanban/*',
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

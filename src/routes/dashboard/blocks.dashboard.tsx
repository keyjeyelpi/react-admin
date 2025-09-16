import { lazy } from 'react';

const Styles = lazy(() => import('../../pages/blocks/style.blocks'));

const blocksRoutes = [
  {
    path: 'styles',
    element: <Styles />,
  },
];

export const BlocksRoute = {
  path: '/blocks',
  children: blocksRoutes,
};

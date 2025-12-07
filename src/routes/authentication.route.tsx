import { lazy } from 'react';

const AuthenticationLayout = lazy(() => import('../layouts/authentication.layout'));
const Authenticate = lazy(() => import('../pages/authenticate'));

const authenticationRoutes = [
  {
    path: '/authenticate',
    element: <Authenticate />,
  },
];

export const AuthenticationRoute = {
  path: '/',
  element: <AuthenticationLayout />,
  children: authenticationRoutes,
};

import type { RouteObject } from 'react-router-dom';
import { AuthenticationRoute } from './authentication.route';
import { DashboardRoute } from './dashboard';

const routes: RouteObject[] = [AuthenticationRoute, DashboardRoute];

export default routes;

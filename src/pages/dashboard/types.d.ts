import { JSX } from 'react';

export interface DashboardDataProps {
  month: string;
  tickets: number;
  users: number;
  openIssues: number;
  views: number;
}

export interface DashboardTitleProps {
  title: string;
  icon?: JSX.Element;
  options?: JSX.Element;
}

export interface DashboardCardProps {
  auto?: boolean;
  icon: JSX.Element;
  title: string;
  values?: { [key: string]: number }[];
}

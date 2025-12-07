import { JSX } from 'react';

export interface DashboardTitleProps {
  title: string;
  icon?: JSX.Element;
  options?: JSX.Element;
}

export interface DashboardCardProps {
  auto?: boolean;
  icon: JSX.Element;
  title: string;
  value: string | number;
  previousValue?: string | number;
}

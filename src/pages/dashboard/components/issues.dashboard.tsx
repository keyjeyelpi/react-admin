import { TbBug } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import DashboardCard from './card.dashboard';
import type { DashboardDataProps } from '../types';

const DashboardOpenIssues = () => {
  const [dashboardData, setDashboardData] = useState<DashboardDataProps[]>([]);

  useEffect(() => {
    import('@/data/dashboard.data.json').then((module) => {
      setDashboardData(module.default as DashboardDataProps[]);
    });
  }, []);

  return (
    <DashboardCard
      icon={<TbBug />}
      title="Open Issues"
      values={
        dashboardData?.map((data) => ({
          [data.month]: data.openIssues,
        })) ?? []
      }
      auto
    />
  );
};

export default DashboardOpenIssues;

import { TbGlobe } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import DashboardCard from './card.dashboard';
import type { DashboardDataProps } from '../types';

const DashboardViews = () => {
  const [dashboardData, setDashboardData] = useState<DashboardDataProps[]>([]);

  useEffect(() => {
    import('@/data/dashboard.data.json').then((module) => {
      setDashboardData(module.default as DashboardDataProps[]);
    });
  }, []);

  return (
    <DashboardCard
      icon={<TbGlobe />}
      title="Views"
      values={
        dashboardData?.map((data) => ({
          [data.month]: data.views,
        })) ?? []
      }
      auto
    />
  );
};

export default DashboardViews;

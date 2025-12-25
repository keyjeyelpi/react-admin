import { TbUsers } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import DashboardCard from './card.dashboard';
import type { DashboardDataProps } from '../types';

const DashboardUsers = () => {
  const [dashboardData, setDashboardData] = useState<DashboardDataProps[]>([]);

  useEffect(() => {
    import('@/data/dashboard.data.json').then((module) => {
      setDashboardData(module.default as DashboardDataProps[]);
    });
  }, []);

  return (
    <DashboardCard
      icon={<TbUsers />}
      title="Users"
      values={
        dashboardData?.map((data) => ({
          [data.month]: data.users,
        })) ?? []
      }
      auto
    />
  );
};

export default DashboardUsers;

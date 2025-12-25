import { TbTicket } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import DashboardCard from './card.dashboard';
import type { DashboardDataProps } from '../types';

const DashboardTickets = () => {
  const [dashboardData, setDashboardData] = useState<DashboardDataProps[]>([]);

  useEffect(() => {
    import('@/data/dashboard.data.json').then((module) => {
      setDashboardData(module.default as DashboardDataProps[]);
    });
  }, []);

  return (
    <DashboardCard
      icon={<TbTicket />}
      title="Tickets"
      values={
        dashboardData?.map((data) => ({
          [data.month]: data.tickets,
        })) ?? []
      }
      auto
    />
  );
};

export default DashboardTickets;

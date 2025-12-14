import { TbTicket } from 'react-icons/tb';
import DashboardData from '@/data/dashboard.data.json';
import DashboardCard from './card.dashboard';

const DashboardTickets = () => (
  <DashboardCard
    icon={<TbTicket />}
    title="Tickets"
    values={
      DashboardData?.map((data) => ({
        [data.month]: data.tickets,
      })) ?? []
    }
    auto
  />
);

export default DashboardTickets;

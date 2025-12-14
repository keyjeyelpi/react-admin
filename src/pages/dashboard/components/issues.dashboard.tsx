import { TbBug } from 'react-icons/tb';
import DashboardData from '@/data/dashboard.data.json';
import DashboardCard from './card.dashboard';

const DashboardOpenIssues = () => (
  <DashboardCard
    icon={<TbBug />}
    title="Open Issues"
    values={
      DashboardData?.map((data) => ({
        [data.month]: data.openIssues,
      })) ?? []
    }
    auto
  />
);

export default DashboardOpenIssues;

import { TbGlobe } from 'react-icons/tb';
import DashboardData from '@/data/dashboard.data.json';
import DashboardCard from './card.dashboard';

const DashboardViews = () => (
  <DashboardCard
    icon={<TbGlobe />}
    title="Views"
    values={
      DashboardData?.map((data) => ({
        [data.month]: data.views,
      })) ?? []
    }
    auto
  />
);

export default DashboardViews;

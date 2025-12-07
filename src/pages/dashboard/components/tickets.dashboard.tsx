import { TbTicket } from 'react-icons/tb';
import DashboardCard from '../../../components/dashboard/card.dashboard';
import { useEffect, useState } from 'react';

const DashboardTickets = () => {
  const [value, setValue] = useState(31);
  const [previousValue, setPreviousValue] = useState(38);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setValue(Math.floor(Math.random() * 50) + 10);
      setPreviousValue(value);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [value]);

  return (
    <DashboardCard
      icon={<TbTicket />}
      title="Tickets"
      value={value}
      previousValue={previousValue}
      auto
    />
  );
};

export default DashboardTickets;

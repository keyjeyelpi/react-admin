import { TbTicket } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import DashboardCard from './card.dashboard';

const DashboardTickets = () => {
  const [value, setValue] = useState(31);
  const [previousValue, setPreviousValue] = useState(38);

  useEffect(() => {
    let start: number | null = null;
    let rafId: number;

    const loop = (timestamp: number) => {
      if (start === null) start = timestamp;

      if (timestamp - start >= 3000) {
        setPreviousValue(value);
        setValue(Math.floor(Math.random() * 50) + 10);
        return;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafId);
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

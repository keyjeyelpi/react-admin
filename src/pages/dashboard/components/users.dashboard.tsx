import { setTimeout } from 'node:timers/promises';
import { TbUsers } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import DashboardCard from '../../../components/dashboard/card.dashboard';

const DashboardUsers = () => {
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
      icon={<TbUsers />}
      title="Users"
      value={value}
      previousValue={previousValue}
      auto
    />
  );
};

export default DashboardUsers;

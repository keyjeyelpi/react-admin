import { TbBug, TbTicket, TbUsers, TbWorld } from 'react-icons/tb';
import DashboardCard from '../components/dashboard/card.dashboard';
import DraggableCard, {
  DraggableCardContainer,
  type CardProps,
} from '../components/draggable-cards';
import { usePositionReorder } from '../components/draggable-cards/usePositionReorder';
import Title from '../components/title.component';
import { Stack } from '@mui/material';
import { v4 as uuid } from 'uuid';

const cards: CardProps[] = [
  {
    id: uuid(),
    content: (
      <DashboardCard icon={<TbTicket />} title="Tickets" value={31} previousValue={38} auto />
    ),
    column: 4,
    row: 5,
  },
  {
    id: uuid(),
    content: (
      <DashboardCard icon={<TbUsers />} title="Sign Ups" value={24} previousValue={18} auto />
    ),
    column: 4,
    row: 5,
  },
  {
    id: uuid(),
    content: (
      <DashboardCard icon={<TbBug />} title="Open Issues" value={16} previousValue={19} auto />
    ),
    column: 4,
    row: 5,
  },
  {
    id: uuid(),
    content: (
      <DashboardCard icon={<TbWorld />} title="Views" value={31032} previousValue={30217} auto />
    ),
    column: 4,
    row: 5,
  },
  {
    id: uuid(),
    content: (
      <DashboardCard icon={<TbWorld />} title="Views" value={3103} previousValue={3021} auto />
    ),
    column: 4,
    row: 5,
  },
  {
    id: uuid(),
    content: <></>,
    column: 5,
    row: 10,
  },
  {
    id: uuid(),
    content: <></>,
    column: 5,
    row: 10,
  },
  {
    id: uuid(),
    content: <></>,
    column: 6,
    row: 10,
  },
  {
    id: uuid(),
    content: <></>,
    column: 4,
    row: 4,
  },
  {
    id: uuid(),
    content: <></>,
    column: 4,
    row: 4,
  },
  {
    id: uuid(),
    content: <></>,
    column: 4,
    row: 12,
  },
  {
    id: uuid(),
    content: <></>,
    column: 16,
    row: 10,
  },
];

const Dashboard = () => {
  const [order, updatePosition, updateOrder] = usePositionReorder(cards);

  return (
    <Stack gap={2} flex={1} sx={{ height: '100%' }}>
      <Title subtitle="Overview & analytics" />
      <DraggableCardContainer row={25} column={20} flex={1}>
        {order.map((card, index) => (
          <DraggableCard
            key={card.id}
            i={index}
            card={card}
            outlined
            backgroundColor="background.paper"
            updatePosition={updatePosition}
            updateOrder={updateOrder}
          />
        ))}
      </DraggableCardContainer>
    </Stack>
  );
};

export default Dashboard;

import { Stack } from '@mui/material';
import { TbBug, TbWorld } from 'react-icons/tb';
import { v4 as uuid } from 'uuid';
import type { GridProps } from '@/components/draggable-grid/types';
import { usePositionReorder } from '@/components/draggable-grid/usePositionReorder';
import Title from '@/components/title.component';
import DraggableGrid, { DraggableGridContainer } from '@/components/draggable-grid';
import DashboardCard from '@/pages/dashboard/components/card.dashboard';
import DashboardTickets from './components/tickets.dashboard';
import DashboardUsers from './components/users.dashboard';
import DashboardProjectAnalytic from './components/project-analytic.dashboard';

const initialGrid: GridProps[] = [
  {
    id: uuid(),
    children: <DashboardTickets />,
    column: {
      xs: 4,
      md: 2,
    },
    row: 1,
    turnDragOff: true,
  },
  {
    id: uuid(),
    children: <DashboardUsers />,
    column: {
      xs: 4,
      md: 2,
    },
    row: 1,
  },
  {
    id: uuid(),
    children: (
      <DashboardCard icon={<TbBug />} title="Open Issues" value={16} previousValue={19} auto />
    ),
    column: {
      xs: 4,
      md: 2,
    },
    row: 1,
  },
  {
    id: uuid(),
    children: (
      <DashboardCard icon={<TbWorld />} title="Views" value={3103} previousValue={3021} auto />
    ),
    column: {
      xs: 4,
      md: 2,
    },
    row: 1,
  },
  {
    id: uuid(),
    children: <DashboardProjectAnalytic />,
    column: {
      xs: 8,
      md: 4,
    },
    row: {
      xs: 1,
      md: 2,
    },
  },
  {
    id: uuid(),
    children: <></>,
    column: {
      xs: 4,
      md: 2,
    },
    row: 2,
  },
  {
    id: uuid(),
    children: <></>,
    column: 2,
    row: 3,
  },
  {
    id: uuid(),
    children: <></>,
    column: 3,
    row: 2,
  },
  {
    id: uuid(),
    children: <></>,
    column: 3,
    row: 2,
  },
  {
    id: uuid(),
    children: <></>,
    column: 2,
    row: 1,
  },
];

const Dashboard = () => {
  const [order, updatePosition, updateOrder] = usePositionReorder(initialGrid);

  return (
    <Stack
      gap={2}
      flex={1}
      sx={{
        height: '100%',
      }}
    >
      <Title subtitle="Overview & analytics" />
      <DraggableGridContainer row={8} column={5} flex={1}>
        {order.map((grid, index) => (
          <DraggableGrid
            key={grid.id}
            column={grid.column}
            row={grid.row}
            i={index}
            outlined
            backgroundColor="background.paper"
            updatePosition={updatePosition}
            updateOrder={updateOrder}
            turnDragOff={grid.turnDragOff}
          >
            {grid.children}
          </DraggableGrid>
        ))}
      </DraggableGridContainer>
    </Stack>
  );
};

export default Dashboard;

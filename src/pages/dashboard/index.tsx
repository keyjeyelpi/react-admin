import { Stack } from '@mui/material';
import { v4 as uuid } from 'uuid';
import type { GridProps } from '@/components/draggable-grid/types';
import { usePositionReorder } from '@/components/draggable-grid/usePositionReorder';
import Title from '@/components/title.component';
import DraggableGrid, { DraggableGridContainer } from '@/components/draggable-grid';
import DashboardTickets from './components/tickets.dashboard';
import DashboardUsers from './components/users.dashboard';
import DashboardProjectAnalytic from './components/project-analytic.dashboard';
import DashboardOpenIssues from './components/issues.dashboard';
import DashboardViews from './components/views.dashboard';

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
    children: <DashboardOpenIssues />,
    column: {
      xs: 4,
      md: 2,
    },
    row: 1,
  },
  {
    id: uuid(),
    children: <DashboardViews />,
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
      <Title title="Dashboard" subtitle="Overview & analytics" />
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

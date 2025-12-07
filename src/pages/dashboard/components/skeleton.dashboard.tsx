import type { GridProps } from '@/components/draggable-grid/types';
import DraggableGrid, { DraggableGridContainer } from '@/components/draggable-grid';
import { usePositionReorder } from '@/components/draggable-grid/usePositionReorder';
import Title from '@/components/title.component';
import { Skeleton, Stack } from '@mui/material';
import { v4 as uuid } from 'uuid';

const createSkeletonGrid = (
  column: GridProps['column'],
  row: GridProps['row'],
  turnDragOff = false,
): GridProps => ({
  id: uuid(),
  children: (
    <Skeleton
      height="100%"
      width="100%"
      sx={{
        transform: 'none',
      }}
    />
  ),
  column,
  row,
  ...(turnDragOff && {
    turnDragOff,
  }),
});

const initialGrid: GridProps[] = [
  createSkeletonGrid({ xs: 4, md: 2 }, 1, true),
  createSkeletonGrid({ xs: 4, md: 2 }, 1),
  createSkeletonGrid({ xs: 4, md: 2 }, 1),
  createSkeletonGrid({ xs: 4, md: 2 }, 1),
  createSkeletonGrid(
    { xs: 8, md: 4 },
    {
      xs: 1,
      md: 2,
    },
  ),
  createSkeletonGrid({ xs: 4, md: 2 }, 2),
  createSkeletonGrid(2, 3),
  createSkeletonGrid(3, 2),
  createSkeletonGrid(3, 2),
  createSkeletonGrid(2, 1),
];

const DashboardSkeleton = () => {
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

export default DashboardSkeleton;

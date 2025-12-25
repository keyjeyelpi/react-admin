import { Box, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import Title from '@/components/title.component';
import useDashboard from '@/hooks/dashboard.hook';
import KanbanContainer from './components/container.kanban';
import type { Column } from './types';
import KanbanAddCard from './components/add-card.kanban';
import KanbanSkeleton from './components/skeleton.kanban';

const Kanban = () => {
  const [initialCards, setInitialCards] = useState<Column[]>([]);

  const { setContainerMaxWidth, setCustomDashboardSx } = useDashboard();

  useEffect(() => {
    if (!initialCards.length)
      import('@/data/kanban.data.json').then((module) => {
        setInitialCards(module.default as Column[]);
      });

    setCustomDashboardSx({
      p: 0,
    });
    setContainerMaxWidth(false);
  }, []);

  if (!initialCards.length) return <KanbanSkeleton />;

  return (
    <Stack
      sx={{
        height: '100%',
        position: 'relative',
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          p: {
            xs: 2,
            md: 4,
          },
        }}
      >
        <Title subtitle="Visualize your workflow, track progress, and stay organized." />
        <KanbanAddCard />
      </Stack>
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
        }}
      >
        <KanbanContainer items={initialCards} />
      </Box>
    </Stack>
  );
};

export default Kanban;

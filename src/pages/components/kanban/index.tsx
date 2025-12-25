import { Box, Stack } from '@mui/material';
import { useEffect, useLayoutEffect, useState } from 'react';
import Title from '@/components/title.component';
import useDashboard from '@/hooks/dashboard.hook';
import KanbanContainer from './components/container.kanban';
import type { Column } from './types';
import KanbanAddColumn from './components/add-column.kanban';
import KanbanSkeleton from './components/skeleton.kanban';

// Global variable to persist kanban data across remounts
let globalKanbanData: Column[] | null = null;

const Kanban = () => {
  const [initialCards, setInitialCards] = useState<Column[]>(globalKanbanData || []);

  const { setContainerMaxWidth, setCustomDashboardSx } = useDashboard({ disableReload: true });

  useEffect(() => {
    if (!globalKanbanData)
      import('@/data/kanban.data.json').then((module) => {
        globalKanbanData = module.default as Column[];
        setInitialCards(globalKanbanData);
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
        <Title title='Kanban' subtitle="Visualize your workflow, track progress, and stay organized." />
        <KanbanAddColumn />
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

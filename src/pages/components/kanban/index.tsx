import { Box, Stack } from '@mui/material';
import { useEffect } from 'react';
import Title from '@/components/title.component';
import useDashboard from '@/hooks/dashboard.hook';
import KanbanContainer from './components/container.kanban';
import type { Column } from './types';
import KanbanData from '@/data/kanban.data.json';
import KanbanAddCard from './components/add-card.kanban';

const Kanban = () => {
  const initialCards: Column[] = KanbanData as Column[];

  const { setContainerMaxWidth, setCustomDashboardSx } = useDashboard();

  useEffect(() => {
    setCustomDashboardSx({
      p: 0,
    });
    setContainerMaxWidth(false);
  }, []);

  return (
    <Stack
      gap={2}
      sx={{
        height: '100%',
        position: 'relative',
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        p={{ xs: 2, md: 4 }}
        pb={0}
      >
        <Title subtitle="Visualize your workflow, track progress, and stay organized." />
        <KanbanAddCard />
      </Stack>
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <KanbanContainer items={initialCards} />
      </Box>
    </Stack>
  );
};

export default Kanban;

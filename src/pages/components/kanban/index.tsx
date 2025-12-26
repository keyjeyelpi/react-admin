import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import useDashboard from '@/hooks/dashboard.hook';
import KanbanContainer from './components/container.kanban';
import type { Column } from './types';
import KanbanSkeleton from './components/skeleton.kanban';

let globalKanbanData: Column[] | null = null;

const Kanban = () => {
  const [initialCards, setInitialCards] = useState<Column[]>(globalKanbanData || []);
  const { setContainerMaxWidth, setCustomDashboardSx } = useDashboard();

  const addColumn = (name: string) => {
    const newColumn: Column = {
      id: `column-${Date.now()}`,
      name,
      items: [],
    };

    globalKanbanData = [...(globalKanbanData || []), newColumn];
    setInitialCards(globalKanbanData);
  };

  useEffect(() => {
    if (!globalKanbanData)
      import('@/data/kanban.data.json').then((module) => {
        globalKanbanData = module.default as Column[];
        setInitialCards(globalKanbanData);
      });
  }, []);

  useEffect(() => {
    setContainerMaxWidth(false);
    setCustomDashboardSx({
      p: 0,
    });
  }, []);

  if (!initialCards.length) return <KanbanSkeleton />;

  return (
    <Stack
      sx={{
        height: '100%',
        position: 'relative',
      }}
    >
      <KanbanContainer items={initialCards} addColumn={addColumn} />
    </Stack>
  );
};

export default Kanban;

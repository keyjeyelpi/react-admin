import { Stack } from '@mui/material';
import Title from '../../components/title.component';
import { v4 as uuid } from 'uuid';
import KanbanContainer, { type Column } from '../../components/kanban.component';

const Kanban = () => {
  const initialCards: Column[] = [
    {
      id: uuid(),
      name: 'To Do',
      items: [{ id: uuid(), content: 'Task 1' }],
      addAction: () => {},
    },
    {
      id: uuid(),
      name: 'In Progress',
      items: [{ id: uuid(), content: 'Task 2' }],
    },
    {
      id: uuid(),
      name: 'For Review',
      items: [{ id: uuid(), content: 'Task 3' }],
    },
    {
      id: uuid(),
      name: 'Finished',
      items: [{ id: uuid(), content: 'Task 4' }],
    },
  ];

  return (
    <Stack gap={2} sx={{ height: '100%' }}>
      <Title subtitle="Visualize your workflow, track progress, and stay organized." />
      <KanbanContainer items={initialCards} />
    </Stack>
  );
};

export default Kanban;

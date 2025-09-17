import { Stack } from '@mui/material';
import Title from '../../components/title.component';
import { v4 as uuid } from 'uuid';
import KanbanContainer, { type Column } from '../../components/kanban.component';
import { faker } from '@faker-js/faker';
import { TbBook, TbDeviceGamepad, TbHeartbeat, TbAlien } from 'react-icons/tb';
import { useEffect } from 'react';
import useDashboard from '../../hooks/dashboard.hook';

const initialCards: Column[] = [
  {
    id: uuid(),
    name: 'To Do',
    items: [
      {
        id: uuid(),
        content: {
          title: faker.lorem.words(3),
          description: faker.lorem.paragraphs(2),
          category: {
            color: 'primary.main',
            label: 'Books',
            icon: <TbBook />,
          },
        },
      },
    ],
    addAction: () => {},
  },
  {
    id: uuid(),
    name: 'In Progress',
    disableAdd: true,
    items: [
      {
        id: uuid(),
        content: {
          title: faker.lorem.words(3),
          description: faker.lorem.paragraphs(2),
          category: {
            color: 'primary.main',
            label: 'Games',
            icon: <TbDeviceGamepad />,
          },
        },
      },
    ],
  },
  {
    id: uuid(),
    name: 'For Review',
    items: [
      {
        id: uuid(),
        content: {
          title: faker.lorem.words(3),
          description: faker.lorem.paragraphs(2),
          category: {
            color: 'primary.main',
            label: 'Health',
            icon: <TbHeartbeat />,
          },
        },
      },
    ],
  },
  {
    id: uuid(),
    name: 'Finished',
    items: [
      {
        id: uuid(),
        content: {
          title: faker.lorem.words(3),
          description: faker.lorem.paragraphs(2),
          category: {
            color: 'primary.main',
            label: 'Beauty',
            icon: <TbAlien />,
          },
        },
      },
    ],
  },
  {
    id: uuid(),
    name: 'For Release',
    items: [
      {
        id: uuid(),
        content: {
          title: faker.lorem.words(3),
          description: faker.lorem.paragraphs(2),
          category: {
            color: 'primary.main',
            label: 'Beauty',
            icon: <TbAlien />,
          },
        },
      },
    ],
  },
];

const Kanban = () => {
  const { setContainerMaxWidth } = useDashboard();
  useEffect(() => {
    setContainerMaxWidth(false);
  }, []);

  return (
    <Stack gap={2} sx={{ height: '100%' }}>
      <Title subtitle="Visualize your workflow, track progress, and stay organized." />
      <KanbanContainer items={initialCards} />
    </Stack>
  );
};

export default Kanban;

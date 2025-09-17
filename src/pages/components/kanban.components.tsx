import { Stack } from '@mui/material';
import Title from '../../components/title.component';
import { v4 as uuid } from 'uuid';
import KanbanContainer, { KanbanCardContent, type Column } from '../../components/kanban.component';
import { faker } from '@faker-js/faker';
import { TbLayersSelected } from 'react-icons/tb';

const Kanban = () => {
  const initialCards: Column[] = [
    {
      id: uuid(),
      name: 'To Do',
      items: [
        {
          id: uuid(),
          content: (
            <KanbanCardContent
              isLocked
              title={faker.lorem.words(3)}
              description={faker.lorem.paragraphs(2)}
              category={{
                color: 'primary.main',
                label: faker.commerce.department(),
                icon: <TbLayersSelected />,
              }}
            />
          ),
        },
      ],
      addAction: () => {},
    },
    {
      id: uuid(),
      name: 'In Progress',
      disableAdd: true,
      items: [],
    },
    {
      id: uuid(),
      name: 'For Review',
      items: [],
    },
    {
      id: uuid(),
      name: 'Finished',
      items: [],
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

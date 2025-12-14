import { faker } from '@faker-js/faker';
import { TbPlus } from 'react-icons/tb';
import { memo, useState, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { v4 as uuid } from 'uuid';
import chroma from 'chroma-js';
import { Chip, Divider, IconButton, Stack, Typography } from '@mui/material';
import type { Column, KanbanContainerProps, Task } from '../types';
import KanbanCard from './card.kanban';

// Pre-generate some fake data templates to avoid expensive faker calls during render
const generateCardContent = (): Task['content'] => ({
  title: faker.lorem.words(3),
  description: faker.lorem.paragraphs(2),
  category: {
    color: 'primary.main',
    label: faker.commerce.department(),
    icon: '',
  },
});

const KanbanContainer = ({ items }: KanbanContainerProps) => {
  const [cards, setCards] = useState<Column[]>(items);
  const [selected, setSelected] = useState<string | null>(null);

  // Memoize the addCard function to prevent recreation on every render
  const addCard = useCallback(
    (id: string) => {
      setCards((prev) =>
        prev.map((col) =>
          col.id === id
            ? {
                ...col,
                items: [
                  ...col.items,
                  {
                    id: uuid(),
                    content: generateCardContent(),
                  },
                ],
              }
            : col,
        ),
      );

      // Find the column and call addAction if it exists
      const column = items.find((col) => col.id === id);
      column?.addAction?.();
    },
    [items],
  );

  // Memoize the rendered cards to prevent unnecessary re-renders
  const renderedCards = useMemo(
    () =>
      cards.map((card, i) => (
        <div key={card.name}>
          <Stack
            id={card.id}
            flex={1}
            gap={2}
            sx={{
              p: 2,
              borderRadius: 1,
              minWidth: 350,
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography fontWeight={700}>{card.name}</Typography>
                <Chip
                  label={card.items.length}
                  size="small"
                  sx={{
                    color: 'text.primary',
                    backgroundColor: 'background.paper',
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                  }}
                />
              </Stack>
              {!card?.disableAdd && (
                <IconButton
                  onClick={() => addCard(card.id)}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                  size="small"
                >
                  <TbPlus />
                </IconButton>
              )}
            </Stack>
            <Stack gap={1}>
              {card.items.map((item) => (
                <KanbanCard
                  key={item.id}
                  item={item}
                  cards={cards}
                  setCards={setCards}
                  selected={selected === item.id}
                  setSelected={setSelected}
                />
              ))}
            </Stack>
          </Stack>
          {i !== cards.length - 1 && <Divider orientation="vertical" flexItem />}
        </div>
      )),
    [cards, selected, addCard],
  );

  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        {selected && (
          <Stack
            alignItems="center"
            justifyContent="center"
            component={motion.div}
            initial={{
              height: '100dvh',
              width: '100vw',
              zIndex: 0,
              backdropFilter: 'blur(4px)',
              opacity: 0,
              top: 0,
              left: 0,
            }}
            sx={{
              position: 'fixed',
              backgroundColor: (theme) => chroma(theme.palette.background.paper).alpha(0.4).hex(),
              borderRadius: 2,
              overflow: 'auto',
            }}
            animate={{
              zIndex: 9999,
              opacity: 1,
            }}
            exit={{
              zIndex: 0,
              opacity: 0,
            }}
            onClick={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
      <Stack flex={1} flexDirection="row" gap={2}>
        {renderedCards}
      </Stack>
    </>
  );
};

export default memo(KanbanContainer);

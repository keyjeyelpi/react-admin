import { Card, Chip, Divider, IconButton, Stack, Typography } from '@mui/material';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import { v4 as uuid } from 'uuid';
import { TbPlus } from 'react-icons/tb';

interface Task {
  id: string;
  content: string;
  status?: string;
}

export interface Column {
  id: string;
  name: string;
  items: Task[];
  addAction?: () => void;
}

const KanbanCard = ({
  item,
  cards,
  setCards,
}: {
  item: Task;
  cards: Column[];
  setCards: Dispatch<SetStateAction<Column[]>>;
}) => {
  const handleDragEnd = (info: PanInfo, taskId: string) => {
    const { x, y } = info.point;

    // find which column was hit
    const targetColumn = cards.find((col) => {
      const el = document.getElementById(col.id);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    });

    if (!targetColumn) return;

    setCards((prev) => {
      let newCards = [...prev];
      let draggedTask: Task | undefined;

      // remove from old column
      newCards = newCards.map((col) => {
        const idx = col.items.findIndex((i) => i.id === taskId);
        if (idx !== -1) {
          draggedTask = col.items[idx];
          col.items.splice(idx, 1);
        }
        return col;
      });

      // add to new column
      newCards = newCards.map((col) => {
        if (col.id === targetColumn.id && draggedTask) {
          const updatedTask: Task = {
            ...draggedTask,
            status: col.name.toLowerCase(), // update status
          };
          col.items.push(updatedTask);
        }
        return col;
      });

      return [...newCards];
    });
  };

  return (
    <Card
      key={item.id}
      elevation={0}
      component={motion.div}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      drag
      dragSnapToOrigin
      onDragEnd={(_, info) => handleDragEnd(info, item.id)}
      sx={{
        bgcolor: 'background.default',
        borderRadius: 1,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        '&:hover': {
          cursor: 'grab',
        },
        '&:active': { cursor: 'grabbing' },
      }}
    >
      {item.content}
    </Card>
  );
};

const KanbanContainer = ({ items }: { items: Column[] }) => {
  const [cards, setCards] = useState<Column[]>(items);

  const addCard = (id: string) => {
    setCards((prev) =>
      prev.map((col) =>
        col.id === id
          ? { ...col, items: [...col.items, { id: uuid(), content: 'New Task' }] }
          : col,
      ),
    );

    items.find((col) => col.id === id)?.addAction?.();
  };

  return (
    <Stack flex={1} flexDirection="row" gap={2}>
      {cards.map((card, i) => (
        <>
          <Stack
            key={card.name}
            id={card.id}
            flex={1}
            gap={2}
            sx={{
              p: 2,
              borderRadius: 1,
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
            </Stack>
            <Stack gap={1}>
              {card.items.map((item) => (
                <KanbanCard key={item.id} item={item} cards={cards} setCards={setCards} />
              ))}
            </Stack>
          </Stack>
          {i !== cards.length - 1 && <Divider orientation="vertical" flexItem />}
        </>
      ))}
    </Stack>
  );
};

export default KanbanContainer;

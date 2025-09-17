import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  Collapse,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import chroma from 'chroma-js';
import { motion, type PanInfo } from 'framer-motion';
import { cloneElement, useState, type Dispatch, type JSX, type SetStateAction } from 'react';
import { v4 as uuid } from 'uuid';
import { TbLayersSelected, TbLock, TbPlus } from 'react-icons/tb';
import { faker } from '@faker-js/faker';

interface Task {
  id: string;
  content: JSX.Element;
  status?: string;
}

export interface Column {
  id: string;
  name: string;
  items: Task[];
  addAction?: () => void;
}

export const KanbanCardContent = ({
  isLocked,
  category,
  title,
  description,
}: {
  isLocked?: boolean;
  category?: {
    color?: string;
    label?: string;
    icon?: JSX.Element;
  };
  title?: string;
  description?: string;
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <Stack gap={1} sx={{ p: 2 }}>
      {isLocked && (
        <Alert severity="error" icon={<TbLock />}>
          The item cannot be edited.
        </Alert>
      )}
      {category && (
        <Stack direction="row" justifyContent="flex-start" gap={1} alignItems="center">
          <Stack justifyContent="center" alignItems="center" sx={{ color: 'primary.main' }}>
            {cloneElement(category?.icon || <TbLayersSelected />, { size: 24 })}
          </Stack>
          <Typography variant="caption">{category?.label || 'Category'}</Typography>
        </Stack>
      )}
      <Typography fontWeight={600}>{title || 'Task Title'}</Typography>
      <Box sx={{ position: 'relative' }}>
        <Box
          component={motion.div}
          initial={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
          }}
          animate={{ height: showMore ? 0 : 64 }}
          sx={{
            background: (theme) =>
              `linear-gradient(to top, ${theme.palette.background.paper} 0%, ${chroma(theme.palette.background.paper).alpha(0).hex()} 100%)`,
            zIndex: 1,
          }}
        />
        <Collapse in={showMore} collapsedSize={64}>
          <Typography variant="body2">{description || 'Lorem Ipsum'}</Typography>
        </Collapse>
      </Box>
      <Button size="small" onClick={() => setShowMore((prev) => !prev)} sx={{ mt: 1 }}>
        {showMore ? 'Show Less' : 'Show More'}
      </Button>
    </Stack>
  );
};

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
          ? {
              ...col,
              items: [
                ...col.items,
                {
                  id: uuid(),
                  content: (
                    <KanbanCardContent
                      category={{
                        color: 'primary.main',
                        label: faker.commerce.department(),
                        icon: <TbLayersSelected />,
                      }}
                      title={faker.lorem.words(3)}
                      description={faker.lorem.paragraphs(2)}
                    />
                  ),
                },
              ],
            }
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

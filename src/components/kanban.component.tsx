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
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { cloneElement, useState, type Dispatch, type JSX, type SetStateAction } from 'react';
import { v4 as uuid } from 'uuid';
import { TbLayersSelected, TbLock, TbPlus } from 'react-icons/tb';
import { faker } from '@faker-js/faker';

interface Task {
  id: string;
  content: {
    title: string;
    description: string;
    category?: {
      color?: string;
      label?: string;
      icon?: JSX.Element;
    };
  };
  status?: string;
}

export interface Column {
  id: string;
  name: string;
  items: Task[];
  disableAdd?: boolean;
  addAction?: () => void;
}

export const KanbanCardContent = ({
  id,
  isLocked,
  category,
  title,
  description,
  selected,
  setSelected,
}: {
  id?: string;
  isLocked?: boolean;
  category?: {
    color?: string;
    label?: string;
    icon?: JSX.Element;
  };
  title?: string;
  description?: string;
  selected?: boolean;
  setSelected?: () => void;
}) => {
  return (
    <Stack justifyContent="space-between" alignItems="stretch" sx={{ height: '100%' }}>
      <Stack gap={1} sx={{ p: 2 }}>
        {category && (
          <Stack direction="row" justifyContent="flex-start" gap={1} alignItems="center">
            <Stack
              component={motion.div}
              layoutId={(id || '') + 'icon' + (category?.label || '') + (title || '')}
              justifyContent="center"
              alignItems="center"
              sx={{ color: 'primary.main' }}
            >
              {cloneElement(category?.icon || <TbLayersSelected />, { size: 24 })}
            </Stack>
            <Typography
              component={motion.span}
              layoutId={(id || '') + category?.label}
              variant="caption"
            >
              {category?.label || 'Category'}
            </Typography>
          </Stack>
        )}
        {isLocked && (
          <Alert severity="error" component={motion.div} icon={<TbLock />}>
            The item cannot be edited.
          </Alert>
        )}
        <Typography fontWeight={600} component={motion.div} layoutId={(id || '') + title}>
          {title || 'Task Title'}
        </Typography>
        <Box sx={{ position: 'relative' }}>
          <Box
            component={motion.div}
            initial={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: 64,
            }}
            animate={{ height: selected ? 0 : 64 }}
            sx={{
              background: (theme) =>
                `linear-gradient(to top, ${theme.palette.background.paper} 0%, ${chroma(theme.palette.background.paper).alpha(0).hex()} 100%)`,
              zIndex: 1,
            }}
          />
          <Collapse in={!!selected} collapsedSize={64}>
            <Typography variant="body2" component={motion.div} layoutId={(id || '') + description}>
              {description || 'Lorem Ipsum'}
            </Typography>
          </Collapse>
        </Box>
      </Stack>
      <Box>
        <Divider />
        {!selected ? (
          <Button size="small" onClick={setSelected} fullWidth>
            Show More
          </Button>
        ) : (
          <Stack>
            <Button size="small" fullWidth>
              Show More
            </Button>
          </Stack>
        )}
      </Box>
    </Stack>
  );
};

const KanbanCard = ({
  item,
  cards,
  setCards,
  selected,
  setSelected,
}: {
  item: Task;
  cards: Column[];
  setCards: Dispatch<SetStateAction<Column[]>>;
  selected?: boolean;
  setSelected?: Dispatch<SetStateAction<string | null>>;
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
      elevation={0}
      layoutId={item.id}
      component={motion.div}
      whileHover={!!selected ? {} : { scale: 1.02 }}
      whileTap={!!selected ? {} : { scale: 0.98 }}
      drag={!selected}
      dragSnapToOrigin
      onDragEnd={(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) =>
        handleDragEnd(info, item.id)
      }
      whileDrag={!!selected ? {} : { zIndex: 2 }}
      sx={[
        {
          bgcolor: 'background.default',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: 'auto',
          borderRadius: 1,
          border: (theme) => `1px solid ${theme.palette.divider}`,
        },
        !selected && {
          '&:hover': {
            cursor: 'grab',
          },
          '&:active': { cursor: 'grabbing' },
        },
        !!selected && {
          position: 'fixed',
          width: 600,
          maxWidth: "90vw",
          height: 500,
          maxHeight: "90dvh",
          zIndex: 9999,
        },
      ]}
    >
      <KanbanCardContent
        {...item.content}
        {...{ selected, setSelected: () => setSelected?.(item.id), id: item.id }}
      />
    </Card>
  );
};

const KanbanContainer = ({ items }: { items: Column[] }) => {
  const [cards, setCards] = useState<Column[]>(items);
  const [selected, setSelected] = useState<string | null>(null);

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
                  content: {
                    title: faker.lorem.words(3),
                    description: faker.lorem.paragraphs(2),
                    category: {
                      color: 'primary.main',
                      label: faker.commerce.department(),
                      icon: <TbLayersSelected />,
                    },
                  },
                },
              ],
            }
          : col,
      ),
    );

    items.find((col) => col.id === id)?.addAction?.();
  };

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
          </>
        ))}
      </Stack>
    </>
  );
};

export default KanbanContainer;

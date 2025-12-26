import { memo, useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import chroma from 'chroma-js';
import Title from '@/components/title.component';
import { Chip, Divider, Stack, Typography, Box } from '@mui/material';
import type { Column, DragState, KanbanContainerProps } from '../types';
import KanbanCard from './card.kanban';
import KanbanAddColumn from '../kanban-add/add-column.kanban';
import KanbanAddCard from '../kanban-add/add-card.kanban';

const KanbanContainer = ({ items, addColumn }: KanbanContainerProps) => {
  const [cards, setCards] = useState<Column[]>(items);
  const [selected, setSelected] = useState<string | null>(null);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    position: null,
  });

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
              {!card?.disableAdd && <KanbanAddCard card={card} setCards={setCards} />}
            </Stack>
            <Stack gap={1}>
              {card.items.map((item, itemIndex) => (
                <div key={item.id}>
                  {/* Show gap placeholder before this card if dragging */}
                  {dragState.isDragging &&
                    dragState.position?.columnId === card.id &&
                    dragState.position?.columnId !== dragState.originalColumnId &&
                    dragState.position.insertIndex === itemIndex && (
                      <Box
                        sx={{
                          height: 8,
                          bgcolor: 'primary.main',
                          borderRadius: 1,
                          opacity: 0.3,
                          mb: 1,
                          transition: 'all 0.2s ease',
                        }}
                      />
                    )}
                  <KanbanCard
                    item={item}
                    cards={cards}
                    setCards={setCards}
                    selected={selected === item.id}
                    setSelected={setSelected}
                    onDragStateChange={setDragState}
                  />
                </div>
              ))}
              <AnimatePresence>
                {dragState.isDragging &&
                  dragState.position?.columnId === card.id &&
                  dragState.position?.columnId !== dragState.originalColumnId &&
                  dragState.position.insertIndex === card.items.length && (
                    <Box
                      component={motion.div}
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: 211.14,
                        opacity: 0.3,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      sx={{
                        bgcolor: 'primary.main',
                        borderRadius: 1,
                        mt: 1,
                      }}
                    />
                  )}
              </AnimatePresence>
            </Stack>
          </Stack>
          {i !== cards.length - 1 && <Divider orientation="vertical" flexItem />}
        </div>
      )),
    [cards, selected, dragState],
  );

  return (
    <>
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
        <Title
          title="Kanban"
          subtitle="Visualize your workflow, track progress, and stay organized."
        />
        <KanbanAddColumn addColumn={addColumn} />
      </Stack>
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
      <Stack
        flex={1}
        flexDirection="row"
        gap={2}
        sx={{
          overflowX: 'auto',
        }}
      >
        {renderedCards}
      </Stack>
    </>
  );
};

export default memo(KanbanContainer);

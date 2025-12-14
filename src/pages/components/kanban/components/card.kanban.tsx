import { memo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@mui/material';
import type { Task, PanInfo, KanbanCardProps } from '../types';
import KanbanCardContent from './card-content.kanban';

const KanbanCard = ({ item, cards, setCards, selected, setSelected }: KanbanCardProps) => {
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
      whileHover={
        selected
          ? {}
          : {
              scale: 1.02,
            }
      }
      whileTap={
        selected
          ? {}
          : {
              scale: 0.98,
            }
      }
      drag={!selected}
      dragSnapToOrigin
      onDragEnd={(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) =>
        handleDragEnd(info, item.id)
      }
      whileDrag={
        selected
          ? {}
          : {
              zIndex: 2,
            }
      }
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
          ...(!selected && {
            '&:hover': {
              cursor: 'grab',
            },
            '&:active': {
              cursor: 'grabbing',
            },
          }),
          ...(selected && {
            position: 'fixed',
            width: 600,
            maxWidth: '90vw',
            height: 'fit-content',
            maxHeight: '90dvh',
            overflowY: 'auto',
            zIndex: 9999,
          }),
        },
      ]}
    >
      <KanbanCardContent
        {...item.content}
        {...{
          selected,
          setSelected: () => setSelected?.(item.id),
          id: item.id,
        }}
      />
    </Card>
  );
};

export default memo(KanbanCard);

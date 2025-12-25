import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@mui/material';
import type { Task, PanInfo, KanbanCardProps } from '../types';
import KanbanCardContent from './card-content.kanban';

const KanbanCard = ({
  item,
  cards,
  setCards,
  selected,
  setSelected,
  onDragStateChange,
}: KanbanCardProps & {
  onDragStateChange?: (state: {
    isDragging: boolean;
    position: {
      columnId: string;
      insertIndex: number;
    } | null;
    originalColumnId?: string;
  }) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const handleDragStart = () => {
    setIsDragging(true);
    const originalColumn = cards.find((col) => col.items.some((i) => i.id === item.id));
    onDragStateChange?.({
      isDragging: true,
      position: null,
      originalColumnId: originalColumn?.id,
    });
  };

  const handleDrag = (info: PanInfo) => {
    if (!isDragging) return;

    const { x, y } = info.point;

    // Find which column the card is currently over
    const targetColumn = cards.find((col) => {
      const el = document.getElementById(col.id);

      if (!el) return false;

      const rect = el.getBoundingClientRect();

      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    });

    if (!targetColumn) {
      onDragStateChange?.({
        isDragging: true,
        position: null,
      });
      return;
    }

    // Calculate insertion position within the target column
    const targetColumnElement = document.getElementById(targetColumn.id);
    let insertIndex = targetColumn.items.length;

    if (targetColumnElement) {
      const cardElements = targetColumnElement.querySelectorAll('[data-card-id]');
      let closestCardId: string | null = null;
      let minDistance = Infinity;

      // Find the closest card in the target column
      for (const cardEl of cardElements) {
        const rect = cardEl.getBoundingClientRect();
        const cardCenterY = rect.top + rect.height / 2;
        const distance = Math.abs(y - cardCenterY);

        if (distance < minDistance) {
          minDistance = distance;
          closestCardId = cardEl.getAttribute('data-card-id');
        }
      }

      // Determine insertion position
      if (closestCardId) {
        const closestCardIndex = targetColumn.items.findIndex((item) => item.id === closestCardId);
        const closestCardElement = targetColumnElement.querySelector(
          `[data-card-id="${closestCardId}"]`,
        );

        if (closestCardElement) {
          const rect = closestCardElement.getBoundingClientRect();
          const cardCenterY = rect.top + rect.height / 2;

          insertIndex = y < cardCenterY ? closestCardIndex : closestCardIndex + 1;
        }
      }
    }

    const newPosition = {
      columnId: targetColumn.id,
      insertIndex,
    };
    onDragStateChange?.({
      isDragging: true,
      position: newPosition,
    });
  };

  const handleDragEnd = (info: PanInfo, taskId: string) => {
    setIsDragging(false);
    onDragStateChange?.({
      isDragging: false,
      position: null,
      originalColumnId: undefined,
    });

    const { x, y } = info.point;

    // find which column was hit
    const targetColumn = cards.find((col) => {
      const el = document.getElementById(col.id);

      if (!el) return false;

      const rect = el.getBoundingClientRect();

      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    });

    if (!targetColumn) return;

    // Find the insertion position within the target column
    const targetColumnElement = document.getElementById(targetColumn.id);
    let insertIndex = targetColumn.items.length;

    // Default to end
    if (targetColumnElement) {
      const cardElements = targetColumnElement.querySelectorAll('[data-card-id]');
      let closestCardId: string | null = null;
      let minDistance = Infinity;

      // Find the closest card in the target column
      for (const cardEl of cardElements) {
        const rect = cardEl.getBoundingClientRect();
        const cardCenterY = rect.top + rect.height / 2;
        const distance = Math.abs(y - cardCenterY);

        if (distance < minDistance) {
          minDistance = distance;
          closestCardId = cardEl.getAttribute('data-card-id');
        }
      }

      // Determine if we should insert before or after the closest card
      if (closestCardId) {
        const closestCardIndex = targetColumn.items.findIndex((item) => item.id === closestCardId);
        const closestCardElement = targetColumnElement.querySelector(
          `[data-card-id="${closestCardId}"]`,
        );

        if (closestCardElement) {
          const rect = closestCardElement.getBoundingClientRect();
          const cardCenterY = rect.top + rect.height / 2;

          // If dragged above the center of the closest card, insert before it
          // If dragged below the center, insert after it
          insertIndex = y < cardCenterY ? closestCardIndex : closestCardIndex + 1;
        }
      }
    }

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

      // add to new column at the correct position
      newCards = newCards.map((col) => {
        if (col.id === targetColumn.id && draggedTask) {
          const updatedTask: Task = {
            ...draggedTask,
            status: col.name.toLowerCase(), // update status
          };

          col.items.splice(insertIndex, 0, updatedTask);
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
      onDragStart={handleDragStart}
      onDrag={(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => handleDrag(info)}
      onDragEnd={(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) =>
        handleDragEnd(info, item.id)
      }
      whileDrag={
        selected
          ? {}
          : {
              zIndex: 100000,
              position: 'relative',
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

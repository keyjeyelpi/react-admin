import { type ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { useMeasurePosition } from './useMeasurePosition';
import { Box, Card, Stack, type SxProps } from '@mui/material';
import { useBreakpoint } from '../../theme';

export interface CardProps {
  id: string;
  content: ReactNode;
  column:
    | number
    | {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
      };
  row:
    | number
    | {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
      };
}

interface DraggableCardProps {
  i: number;
  card: CardProps;
  updatePosition: (
    index: number,
    pos: { top: number; left: number; column: number; row: number },
  ) => void;
  updateOrder: (index: number, xOffset: number, yOffset: number) => void;
  padding?: number;
  turnDragOff?: boolean;
  cardSx?: SxProps;
  onClick?: () => void;
  outlined?: boolean;
  backgroundColor?: string;
}

export const DraggableCardContainer = ({
  row = 4,
  column = 4,
  gap = 2,
  children,
  customGridTemplateColumns,
  customGridTemplateRows,
  flex,
}: {
  row: number;
  column: number;
  children: ReactNode;
  gap?: number;
  customGridTemplateColumns?: string;
  customGridTemplateRows?: string;
  flex?: number;
}) => {
  return (
    <Box
      flex={flex}
      sx={{
        height: flex ? undefined : '100%',
        width: flex ? undefined : '100%',
        gridTemplateColumns: `repeat(${column}, ${customGridTemplateColumns || '1fr'})`,
        gridTemplateRows: `repeat(${row}, ${customGridTemplateRows || '1fr'})`,
        gap,
      }}
      display="grid"
    >
      {children}
    </Box>
  );
};

const DraggableCard = ({
  i,
  card,
  updatePosition,
  updateOrder,
  padding,
  turnDragOff,
  cardSx,
  onClick,
  outlined,
  backgroundColor,
}: DraggableCardProps) => {
  const [isDragging, setDragging] = useState(false);

  const { getResponsiveValue, breakpoint } = useBreakpoint();
  const ref = useMeasurePosition((pos) => updatePosition(i, pos));

  const columnValue =
    typeof card?.column === 'number'
      ? card?.column
      : getResponsiveValue(card?.column, breakpoint) || 1;
  const rowValue =
    typeof card?.column === 'number' ? card?.row : getResponsiveValue(card?.row, breakpoint) || 1;

  return (
    <Card
      component={motion.div}
      ref={ref as any}
      layout
      initial={false}
      sx={{
        position: 'relative',
        zIndex: isDragging ? 3 : 1,
        backgroundColor: backgroundColor || 'background.default',
        p: padding || 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: outlined ? (theme) => `1px solid ${theme.palette.divider}` : 'none',
        ...cardSx,
      }}
      onClick={onClick}
      animate={{
        gridColumn: `span ${columnValue}`,
        gridRow: `span ${rowValue}`,
      }}
      elevation={0}
      drag={!turnDragOff}
      dragSnapToOrigin
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onUpdate={({ x, y }) => {
        isDragging && updateOrder(i, Number(x), Number(y));
      }}
      whileHover={{
        zIndex: 100,
      }}
    >
      <Stack sx={{ height: '100%', width: '100%' }} justifyContent="center">
        {card.content}
      </Stack>
    </Card>
  );
};

export default DraggableCard;

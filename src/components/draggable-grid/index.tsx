import { type ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { useMeasurePosition } from './useMeasurePosition';
import { Grid, type SxProps } from '@mui/material';
import { useBreakpoint } from '../../theme';

export interface GridProps {
  id: string;
  children: ReactNode;
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
  turnDragOff?: boolean;
}

interface DraggableGridProps {
  i: number;
  id: string;
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
  children: GridProps | ReactNode;
  updatePosition: (
    index: number,
    pos: { top: number; left: number; column: number; row: number },
  ) => void;
  updateOrder: (index: number, xOffset: number, yOffset: number) => void;
  padding?: number;
  turnDragOff?: boolean;
  sx?: SxProps;
  onClick?: () => void;
  outlined?: boolean;
  backgroundColor?: string;
}

export const DraggableGridContainer = ({
  row = 4,
  column = 4,
  gap = 2,
  children,
  customGridTemplateColumns,
  customGridTemplateRows,
  flex,
}: {
  row?: number;
  column?: number;
  children: ReactNode;
  gap?: number;
  customGridTemplateColumns?: string;
  customGridTemplateRows?: string;
  flex?: number;
}) => {
  return (
    <Grid
      gap={gap}
      gridTemplateRows={`repeat(${column}, ${customGridTemplateColumns || '1fr'})`}
      gridTemplateColumns={`repeat(${row}, ${customGridTemplateRows || '1fr'})`}
      height={!flex ? '100%' : undefined}
      width={!flex ? '100%' : undefined}
      flex={flex}
      display="grid"
    >
      {children}
    </Grid>
  );
};

const DraggableGrid = ({
  i,
  updatePosition,
  updateOrder,
  padding,
  turnDragOff,
  sx,
  onClick,
  outlined,
  backgroundColor,
  children,
  column,
  row,
}: DraggableGridProps) => {
  const [isDragging, setDragging] = useState(false);

  const { getResponsiveValue, breakpoint } = useBreakpoint();
  const ref = useMeasurePosition((pos) => updatePosition(i, pos));

  const columnValue =
    typeof column === 'number' ? column : getResponsiveValue(column, breakpoint) || 1;
  const rowValue = typeof row === 'number' ? row : getResponsiveValue(row, breakpoint) || 1;

  return (
    <Grid
      component={motion.div}
      ref={ref as any}
      layout
      initial={false}
      position="relative"
      zIndex={isDragging ? 3 : 1}
      bgcolor={backgroundColor || 'background.default'}
      padding={padding}
      display="flex"
      flexDirection="column"
      overflow="hidden"
      border={outlined ? (theme) => `1px solid ${theme.palette.divider}` : 'none'}
      sx={sx}
      onClick={onClick}
      animate={{
        gridColumn: `span ${columnValue}`,
        gridRow: `span ${rowValue}`,
      }}
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
      {typeof children === 'object' && children !== null && 'children' in children
        ? children.children
        : children}
    </Grid>
  );
};

export default DraggableGrid;

import { ReactNode, MouseEventHandler } from 'react';
import { SxProps, Theme } from '@mui/material';

export type ResponsiveValue<T> = T | Partial<Record<'xl' | 'lg' | 'md' | 'sm' | 'xs', T>>;

export type Position = {
  row: number;
  column: number;
  top: number;
  left: number;
};

export interface GridProps {
  id: string;
  children: ReactNode;
  column: ResponsiveValue<number>;
  row: ResponsiveValue<number>;
  turnDragOff?: boolean;
}

export interface DraggableGridProps {
  i: number;
  column: ResponsiveValue<number>;
  row: ResponsiveValue<number>;
  children: ReactNode;
  updatePosition: (i: number, pos: Position) => void;
  updateOrder: (i: number, x: number, y: number) => void;
  padding?: any;
  turnDragOff?: boolean;
  sx?: SxProps<Theme>;
  onClick?: MouseEventHandler<HTMLDivElement>;
  outlined?: boolean;
  backgroundColor?: string;
}

export interface DraggableGridContainerProps {
  row?: number;
  column?: number;
  children: ReactNode;
  gap?: number;
  customGridTemplateColumns?: string;
  customGridTemplateRows?: string;
  flex?: number;
}

declare const DraggableGrid: React.FC<DraggableGridProps>;
export const DraggableGridContainer: React.FC<DraggableGridContainerProps>;
export default DraggableGrid;

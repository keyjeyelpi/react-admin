import { JSX } from 'react';
import type { PanInfo } from 'framer-motion';

export type PanInfo = PanInfo;

export interface Task {
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

export interface KanbanCardContentProps {
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
}

export interface KanbanContainerProps {
  items: Column[];
}

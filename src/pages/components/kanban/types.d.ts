import { JSX, Dispatch, SetStateAction } from 'react';
import type { PanInfo } from 'framer-motion';

export { JSX, Dispatch, SetStateAction, PanInfo };

interface Category {
  color?: string;
  label?: string;
  icon?: string;
}

interface Comment {
  id: string;
  text: string;
  avatar?: string;
  author: string;
  date: string;
  replies?: Comment[];
}

export interface Task {
  id: string;
  content: {
    title: string;
    description: string;
    category?: Category;
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

export interface KanbanCardProps {
  item: Task;
  cards: Column[];
  setCards: Dispatch<SetStateAction<Column[]>>;
  selected?: boolean;
  setSelected?: Dispatch<SetStateAction<string | null>>;
}

export interface KanbanCardContentProps {
  id?: string;
  isLocked?: boolean;
  category?: Category;
  title?: string;
  description?: string;
  likes?: number;
  comments?: Comment[];
  selected?: boolean;
  setSelected?: () => void;
  cards?: Column[];
  setCards?: (cards: Column[]) => void;
}

export interface KanbanContainerProps {
  items: Column[];
}

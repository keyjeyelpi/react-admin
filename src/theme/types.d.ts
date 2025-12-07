import type { Theme } from '@mui/material';

declare module '@mui/material/IconButton' {
  interface IconButtonOwnProps {
    variant?: 'standard' | 'contained' | 'outlined';
  }
}

export type Theme = Theme;
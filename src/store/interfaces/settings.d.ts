import type { SxProps } from '@mui/material';

export { SxProps };

// SETTINGS INTERFACES
export interface iSettingsState {
  dashboard: iDashboard;
  theme: iTheme;
}

// DASHBOARD LAYOUT INTERFACES
interface iDashboard {
  loading: boolean;
  collapsed: boolean;
  containerMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | false;
  customSx?: SxProps;
}

// THEME INTERFACES
interface iTheme {
  mode: 'light' | 'dark' | 'system';
  resolvedMode: 'light' | 'dark';
  colors: iThemeColors;
  fonts: iThemeFonts;
}

interface iThemeColors {
  primary: string;
  secondary: string;
}

interface iThemeFonts {
  primary: string;
  secondary: string;
}

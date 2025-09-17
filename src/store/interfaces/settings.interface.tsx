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
}

// THEME INTERFACES
interface iTheme {
  mode: "light" | "dark" | "system";
  resolvedMode: "light" | "dark";
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

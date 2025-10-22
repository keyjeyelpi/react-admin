export interface iSettingsState {
  theme: 
}

export interface iThemeSettings {
  mode: 'light' | 'dark' | 'system';
  resolvedMode: 'light' | 'dark';
  colors: iColorPalette;
  font: string;
}

export interface iColorPalette {
    primary: string;
    secondary: string;
}
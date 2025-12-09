import { createSlice } from '@reduxjs/toolkit';
import type { iSettingsState } from '@/store/interfaces/settings';

const initialState: iSettingsState = {
  dashboard: {
    loading: false,
    collapsed: false,
    containerMaxWidth: 'xl',
  },
  theme: {
    mode: 'system',
    resolvedMode: 'light',
    colors: {
      primary: '#1E88E5',
      secondary: '#F4511E',
    },
    fonts: {
      primary: 'sans-serif',
      secondary: 'serif',
    },
  },
};

export const SettingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // THEME
    setThemeMode: (state, action) => {
      state.theme.mode = action.payload;
    },
    setResolvedThemeMode: (state, action) => {
      state.theme.resolvedMode = action.payload;
    },
    setPrimaryColor: (state, action) => {
      state.theme.colors.primary = action.payload;
    },
    setSecondaryColor: (state, action) => {
      state.theme.colors.secondary = action.payload;
    },
    setPrimaryFont: (state, action) => {
      state.theme.fonts.primary = action.payload;
    },
    setSecondaryFont: (state, action) => {
      state.theme.fonts.secondary = action.payload;
    },
    // DASHBOARD
    setDashboardCollapsed: (state, action) => {
      state.dashboard.collapsed = action.payload;
    },
    setDashboardLoading: (state, action) => {
      state.dashboard.loading = action.payload;
    },
    setDashboardContainerMaxWidth: (state, action) => {
      state.dashboard.containerMaxWidth = action.payload;
    },
    setDashboardCustomSx: (state, action) => {
      state.dashboard.customSx = action.payload;
    },
  },
});

export default SettingsSlice.reducer;

export const {
  setThemeMode,
  setResolvedThemeMode,
  setPrimaryColor,
  setSecondaryColor,
  setPrimaryFont,
  setSecondaryFont,
  setDashboardLoading,
  setDashboardCollapsed,
  setDashboardContainerMaxWidth,
  setDashboardCustomSx,
} = SettingsSlice.actions;

import { useRoutes } from 'react-router-dom';
import { Suspense } from 'react';
import { CssBaseline, LinearProgress, ThemeProvider } from '@mui/material';

import theme from './theme';
import routes from './routes';

const App = () => {
  const appRoutes = useRoutes(routes);

  return (
    <ThemeProvider theme={theme()}>
      <CssBaseline />
      <Suspense fallback={<LinearProgress />}>{appRoutes}</Suspense>
    </ThemeProvider>
  );
};

export default App;

import { Box, Stack, LinearProgress, Collapse, Container } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { Suspense, useLayoutEffect } from 'react';

import useDashboard from '../../hooks/dashboard.hook';
import { useAppSelector } from '../../store';
import DashboardLayoutSidebar from './sidebar.dashboard';
import DashboardLayoutHeader from './header.dashboard';
import { AnimatePresence, motion } from 'framer-motion';

const DashboardLayout = () => {
  const { loading } = useDashboard();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);

  useLayoutEffect(() => {
    if (user?.id) return;

    navigate('/authenticate');
  }, [user?.id]);

  if (!user?.id) return <LinearProgress />;

  return (
    <Stack
      flexDirection={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{ minHeight: '100vh' }}
    >
      <DashboardLayoutSidebar />
      <Stack flex={1}>
        <DashboardLayoutHeader />
        <Stack
          component="main"
          sx={{
            flex: 1,
            bgcolor: 'background.50',
            maxHeight: 'calc(100dvh - 64px)',
            overflowY: 'auto',
          }}
        >
          <Collapse in={loading}>
            <LinearProgress />
          </Collapse>
          <Suspense fallback={<LinearProgress />}>
            <Container maxWidth="xl" sx={{ height: '100%' }}>
              <AnimatePresence mode="wait" initial={true}>
                <Box
                  component={motion.div}
                  key={location.pathname}
                  initial={{
                    filter: 'blur(16px)',
                  }}
                  animate={{
                    filter: 'blur(0px)',
                  }}
                  exit={{
                    filter: 'blur(16px)',
                  }}
                  sx={{ py: 4, height: '100%' }}
                >
                  <Outlet />
                </Box>
              </AnimatePresence>
            </Container>
          </Suspense>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DashboardLayout;

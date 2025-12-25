import { Box, Stack, LinearProgress, Collapse, Container } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Suspense, useLayoutEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useDashboard from '@/hooks/dashboard.hook';
import { useAppSelector } from '@/store';
import DashboardLayoutSidebar from './sidebar';
import DashboardLayoutHeader from './header.dashboard';

const DashboardLayout = () => {
  const { loading, containerMaxWidth, sx, setContainerMaxWidth, setCustomDashboardSx } =
    useDashboard();

  const navigate = useNavigate();
  const location = useLocation();

  const user = useAppSelector((state) => state.user);

  useLayoutEffect(() => {
    if (location.pathname.includes('/components/kanban')) return;
    setContainerMaxWidth('xl');
    setCustomDashboardSx({});
  }, [location.pathname]);

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
      sx={{
        minHeight: '100vh',
      }}
    >
      <DashboardLayoutSidebar />
      <Stack
        flex={1}
        sx={{
          overflowX: 'auto',
        }}
      >
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
            <Container
              maxWidth={containerMaxWidth}
              sx={{
                px: '0px !important',
                height: '100%',
              }}
            >
              <AnimatePresence mode="wait" initial>
                <Box
                  component={motion.div}
                  key={location.pathname}
                  sx={{
                    p: 4,
                    height: '100%',
                    ...sx,
                  }}
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

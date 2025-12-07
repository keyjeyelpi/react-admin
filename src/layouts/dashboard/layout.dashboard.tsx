import { Box, Stack, LinearProgress, Collapse, Container } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { Suspense, useLayoutEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useDashboard from '../../hooks/dashboard.hook';
import { useAppSelector } from '../../store';
import DashboardLayoutSidebar from './sidebar.dashboard';
import DashboardLayoutHeader from './header.dashboard';

const DashboardLayout = () => {
  const { loading, containerMaxWidth, setContainerMaxWidth } = useDashboard();

  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);

  useLayoutEffect(() => {
    setContainerMaxWidth('xl');
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
                height: '100%',
              }}
            >
              <AnimatePresence mode="wait" initial>
                <Box
                  component={motion.div}
                  key={location.pathname}
                  initial={{
                    opacity: 0,
                    x: '100dvw',
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: '-100dvw',
                  }}
                  sx={{
                    py: 4,
                    height: '100%',
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

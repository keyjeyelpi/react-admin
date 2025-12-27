import { Box, Collapse, Stack, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from '@/components/tabs.component';
import { useAppSelector } from '@/store';
import Login from './components/login.authenticate';
import Register from './components/register.authenticate';

const Authenticate = () => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const tabs = [
    {
      title: 'Login',
      content: <Login />,
    },
    {
      title: 'Register',
      content: <Register />,
    },
  ];

  const [selectedTab, setSelectedTab] = useState(tabs[0]?.title);

  useLayoutEffect(() => {
    if (!user?.id) return;

    navigate('/');
  }, [user]);

  return (
    <Stack gap={2} alignItems="center" justifyContent="center">
      <Stack alignItems="center" justifyContent="center">
        <Collapse in={selectedTab === tabs[0]?.title}>
          <Typography variant="h5" fontWeight={700} textAlign="center">
            Welcome Back!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please login to your account
          </Typography>
        </Collapse>
        <Collapse in={selectedTab === tabs[1]?.title}>
          <Typography variant="h5" fontWeight={700} textAlign="center">
            Welcome!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please register to continue
          </Typography>
        </Collapse>
      </Stack>
      <Stack gap={2} alignItems="center">
        <Tabs
          tabs={tabs.map(({ title }) => title)}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <AnimatePresence mode="wait">
          {tabs.map(({ title, content }) => {
            return (
              title === selectedTab && (
                <Box
                  component={motion.div}
                  key={title}
                  initial={{
                    filter: 'blur(16px)',
                    height: 0,
                  }}
                  animate={{
                    filter: 'blur(0px)',
                    height: 'auto',
                  }}
                  exit={{
                    filter: 'blur(16px)',
                    height: 0,
                  }}
                >
                  {content}
                </Box>
              )
            );
          })}
        </AnimatePresence>
      </Stack>
    </Stack>
  );
};

export default Authenticate;

import { Card, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import BlurredContainer from '@/components/blurred-container.component';
import Logo from '@/components/logo.component';

const AuthenticationLayout = () => {
  return (
    <BlurredContainer
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: {
          xs: 'flex-end',
          md: 'center',
        },
        height: '100dvh',
        width: '100vw',
      }}
    >
      <Stack
        alignItems="center"
        sx={{
          minWidth: {
            xs: '100%',
            md: 500,
          },
          zIndex: 1,
        }}
      >
        <Card
          sx={{
            borderRadius: 2,
            backgroundColor: 'background.default',
            backdropFilter: 'blur(1px)',
            width: '100%',
            p: 4,
            border: (theme) => ({
              md: `1px solid ${theme.palette.divider}`,
            }),
          }}
          elevation={0}
        >
          <Stack gap={8} alignItems="center" justifyContent="center" position="relative">
            <Logo withText />
            <Outlet />
          </Stack>
        </Card>
      </Stack>
    </BlurredContainer>
  );
};

export default AuthenticationLayout;

import { Button, Stack, Typography } from '@mui/material';
import chroma from 'chroma-js';
import Title from '@/components/title.component';
import { cloneElement, useEffect } from 'react';
import { TbBell, TbLock, TbSettings, TbUser } from 'react-icons/tb';
import { useRouteModal } from '@/hooks/route-modal.hook';
import { useNavigate } from 'react-router-dom';
import GeneralSettings from './general.settings';

const settingsOptions = [
  {
    label: 'Personal',
    options: [
      {
        label: 'General',
        url: '/settings/general',
        icon: <TbSettings />,
      },
      {
        label: 'Account',
        url: '/settings/account',
        icon: <TbUser />,
      },
      {
        label: 'Notifications',
        url: '/settings/notifications',
        icon: <TbBell />,
      },
      {
        label: 'Security',
        url: '/settings/security',
        icon: <TbLock />,
      },
    ],
  },
];

const Settings = () => {
  const [, , params] = useRouteModal('settings/:category');
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.category) return;

    navigate(settingsOptions[0].options[0].url);
  }, [params?.category]);

  return (
    <Stack
      gap={2}
      sx={{
        height: '100%',
      }}
    >
      <Title subtitle="Adjust your preferences and configurations." />
      <Stack
        flexDirection={{
          xs: 'column',
          md: 'row',
        }}
        flex={1}
        gap={2}
      >
        <Stack
          gap={1}
          sx={{
            width: {
              xs: '100%',
              md: 300,
            },
            bgcolor: 'background.paper',
          }}
        >
          {settingsOptions?.map((section) => (
            <Stack
              key={section.label}
              gap={2}
              sx={{
                p: 2,
              }}
            >
              <Typography fontSize=".75rem">{section.label}</Typography>
              <Stack>
                {section.options?.map((option) => {
                  const isURL = params?.category === option.label.toLowerCase();

                  return (
                    <Button
                      variant="contained"
                      sx={[
                        {
                          height: 40,
                          borderRadius: 2,
                          justifyContent: 'flex-start',
                          bgcolor: (theme) =>
                            isURL
                              ? chroma(theme.palette.primary.main).alpha(0.1).hex()
                              : 'transparent',
                          color: isURL ? 'primary.main' : 'text.primary',
                        },
                      ]}
                      disableElevation
                      disableFocusRipple
                      disableRipple
                      disableTouchRipple
                      fullWidth
                      onClick={() => navigate(option.url)}
                    >
                      <Stack
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                        width="100%"
                      >
                        <Stack flexDirection="row" alignItems="center" gap={1.5}>
                          <Stack alignItems="center" justifyContent="center">
                            {cloneElement(option.icon, {
                              size: 16,
                            })}
                          </Stack>
                          <Typography
                            fontWeight={400}
                            sx={{
                              textTransform: 'capitalize',
                              fontSize: '.875rem',
                            }}
                          >
                            {option.label}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Button>
                  );
                })}
              </Stack>
            </Stack>
          ))}
        </Stack>
        <Stack flex={1}>
          <GeneralSettings />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Settings;

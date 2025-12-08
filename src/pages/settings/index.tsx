import { Button, Stack, Typography } from '@mui/material';
import chroma from 'chroma-js';
import { cloneElement, lazy, Suspense, useState } from 'react';
import { TbBell, TbLock, TbSettings, TbUser } from 'react-icons/tb';
import Title from '@/components/title.component';

const GeneralSettings = lazy(() => import('./general.settings'));

const settingsOptions = [
  {
    label: 'Personal',
    options: [
      {
        label: 'General',
        url: '/settings/general',
        icon: <TbSettings />,
        component: <GeneralSettings />,
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
  const [category, setCategory] = useState(settingsOptions?.[0]?.options?.[0]?.url);

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
                  const isURL = category === option.url;

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
                      onClick={() => setCategory(option.url)}
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
          <Suspense fallback={<>Loading...</>}>
            {cloneElement(
              settingsOptions
                ?.find(({ options }) =>
                  options.some(({ url }: { url: string }) => url === category),
                )
                ?.options?.find(({ url }: { url: string }) => url === category)?.component || (
                <div>Select a setting to view</div>
              ),
            )}
          </Suspense>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Settings;

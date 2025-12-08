import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import { TbCircle, TbCircleCheckFilled } from 'react-icons/tb';
import { motion } from 'framer-motion';
import Title from '@/components/title.component';
import { useAppDispatch, useAppSelector } from '@/store';
import { setPrimaryColor, setThemeMode } from '@/store/slices/settings.slice';
import { isHexColor } from '@/utils/general.util';
import { primaryColors, themes } from '@/utils/init.util';

const GeneralSettingsTheme = () => {
  const {
    mode,
    colors: { primary },
  } = useAppSelector((state) => state.settings.theme);

  const dispatch = useAppDispatch();

  const handleThemeChange = (theme: string) => {
    dispatch(setThemeMode(theme));
  };

  const handlePrimaryColorChange = (color: string) => {
    if (!isHexColor(color)) return;

    dispatch(setPrimaryColor(color));
  };

  return (
    <Card
      sx={{
        p: 2,
        bgcolor: 'background.paper',
      }}
      elevation={0}
    >
      <Stack gap={4}>
        <Stack gap={2}>
          <Title
            title="Theme"
            subtitle="Choose between light, dark, or system default theme."
            titleSx={{
              fontSize: '1.125rem',
            }}
            subtitleSx={{
              fontSize: '.875rem',
            }}
          />
          <Stack
            flexDirection={{
              xs: 'column',
              md: 'row',
            }}
            gap={2}
          >
            {themes.map((theme) => {
              const isMode = mode === theme?.label;

              return (
                <Card
                  key={theme.label}
                  sx={{
                    flex: 1,
                    borderRadius: 2,
                    border: (t) =>
                      `solid 2px ${isMode ? t.palette.primary.main : t.palette.divider}`,
                  }}
                  elevation={0}
                  onClick={() => handleThemeChange(theme.label)}
                >
                  <Stack>
                    <Box
                      component="img"
                      src={theme.image}
                      alt={`${theme.label} theme`}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'left',
                        opacity: 0.9,
                      }}
                    />
                    <Divider />
                    <Stack
                      flexDirection="row"
                      sx={{
                        p: 1.5,
                        bgcolor: 'background.paper',
                        textAlign: 'center',
                        textTransform: 'capitalize',
                      }}
                      gap={2}
                    >
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                          color: isMode ? 'primary.main' : 'background.200',
                        }}
                      >
                        {isMode ? <TbCircleCheckFilled size={20} /> : <TbCircle size={20} />}
                      </Stack>
                      <Typography>{theme.label}</Typography>
                    </Stack>
                  </Stack>
                </Card>
              );
            })}
          </Stack>
        </Stack>
        <Divider />
        <Stack gap={2}>
          <Title
            title="Accent Colors"
            subtitle="Choose an accent color for the application."
            titleSx={{
              fontSize: '1.125rem',
            }}
            subtitleSx={{
              fontSize: '.875rem',
            }}
          />
          <Stack flexDirection="row" gap={2}>
            <Stack justifyContent="flex-end" gap={2} flex={1}>
              <Card
                elevation={0}
                sx={{
                  p: 2,
                }}
              >
                <Stack gap={1}>
                  <Typography>Primary</Typography>
                  <Stack flexDirection="row" gap={2}>
                    {primaryColors.map((color) => (
                      <Box
                        sx={{
                          position: 'relative',
                        }}
                        key={`primary-${color}`}
                      >
                        {color === primary && (
                          <Box
                            component={motion.div}
                            layoutId="primarycolor"
                            sx={{
                              position: 'absolute',
                              width: 36,
                              height: 36,
                              borderRadius: '50%',
                              top: -4,
                              left: -4,
                              border: (t) => `2px solid ${t.palette.primary.main}`,
                              zIndex: 1,
                            }}
                          />
                        )}
                        <Box
                          sx={{
                            bgcolor: color,
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                          }}
                          onClick={() => handlePrimaryColorChange(color)}
                        />
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              </Card>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

const GeneralSettings = () => (
  <Stack
    gap={2}
    sx={{
      height: '100%',
    }}
  >
    <Title
      title="General Settings"
      titleSx={{
        fontSize: '1.25rem',
      }}
    />
    <GeneralSettingsTheme />
  </Stack>
);

export default GeneralSettings;

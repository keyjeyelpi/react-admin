import { Chip, Divider, Stack, Typography } from '@mui/material';
import { cloneElement, type JSX } from 'react';
import { TbTrendingDown, TbTrendingUp } from 'react-icons/tb';
import Typing from '../typing-text.component';

const DashboardCard = ({
  auto,
  icon,
  title,
  value,
  previousValue,
}: {
  auto?: boolean;
  icon: JSX.Element;
  title: string;
  value: string | number;
  previousValue?: string | number;
}) => {
  const change =
    previousValue && typeof previousValue === 'number' && typeof value === 'number'
      ? Math.round(((value - previousValue) / previousValue) * 100)
      : 0;

  return (
    <Stack sx={[!!auto && { height: '100%', width: '100%' }]} justifyContent="center">
      <Stack
        gap={3}
        sx={{
          p: 2,
        }}
      >
        <Stack flexDirection="row" alignItems="center" gap={2}>
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              height: 32,
              width: 32,
              bgcolor: 'background.50',
              borderRadius: 2,
              border: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            {cloneElement(icon, { size: 14 })}
          </Stack>
          <Typography variant="h6">{title}</Typography>
        </Stack>
        <Stack flexDirection="row" alignItems="center" gap={2}>
          <Typing text={value?.toLocaleString()} variant="h3" fontWeight={600} delay={10} />
          {previousValue && (
            <Chip
              variant="filled"
              size="small"
              sx={{
                backgroundColor:
                  change > 0 ? 'success.100' : change < 0 ? 'error.100' : 'background.50',
              }}
              label={
                <Stack flexDirection="row" alignItems="center">
                  {typeof previousValue === 'number' && typeof value === 'number' ? (
                    <Stack
                      flexDirection="row"
                      alignItems="center"
                      gap={0.5}
                      sx={{
                        color:
                          change > 0 ? 'success.main' : change < 0 ? 'error.main' : 'text.primary',
                      }}
                    >
                      <Typography component="span" variant="caption" fontWeight={600}>
                        {Math.abs(change)}%
                      </Typography>
                      {change > 0 ? <TbTrendingUp /> : <TbTrendingDown />}
                    </Stack>
                  ) : (
                    <Typography variant="caption">{previousValue}</Typography>
                  )}
                </Stack>
              }
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DashboardCard;

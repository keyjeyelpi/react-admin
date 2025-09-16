import { Divider, Stack, Typography } from '@mui/material';
import { cloneElement, type JSX } from 'react';
import { TbTrendingDown, TbTrendingUp } from 'react-icons/tb';

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
        flexDirection="row"
        alignItems="center"
        gap={3}
        sx={{
          p: 2,
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            height: 60,
            width: 60,
            bgcolor: 'background.50',
            borderRadius: 2,
            border: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          {cloneElement(icon, { size: 32 })}
        </Stack>
        <Stack justifyContent="space-between">
          <Typography variant="h6">{title}</Typography>
          <Typography variant="h3" fontWeight={600}>
            {value}
          </Typography>
        </Stack>
      </Stack>
      {previousValue && (
        <>
          <Divider />
          <Stack
            flexDirection="row"
            alignItems="center"
            sx={{
              px: 2,
              py: 1,
            }}
          >
            {typeof previousValue === 'number' && typeof value === 'number' ? (
              <Typography variant="caption">
                <Typography
                  component="span"
                  variant="caption"
                  sx={{
                    color: change > 0 ? 'success.main' : change < 0 ? 'error.main' : 'text.primary',
                  }}
                  fontWeight={600}
                >
                  {change > 0 ? <TbTrendingUp /> : <TbTrendingDown />}
                  {Math.abs(change)}%
                </Typography>{' '}
                {change > 0 ? 'increase' : change < 0 ? 'decrease' : 'nothing'} vs last month
              </Typography>
            ) : (
              <Typography variant="caption">{previousValue}</Typography>
            )}
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default DashboardCard;

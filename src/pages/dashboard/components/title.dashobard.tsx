import { Stack, Typography } from '@mui/material';
import type { DashboardTitleProps } from '../index.d';
import { cloneElement } from 'react';

const DashboardTitle = ({ title, icon, options }: DashboardTitleProps) => {
  return (
    <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
      <Stack flexDirection="row" alignItems="center" gap={2}>
        {icon && (
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
            {cloneElement(icon, {
              size: 14,
            })}
          </Stack>
        )}
        <Typography variant="h6" fontSize="0.875rem">
          {title}
        </Typography>
      </Stack>
      {options && <Stack>{options}</Stack>}
    </Stack>
  );
};

export default DashboardTitle;

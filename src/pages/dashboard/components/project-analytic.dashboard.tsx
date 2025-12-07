import DashboardTitle from '@/pages/dashboard/components/title.dashobard';
import { Button, Icon, IconButton, Stack, Typography } from '@mui/material';
import { TbAlignCenter, TbArrowsUpDown, TbDots, TbGraph } from 'react-icons/tb';

const DashboardProjectAnalyticOptions = () => {
  return (
    <Stack gap={2} flexDirection="row">
      <Button size="small" startIcon={<TbAlignCenter size={14} />} variant="outlined">
        Filter
      </Button>
      <Button size="small" startIcon={<TbArrowsUpDown size={14} />} variant="outlined">
        Sort
      </Button>
      <IconButton size="small">
        <TbDots size={14} />
      </IconButton>
    </Stack>
  );
};

const DashboardProjectAnalytic = () => {
  return (
    <Stack
      sx={{
        height: '100%',
        width: '100%',
        p: 2,
      }}
      justifyContent="space-between"
    >
      <DashboardTitle
        title="Project Analytics"
        icon={<TbGraph />}
        options={<DashboardProjectAnalyticOptions />}
      />
    </Stack>
  );
};

export default DashboardProjectAnalytic;

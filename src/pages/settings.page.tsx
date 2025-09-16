import { Stack, Typography } from '@mui/material';
import Title from '../components/title.component';

const AccountSettings = () => {};

const Settings = () => {
  return (
    <Stack gap={2}>
      <Title subtitle="Adjust your preferences and configurations." />
      <Stack flexDirection="row" gap={2}>
        <Stack gap={1} sx={{ width: 300 }}>
          <Typography fontSize=".75rem">Personal</Typography>
        </Stack>
        <Stack flex={1}></Stack>
      </Stack>
    </Stack>
  );
};

export default Settings;

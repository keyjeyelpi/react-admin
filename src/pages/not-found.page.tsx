import { Chip, Stack, Typography } from '@mui/material';

const NotFound = () => (
  <Stack
    sx={{
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    gap={2}
  >
    <Chip
      label="404"
      color="error"
      sx={{
        borderRadius: 2,
      }}
    />
    <Typography variant="h5" fontWeight={600}>
      Page Not Found
    </Typography>
    <Typography variant="body2" color="text.secondary">
      The page you are looking for does not exist or has been moved.
    </Typography>
  </Stack>
);

export default NotFound;

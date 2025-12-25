import { Box, Skeleton, Stack } from '@mui/material';

const KanbanSkeleton = ({ type = 'full' }: { type?: string }) => {
  if (type === 'full')
    return (
      <Stack
        gap={2}
        sx={{
          height: '100%',
          position: 'relative',
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={{
            xs: 2,
            md: 4,
          }}
          pb={0}
        >
          <Stack gap={1}>
            <Stack flexDirection="row" alignItems="center" gap={1}>
              <Skeleton variant="rectangular" width={93.75} height={24} />
              <Skeleton variant="rectangular" width={55.42} height={24} />
            </Stack>
            <Skeleton variant="rectangular" width={88.2} height={32} />
            <Skeleton variant="rectangular" width={395} height={20} />
          </Stack>
        </Stack>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
          }}
        ></Box>
      </Stack>
    );
};

export default KanbanSkeleton;

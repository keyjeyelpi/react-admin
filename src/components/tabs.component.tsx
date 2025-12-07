import { Box, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import type { TabsProps } from './types';

const Tabs = ({ tabs, selectedTab, setSelectedTab }: TabsProps) => (
  <Stack
    direction="row"
    sx={{
      p: 1,
      borderRadius: 1,
      backgroundColor: 'background.50',
      width: 'fit-content',
    }}
  >
    {tabs.map((tab) => (
      <Box
        key={tab}
        sx={{
          position: 'relative',
        }}
      >
        {tab === selectedTab && (
          <Box
            component={motion.div}
            layoutId="underline"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              borderRadius: 1,
              width: '100%',
              height: '100%',
              bgcolor: 'background.default',
            }}
          />
        )}
        <Button
          onClick={() => setSelectedTab(tab)}
          sx={{
            color: 'text.primary',
            py: 1,
          }}
          size="small"
          disableFocusRipple
          disableRipple
          disableTouchRipple
        >
          {tab}
        </Button>
      </Box>
    ))}
  </Stack>
);

export default Tabs;

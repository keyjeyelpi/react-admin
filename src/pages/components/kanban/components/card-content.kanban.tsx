import chroma from 'chroma-js';
import { Alert, Box, Button, Collapse, Divider, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { cloneElement } from 'react';
import { TbLayersSelected, TbLock } from 'react-icons/tb';
import type { KanbanCardContentProps } from '../index.d';

const KanbanCardContent = ({
  id,
  isLocked,
  category,
  title,
  description,
  selected,
  setSelected,
}: KanbanCardContentProps) => (
  <Stack
    justifyContent="space-between"
    alignItems="stretch"
    sx={{
      height: '100%',
    }}
  >
    <Stack
      gap={1}
      sx={{
        p: 2,
      }}
    >
      {category && (
        <Stack direction="row" justifyContent="flex-start" gap={1} alignItems="center">
          <Stack
            component={motion.div}
            layoutId={(id || '') + 'icon' + (category?.label || '') + (title || '')}
            justifyContent="center"
            alignItems="center"
            sx={{
              color: 'primary.main',
            }}
          >
            {cloneElement(category?.icon || <TbLayersSelected />, {
              size: 24,
            })}
          </Stack>
          <Typography
            component={motion.span}
            layoutId={(id || '') + category?.label}
            variant="caption"
          >
            {category?.label || 'Category'}
          </Typography>
        </Stack>
      )}
      {isLocked && (
        <Alert severity="error" component={motion.div} icon={<TbLock />}>
          The item cannot be edited.
        </Alert>
      )}
      <Typography fontWeight={600} component={motion.div} layoutId={(id || '') + title}>
        {title || 'Task Title'}
      </Typography>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Box
          component={motion.div}
          initial={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 64,
          }}
          animate={{
            height: selected ? 0 : 64,
          }}
          sx={{
            background: (theme) =>
              `linear-gradient(to top, ${theme.palette.background.paper} 0%, ${chroma(
                theme.palette.background.paper,
              )
                .alpha(0)
                .hex()} 100%)`,
            zIndex: 1,
          }}
        />
        <Collapse in={!!selected} collapsedSize={64}>
          <Typography variant="body2" component={motion.div} layoutId={(id || '') + description}>
            {description || 'Lorem Ipsum'}
          </Typography>
        </Collapse>
      </Box>
    </Stack>
    <Box>
      <Divider />
      {!selected ? (
        <Button size="small" onClick={setSelected} fullWidth>
          Show More
        </Button>
      ) : (
        <Stack>
          <Button size="small" fullWidth>
            Show More
          </Button>
        </Stack>
      )}
    </Box>
  </Stack>
);

export default KanbanCardContent;

import { Stack, type SxProps } from '@mui/material';
import chroma from 'chroma-js';
import { AnimatePresence, motion } from 'framer-motion';

const ModalBackground = ({
  open,
  onClose,
  sx,
}: {
  open: boolean;
  onClose: () => void;
  sx?: SxProps;
}) => {
  return (
    <AnimatePresence initial={false} mode="wait">
      {open && (
        <Stack
          alignItems="center"
          justifyContent="center"
          component={motion.div}
          initial={{
            height: '100dvh',
            width: '100vw',
            zIndex: 9999,
            backdropFilter: 'blur(4px)',
            opacity: 0,
            top: 0,
            left: 0,
            pointerEvents: 'none',
          }}
          sx={{
            position: 'fixed',
            backgroundColor: (theme) => chroma(theme.palette.background.paper).alpha(0.4).hex(),
            borderRadius: 2,
            overflow: 'auto',
            ...sx,
          }}
          animate={{
            opacity: 1,
            pointerEvents: 'auto',
          }}
          exit={{
            pointerEvents: 'none',
            opacity: 0,
          }}
          onClick={onClose}
        />
      )}
    </AnimatePresence>
  );
};

export default ModalBackground;

import { IconButton } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';
import { TbCircleX } from 'react-icons/tb';
import { Box } from '@mui/material';

const ModalTrigger = ({ children }: React.PropsWithChildren) => <>{children}</>;

const ModalContent = ({ children }: React.PropsWithChildren) => <>{children}</>;

const Modal = ({
  show,
  setShow,
  children,
}: {
  show: boolean;
  setShow: (value: boolean) => void;
  children: React.ReactNode;
}) => {
  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === ModalTrigger,
  );
  const content = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === ModalContent,
  );

  return (
    <>
      <AnimatePresence>
        {!show && (
          <motion.div layoutId="add-column-button" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {trigger}
          </motion.div>
        )}
      </AnimatePresence>
      {createPortal(
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9000,
              }}
              onClick={() => setShow(false)}
            >
              <Box
                component={motion.div}
                layoutId="add-column-button"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                sx={{
                  position: 'relative',
                  backgroundColor: 'background.paper',
                  p: 4,
                  borderRadius: 2,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <IconButton
                  onClick={() => setShow(false)}
                  sx={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    bgcolor: 'primary.100',
                    color: 'primary.main',
                    borderRadius: '50%',
                    height: 24,
                    width: 24,
                    p: 0.5,
                  }}
                >
                  <TbCircleX size={16} />
                </IconButton>
                {content}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
};

export default Modal;
export { ModalTrigger, ModalContent };

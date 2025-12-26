import { IconButton, Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, type PropsWithChildren } from 'react';
import { TbCircleX } from 'react-icons/tb';

type ModalProps = PropsWithChildren<{
  id?: string;
  show: boolean;
  setShow: (value: boolean) => void;
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'auto';
}>;

const ModalTrigger = ({ children }: React.PropsWithChildren) => <>{children}</>;
const ModalContent = ({ children }: React.PropsWithChildren) => <>{children}</>;

const Modal = ({ id, show, setShow, children, size = 'auto' }: ModalProps) => {
  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === ModalTrigger,
  );

  const content = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === ModalContent,
  );

  useEffect(() => {
    if (show) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShow(false);
    };

    if (show) document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, setShow]);

  return (
    <>
      <AnimatePresence>
        {!show && (
          <motion.div
            layoutId={id ?? 'layout-id'}
            initial={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            {trigger}
          </motion.div>
        )}
      </AnimatePresence>
      {
        <AnimatePresence>
          {show && (
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
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
                zIndex: 1201,
              }}
              onClick={() => setShow(false)}
            >
              <Box
                component={motion.div}
                layoutId={id ?? 'layout-id'}
                initial={{
                  scale: 0.8,
                }}
                animate={{
                  scale: 1,
                }}
                exit={{
                  scale: 0.8,
                }}
                sx={(theme) => ({
                  width: size === 'auto' ? 'auto' : theme.breakpoints.values[size],
                  position: 'relative',
                  backgroundColor: 'background.paper',
                  p: 4,
                  borderRadius: 2,
                })}
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
        </AnimatePresence>
      }
    </>
  );
};

export default Modal;

export { ModalTrigger, ModalContent };

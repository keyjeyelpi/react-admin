import { Stack, Typography, type TypographyProps } from '@mui/material';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useBreakpoint } from '../theme';

const Typing = ({
  text,
  delay = 0,
  spacing = 0.2,
  ...typography
}: TypographyProps & {
  text:
    | string
    | {
        xs?: string;
        sm?: string;
        md?: string;
        lg?: string;
        xl?: string;
      };
  delay?: number;
  spacing?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const { breakpoint } = useBreakpoint();

  return (
    <Stack
      direction="row"
      spacing={spacing}
      justifyContent="center"
      ref={ref}
      component={motion.div}
      transition={{ delay }}
    >
      <AnimatePresence>
        {(typeof text === 'string'
          ? text
          : typeof text === 'object'
            ? ((breakpoint === 'xl'
                ? text.xl || text.lg || text.md || text.sm || text.xs
                : breakpoint === 'lg'
                  ? text.lg || text.md || text.sm || text.xs
                  : breakpoint === 'md'
                    ? text.md || text.sm || text.xs
                    : breakpoint === 'sm'
                      ? text.sm || text.xs
                      : text.xs) ?? '')
            : ''
        )
          .split('')
          .map((char, i) => (
            <Typography
              component={motion.p}
              key={i}
              {...typography}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.2, delay: i * 0.1 }}
            >
              {char === ' ' ? '\u00A0' : char}
            </Typography>
          ))}
      </AnimatePresence>
    </Stack>
  );
};

export default Typing;

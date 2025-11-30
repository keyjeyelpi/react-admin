import { Box, type SxProps } from '@mui/material';
import chroma from 'chroma-js';
import { motion } from 'framer-motion';
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

import useTheme from '../theme';

type Particle = {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
};

const BlurredContainer = ({ children, sx }: { children: ReactNode; sx?: SxProps }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  const { primary, secondary } = useTheme().palette;

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const { offsetWidth, offsetHeight } = containerRef.current;
    const newParticles = Array.from({ length: Math.random() * 4 + 10 }).map((_, i) => {
      const x = Math.random() * offsetWidth;
      const y = Math.random() * offsetHeight;

      return {
        id: i,
        size: Math.floor(Math.random() * 480) + 40,
        x,
        y,
        duration: Math.random() * 2 + 8,
      };
    });

    setParticles(newParticles);
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100dvh',
        overflow: 'hidden',
      }}
    >
      {particles.map((p, i) => (
        <Box
          component={motion.div}
          key={p.id}
          initial={{ x: p.x, y: p.y }}
          animate={{
            x: p.x + (Math.random() * 2 - 1) * 500,
            y: p.y + (Math.random() * 2 - 1) * 500,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          sx={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: chroma(i % 2 === 0 ? primary.main : secondary.main)
              .alpha(0.25)
              .css(),
            pointerEvents: 'none',
          }}
        />
      ))}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backdropFilter: 'blur(80px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <Box sx={{ zIndex: 2, ...sx }}>{children}</Box>
    </Box>
  );
};

export default BlurredContainer;

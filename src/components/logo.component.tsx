import { Box, Stack, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useCurrentThemeMode } from '../theme';

const Logo = ({
  withText,
  logoContainerSize,
  logoSize,
  textSize,
}: {
  withText?: boolean;
  logoContainerSize?: number;
  logoSize?: number;
  textSize?: number;
}) => {
  const { logo } = useCurrentThemeMode();

  return (
    <Stack flexDirection="row" alignItems="center">
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          height: logoContainerSize ?? 24,
          width: logoContainerSize ?? 24,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            height: logoSize ?? 24,
            width: logoSize ?? 24,
          }}
        />
      </Stack>
      <AnimatePresence initial={false} mode="wait">
        {withText && (
          <Box
            component={motion.div}
            initial={{
              width: 0,
              overflowX: 'hidden',
            }}
            animate={{
              width: 'auto',
            }}
            exit={{
              width: 0,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                ml: 1,
                fontWeight: 700,
                textTransform: 'lowercase',
                letterSpacing: '0.025em',
                fontSize: textSize ?? '1.125rem',
              }}
            >
              Keyjey
              <Typography component="span" variant="h6" color="primary" fontWeight={700}>
                elpi
              </Typography>
              .
            </Typography>
          </Box>
        )}
      </AnimatePresence>
    </Stack>
  );
};

export default Logo;

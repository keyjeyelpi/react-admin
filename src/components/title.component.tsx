import { Breadcrumbs, Skeleton, Stack, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import type { SxProps } from './types';

const Title = ({
  title,
  titleSx,
  subtitle,
  subtitleSx,
  skeleton = false,
  hideBreadcrumbs,
}: {
  title?: string;
  titleSx?: SxProps;
  subtitle?: string;
  subtitleSx?: SxProps;
  skeleton?: boolean;
  hideBreadcrumbs?: boolean;
}) => {
  const location = useLocation();

  const paths = location.pathname.split('/').filter(Boolean);

  if (skeleton)
    return (
      <Stack gap={1}>
        {paths.length > 1 && (
          <Breadcrumbs separator="›">
            {paths.map((_, index) => {
              const to = `/${paths.slice(0, index + 1).join('/')}`;

              return <Skeleton key={to} width={40} height={24} />;
            })}
          </Breadcrumbs>
        )}
        <Skeleton width={200} height={32} />
        <Skeleton width={150} height={20} />
      </Stack>
    );

  return (
    <Stack gap={1}>
      {!hideBreadcrumbs && paths.length > 1 && (
        <Breadcrumbs separator="›">
          {paths.map((path, index) => {
            const to = `/${paths.slice(0, index + 1).join('/')}`;

            const isLast = index === paths.length - 1;

            return isLast ? (
              <Typography key={to} color="text.primary" sx={{ textTransform: 'capitalize' }}>
                {path.replaceAll('-', ' ')}
              </Typography>
            ) : (
              <Link
                key={to}
                to={to}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  textTransform: 'capitalize',
                }}
              >
                {to.split('/').pop()?.replaceAll('-', ' ')}
              </Link>
            );
          })}
        </Breadcrumbs>
      )}
      <Typography variant="h5" fontWeight={600} textTransform="capitalize" sx={titleSx}>
        {title || paths.at(-1)}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={subtitleSx}>
        {subtitle}
      </Typography>
    </Stack>
  );
};

export default Title;

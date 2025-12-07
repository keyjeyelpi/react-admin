import { Breadcrumbs, Stack, Typography, SxProps } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Title = ({
  title,
  titleSx,
  subtitle,
  subtitleSx,
}: {
  title?: string;
  titleSx?: SxProps;
  subtitle?: string;
  subtitleSx?: SxProps;
}) => {
  const location = useLocation();

  const paths = location.pathname.split('/').filter(Boolean);

  return (
    <Stack gap={1}>
      {paths.length > 1 && (
        <Breadcrumbs separator="›">
          {paths.map((path, index) => {
            const to = `/${paths.slice(0, index + 1).join('/')}`;

            const isLast = index === paths.length - 1;

            return isLast ? (
              <Typography key={to} color="text.primary">
                {path}
              </Typography>
            ) : (
              <Link
                key={to}
                to={to}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                {to.split('/').pop()}
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

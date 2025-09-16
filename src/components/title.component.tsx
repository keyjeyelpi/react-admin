import { Breadcrumbs, Stack, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Title = ({ title, subtitle }: { title?: string; subtitle?: string }) => {
  const location = useLocation();

  const paths = location.pathname.split('/').filter((p) => p);

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
              <Link key={to} to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
                {to.split('/').pop()}
              </Link>
            );
          })}
        </Breadcrumbs>
      )}
      <Typography variant="h5" fontWeight={600} textTransform="capitalize">
        {title || paths[paths.length - 1]}
      </Typography>
      <Typography variant="body2" color='text.secondary'>{subtitle}</Typography>
    </Stack>
  );
};

export default Title;

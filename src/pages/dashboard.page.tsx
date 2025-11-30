import { Box, Grid } from '@mui/material';
import Title from '../components/title.component';

const Dashboard = () => {
  return (
    <Box>
      <Title
        title="Dashboard"
        subtitle="Overview of system metrics, insights, and real-time activity"
      />
      <Grid container spacing={2} mt={2}></Grid>
    </Box>
  );
};

export default Dashboard;

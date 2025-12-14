import DashboardTitle from '@/pages/dashboard/components/title.dashboard';
import {
  Button,
  Card,
  IconButton,
  Popover,
  Stack,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { memo, useState } from 'react';
import { TbAlignCenter, TbDots, TbGraph } from 'react-icons/tb';
import { LineChart } from '@mui/x-charts/LineChart';
import ProjectAnalytics from '@/data/project-analytics.data.json';

const DashboardProjectAnalyticOptions = memo(
  ({
    allMetrics,
    selectedMetrics,
    setSelectedMetrics,
  }: {
    allMetrics: string[];
    selectedMetrics: string[];
    setSelectedMetrics: (metrics: string[]) => void;
  }) => {
    const [showFilter, setShowFilter] = useState<HTMLButtonElement | null>(null);
    const [showMore, setShowMore] = useState<HTMLButtonElement | null>(null);

    const handleShowFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
      setShowFilter(event.currentTarget);
    };

    const handleShowMore = (event: React.MouseEvent<HTMLButtonElement>) => {
      setShowMore(event.currentTarget);
    };

    return (
      <Stack gap={2} flexDirection="row">
        <Button
          size="small"
          startIcon={<TbAlignCenter size={14} />}
          variant="outlined"
          onClick={handleShowFilter}
        >
          Filter
        </Button>
        <Popover
          open={Boolean(showFilter)}
          onClose={() => setShowFilter(null)}
          anchorEl={showFilter}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            mt: 2,
          }}
        >
          <Card
            sx={{
              p: 2,
            }}
          >
            <FormGroup>
              {allMetrics.map((metric) => (
                <FormControlLabel
                  key={metric}
                  control={
                    <Checkbox
                      checked={selectedMetrics.includes(metric)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedMetrics([...selectedMetrics, metric]);
                        else setSelectedMetrics(selectedMetrics.filter((m) => m !== metric));
                      }}
                    />
                  }
                  label={metric}
                />
              ))}
            </FormGroup>
          </Card>
        </Popover>
        <IconButton size="small" onClick={handleShowMore}>
          <TbDots size={14} />
        </IconButton>
        <Popover
          open={Boolean(showMore)}
          onClose={() => setShowMore(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Card></Card>
        </Popover>
      </Stack>
    );
  },
);

const DashboardProjectAnalytic = () => {
  const [data] = useState<typeof ProjectAnalytics>(ProjectAnalytics);
  const allMetrics = data.chartData.datasets.map((d) => d.label);
  const [selectedMetrics, setSelectedMetrics] = useState(allMetrics);
  const filteredDatasets = data.chartData.datasets.filter((d) => selectedMetrics.includes(d.label));

  return (
    <Stack
      sx={{
        height: '100%',
        width: '100%',
        p: 2,
      }}
      justifyContent="space-between"
    >
      <DashboardTitle
        title="Project Analytics"
        icon={<TbGraph />}
        options={
          <DashboardProjectAnalyticOptions
            allMetrics={allMetrics}
            selectedMetrics={selectedMetrics}
            setSelectedMetrics={setSelectedMetrics}
          />
        }
      />
      <Box
        sx={{
          height: 232,
          py: 2,
        }}
      >
        <LineChart
          xAxis={[
            {
              data: data.chartData.labels,
              scaleType: 'point',
            },
          ]}
          series={filteredDatasets.map((dataset) => ({
            data: dataset.data,
            label: dataset.label,
            color: dataset.borderColor,
            curve: 'catmullRom' as const,
            showMark: false,
          }))}
          height={200}
          margin={{
            left: 50,
            right: 20,
            top: 20,
            bottom: 50,
          }}
          grid={{
            vertical: false,
            horizontal: false,
          }}
        />
      </Box>
    </Stack>
  );
};

export default DashboardProjectAnalytic;

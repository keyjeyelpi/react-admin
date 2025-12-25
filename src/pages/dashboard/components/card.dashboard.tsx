import { Chip, Stack, Typography, Box, ButtonGroup, Button } from '@mui/material';
import { TbTrendingDown, TbTrendingUp } from 'react-icons/tb';
import { BarChart } from '@mui/x-charts/BarChart';
import Typing from '@/components/typing-text.component';
import { useMemo, useState } from 'react';
import DashboardTitle from './title.dashboard';
import type { DashboardCardProps } from '../types';

const isNumber = (a: unknown): a is number => !Number.isNaN(a) && typeof a === 'number';

// Helper function to extract value from data item
const getValue = (item: { [key: string]: number }): number => Object.values(item)[0];

// Helper function to get year from date key
const getYear = (dateKey: string): number => parseInt(dateKey.split('-')[0]);

// Helper function to aggregate values by year
const aggregateByYear = (
  values: {
    [key: string]: number;
  }[],
): Record<number, number> => {
  const yearMap: Record<number, number> = {};

  for (const item of values) {
    const [dateKey] = Object.keys(item);
    const year = getYear(dateKey);
    const value = getValue(item);

    yearMap[year] = (yearMap[year] || 0) + value;
  }

  return yearMap;
};

const DashboardCard = ({ auto, icon, title, values }: DashboardCardProps) => {
  const [key, setKey] = useState<'Month' | 'Year'>('Month');

  const { currentValue, previousValue } = useMemo(() => {
    if (!values?.length)
      return {
        currentValue: 0,
        previousValue: 0,
      };

    if (key === 'Month') {
      const current = values.length > 0 ? getValue(values.at(-1)) : 0;
      const previous = values.length > 1 ? getValue(values.at(-2)) : 0;

      return {
        currentValue: current,
        previousValue: previous,
      };
    }

    const yearMap = aggregateByYear(values);
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;

    return {
      currentValue: yearMap[currentYear] || 0,
      previousValue: yearMap[previousYear] || 0,
    };
  }, [values, key]);

  const change =
    previousValue && isNumber(previousValue) && typeof currentValue === 'number'
      ? Math.round(((currentValue - Number(previousValue)) / Number(previousValue)) * 100)
      : 0;

  // Prepare chart data from values
  const chartData = useMemo(() => {
    if (!values?.length)
      return {
        labels: [],
        data: [],
      };

    if (key === 'Month') {
      const recentValues = values.slice(-5);

      return {
        labels: recentValues.map((item) => {
          const [dateKey] = Object.keys(item);
          const date = new Date(dateKey);

          return date.toLocaleDateString('en-US', {
            month: 'short',
          });
        }),
        data: recentValues.map((item) => Object.values(item)[0]),
      };
    }

    const yearMap: Record<string, number> = {};

    for (const item of values) {
      const [year] = Object.keys(item)[0].split('-');
      const [value] = Object.values(item);

      yearMap[year] = (yearMap[year] || 0) + value;
    }

    const years = Object.keys(yearMap).slice(-5);

    return {
      labels: years,
      data: years.map((year) => yearMap[year]),
    };
  }, [values, key]);

  return (
    <Stack
      sx={
        auto
          ? [
              {
                height: '100%',
                width: '100%',
              },
            ]
          : []
      }
      justifyContent="center"
    >
      <Stack
        gap={3}
        sx={{
          p: 2,
        }}
      >
        <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={1}>
          <DashboardTitle title={title} icon={icon} />
          <ButtonGroup variant="contained">
            <Button
              variant={key === 'Month' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setKey('Month')}
            >
              Month
            </Button>
            <Button
              variant={key === 'Year' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setKey('Year')}
            >
              Year
            </Button>
          </ButtonGroup>
        </Stack>
        <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
          <Stack flexDirection="row" alignItems="center" gap={2}>
            <Typing
              text={currentValue?.toLocaleString() ?? '0'}
              variant="h3"
              fontWeight={600}
              fontSize="2rem"
              delay={10}
            />
            {previousValue && (
              <Chip
                variant="filled"
                size="small"
                sx={{
                  backgroundColor:
                    change > 0 ? 'success.100' : change < 0 ? 'error.100' : 'background.50',
                }}
                label={
                  <Stack flexDirection="row" alignItems="center">
                    {typeof previousValue === 'number' && typeof currentValue === 'number' ? (
                      <Stack
                        flexDirection="row"
                        alignItems="center"
                        gap={0.5}
                        sx={{
                          color:
                            change > 0
                              ? 'success.main'
                              : change < 0
                                ? 'error.main'
                                : 'text.primary',
                        }}
                      >
                        <Typography component="span" variant="caption" fontWeight={600}>
                          {Math.abs(change)}%
                        </Typography>
                        {change > 0 ? <TbTrendingUp /> : <TbTrendingDown />}
                      </Stack>
                    ) : (
                      <Typography variant="caption">
                        {previousValue?.toLocaleString() ?? '0'}
                      </Typography>
                    )}
                  </Stack>
                }
              />
            )}
          </Stack>
          {chartData.data.length > 0 && (
            <Box
              sx={{
                width: 120,
                height: 37.5,
                overflowY: 'hidden',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <BarChart
                xAxis={[
                  {
                    data: chartData.labels,
                    scaleType: 'band',
                  },
                ]}
                series={[
                  {
                    data: chartData.data,
                    color: change >= 0 ? '#4caf50' : '#f44336',
                  },
                ]}
                height={70}
                margin={{
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                }}
                grid={{
                  vertical: false,
                  horizontal: false,
                }}
                sx={{
                  '& svg': {
                    mt: 2.25,
                  },
                  g: {
                    minHeight: 60,
                  },
                  'g.MuiChartsAxis-directionX, g.MuiChartsAxis-directionY': {
                    display: 'none',
                  },
                }}
              />
            </Box>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DashboardCard;

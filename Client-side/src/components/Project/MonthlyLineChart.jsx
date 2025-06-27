import React, { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { FormControlLabel, Checkbox, Box } from '@mui/material';

const margin = { right: 24 };

const SERIES_CONFIG = [
  { key: 'billing_total', label: 'Billing' },
  { key: 'total_direct_expenses', label: 'Direct Exps' },
  { key: 'total_indirect_expenses', label: 'Indirect Exps' },
  { key: 'total_expenses', label: 'Total Exps' },
  { key: 'net_profit_loss', label: 'Net P/L' }
];

export default function MonthlyLineChart({ data }) {
  const [visibleSeries, setVisibleSeries] = useState(() =>
    SERIES_CONFIG.reduce((acc, s) => ({ ...acc, [s.key]: true }), {})
  );

  const handleToggle = (key) => {
    setVisibleSeries((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeSeries = SERIES_CONFIG
    .filter((s) => visibleSeries[s.key])
    .map((s) => ({
      data: data?.[s.key] || [],
      label: s.label
    }));

  return (
    <Box display="flex" alignItems='center'>
      <Box display="flex" flexDirection="column" gap={1}>
        {SERIES_CONFIG.map((s) => (
          <FormControlLabel
            key={s.key}
            control={
              <Checkbox
                checked={visibleSeries[s.key]}
                onChange={() => handleToggle(s.key)}
                size='small'
              />
            }
            label={<span style={{ fontSize: '0.8rem' }}>{s.label}</span>}
          />
        ))}
      </Box>

      {/* Chart */}
      <LineChart
        height={300}
        series={activeSeries}
        xAxis={[{ scaleType: 'point', data: data?.month || [] }]}
        yAxis={[{ width: 100 }]}
        margin={margin}
      />
    </Box>
  );
}
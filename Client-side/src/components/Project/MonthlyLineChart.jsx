import React, { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { FormControlLabel, Checkbox, Box } from '@mui/material';
import { lineElementClasses } from '@mui/x-charts';

const margin = { right: 24 };

const SERIES_CONFIG = [
  { key: 'budget_billing_total', label: 'Budget Billing' },
  { key: 'budget_net_profit_loss', label: 'Budget Net P/L' },
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
      curve: 'linear',
      data: data?.[s.key] || [],
      label: s.label,
      id: s.key
    }));

  return (
    <Box display="flex" alignItems="center">
      <Box display="flex" flexDirection="column" gap={1}>
        {SERIES_CONFIG
          .filter(
            (s) =>
              s.key !== 'budget_billing_total' &&
              s.key !== 'budget_net_profit_loss'
          )
          .map((s) => (
            <FormControlLabel
              key={s.key}
              control={
                <Checkbox
                  checked={visibleSeries[s.key]}
                  onChange={() => handleToggle(s.key)}
                  size="small"
                />
              }
              label={<span style={{ fontSize: '0.8rem' }}>{s.label}</span>}
            />
          ))}
      </Box>

   <LineChart
  height={300}
  series={activeSeries}
  xAxis={[{ scaleType: 'point', data: data?.month || [] }]}
  yAxis={[{ width: 100 }]}
  margin={margin}
  sx={{
  '& .MuiLineElement-series-budget_billing_total': {
    strokeDasharray: '5 5',
  },
  '& .MuiLineElement-series-budget_net_profit_loss': {
    strokeDasharray: '5 5',
  },
}}
/>
    </Box>
  );
}

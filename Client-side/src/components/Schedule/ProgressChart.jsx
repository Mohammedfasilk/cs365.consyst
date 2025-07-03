import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
  yAxis: [
    {
      label: 'Progress',
      width: 60,
    },
  ],
  height: 400,
};

const dataset = [
  { month: 'Jan', progress1: 59, progress2: 57 },
  { month: 'Feb', progress1: 61, progress2: 70 },
  { month: 'Mar', progress1: 50, progress2: 30 },
  { month: 'Apr', progress1: 61, progress2: 70 },
  { month: 'May', progress1: 61, progress2: 70 },
  { month: 'Jun', progress1: 61, progress2: 70 },
  { month: 'Jul', progress1: 61, progress2: 70 },
  { month: 'Aug', progress1: 85, progress2: 80 },
  { month: 'Sep', progress1: 61, progress2: 70 },
];
function valueFormatter(value) {
  return `${value}mm`;
}
export default function ProgressChart() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ dataKey: 'month' }]}
      series={[
        { dataKey: 'progress1', label: 'Progress 1', valueFormatter },
        { dataKey: 'progress2', label: 'Progress 2', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}
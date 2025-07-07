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
  { month: 'Jan', planned: 59, actual: 57 },
  { month: 'Feb', planned: 61, actual: 70 },
  { month: 'Mar', planned: 50, actual: 30 },
  { month: 'Apr', planned: 61, actual: 70 },
  { month: 'May', planned: 61, actual: 70 },
  { month: 'Jun', planned: 61, actual: 70 },
  { month: 'Jul', planned: 61, actual: 70 },
  { month: 'Aug', planned: 85, actual: 80 },
  { month: 'Sep', planned: 61, actual: 70 },
];
function valueFormatter(value) {
  return `${value}%`;
}
export default function ProgressChart({data}) {
  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: 'month' }]}
      series={[
        { dataKey: 'planned', label: 'Planned',valueFormatter},
        { dataKey: 'actual', label: 'Actual',valueFormatter},
      ]}
      {...chartSetting}
    />
  );
}
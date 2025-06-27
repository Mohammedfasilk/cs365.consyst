import { LineChart } from '@mui/x-charts/LineChart';

const margin = { right: 24 };
// const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
// const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
// const xLabels = [
//   'Page A',
//   'Page B',
//   'Page C',
//   'Page D',
//   'Page E',
//   'Page F',
//   'Page G',
// ];
// const Series = [
//         { data: pData, label: 'Billing' },
//         { data: uData, label: 'Direct Expense' },
//         { data: uData, label: 'Indirect Expense' },
//         { data: uData, label: 'Expenses' },
//         { data: uData, label: 'Net P/L' },
//       ]

export default function MonthlyLineChart({data}) {
    console.log(data);
    
  return (
    <LineChart
      height={300}
      series={[
        { data: (data?.billing_total || []), label: 'Billing' },
        { data: (data?.total_direct_expenses || []), label: 'Direct Expense' },
        { data: (data?.total_indirect_expenses || []), label: 'Indirect Expense' },
        { data: (data?.total_expenses || []), label: 'Expenses' },
        { data: (data?.net_profit_loss || []), label: 'Net P/L' },
      ]}
      xAxis={[{ scaleType: 'point', data: data?.month || [] }]}
      yAxis={[{ width: 50 }]}
      margin={margin}
    />
  );
}

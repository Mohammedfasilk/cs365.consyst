import Chart from 'react-apexcharts';



export default function ProgressChart({data}) {
const categories = data.map(d => d.month);

// Extract planned and actual data arrays
const plannedData = data.map(d => d.planned);
const actualData = data.map(d => d.actual);

const options = {
  chart: {
    type: 'bar',
    height: 350,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '50%', // Adjust as needed
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories,
  },
};

const series = [
  {
    name: 'Planned',
    data: plannedData,
  },
  {
    name: 'Actual',
    data: actualData,
  },
];
  return <div className='min-w-screen'>
    <Chart options={options} series={series} type="bar" width="100%" height={350} />;
  </div>

}

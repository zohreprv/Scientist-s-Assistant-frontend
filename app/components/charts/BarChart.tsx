import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
  Ticks,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ xData, yData, label }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: Math.ceil(Math.max(...yData) * 1.1),
        ticks: {
          font: {
            family: 'Roboto',
          },
        },
      },
      x: {
        ticks: {
          font: {
            family: 'Roboto',
          },
        },
      },
    },
    responsive: true,
    plugins: {
      legend: false,
      title: {
        display: true,
        text: label,
        font: { family: 'Roboto' },
      },
    },
  };

  const data = {
    labels: xData,
    datasets: [
      {
        // label: label,
        data: yData,
        backgroundColor: '#bf9f4d',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;

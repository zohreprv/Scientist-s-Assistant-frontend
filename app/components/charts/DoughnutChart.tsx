import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
const DoughnutChart = ({ xData, yData, label }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      //   {
      //     position: 'top',
      //     labels: {
      //       font: {
      //         family: 'Roboto',
      //       },
      //     },
      //   },
    },
  };

  const data = {
    labels: xData,
    datasets: [
      {
        data: yData,
        backgroundColor: ['#000', '#bf9f4d'],
      },
    ],
  };

  return <Doughnut options={options} data={data} />;
};

export default DoughnutChart;

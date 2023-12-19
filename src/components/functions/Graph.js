import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = ({ data, topic, title }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
    };
  }, []);

  if (!data) return <p>No data for {topic}</p>;

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: topic,
        data: Object.values(data),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: topic, // Replace with your actual title
          color: '#FFFFFF', // Y-axis title color
          font: {
            size: 10,
            //weight: 'bold',
          }
        },
        ticks: {
          color: '#FFFFFF', // Y-axis ticks color
          font: {
            size: 10,
            //weight: 'bold',
          }
        }
      },
      x: {

        ticks: {
          color: '#FFFFFF', // X-axis ticks color
          font: {
            size: 10,
            //weight: 'bold',
          }
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#FFFFFF', // Legend labels color
        }
      }
    }
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Graph;

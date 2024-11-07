import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function RevenueChart({ hoteldata }) {
  const segments = hoteldata.segments;
  // Extract the labels (segments) and data (revenue) from the API
  const labels = segments.map(segment => segment.segment);
  const revenueData = segments.map(segment => segment.revenue);
  const activityLevels = segments.map(segment => segment.activityLevel);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Revenue',
        data: revenueData,
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)', 
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)', 
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)', 
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Revenue ($)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const activity = activityLevels[index];
            return `${activity} Activity - $${context.raw.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
      <h3 className="font-semibold mb-4">Revenue by Group</h3>
      <Bar data={data} options={options} />
    </div>
  );
}

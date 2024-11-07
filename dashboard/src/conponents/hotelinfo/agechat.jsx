import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AudienceAgeGenderChart({ hoteldata }) {
  const ageGenderDistribution1 = hoteldata.ageGenderDistribution;
 
  const data = {
    // Get age ranges from API data
    labels: ageGenderDistribution1.map(item => item.age), 
    datasets: [
      {
        label: 'Male',
        data: ageGenderDistribution1.map(item => item.male), 
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue for male
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Female',
        data: ageGenderDistribution1.map(item => item.female), // Female data from API
        backgroundColor: 'rgba(75, 192, 192, 0.6)', 
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Set to 'y' for horizontal bars
    scales: {
      x: {
        beginAtZero: true,
        max: 100, // Assuming percentages
        title: {
          display: true,
          text: 'Percentage (%)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Age Range',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
      <h3 className="font-semibold mb-4">Audience Age & Gender</h3>
      <Bar data={data} options={options} />
    </div>
  );
}

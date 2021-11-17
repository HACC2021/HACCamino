import React from 'react';
import { Bar } from 'react-chartjs-2';

const CaseGraph = () => {
  const data1 = [8, 10, 3, 15];
  return (
      <div>
        <Bar
            data={{
              labels: ['Hawaiian Monk Seal', 'Sea Turtles', 'Sea Birds', 'Other'],
              datasets: [
                {
                  label: '# of cases',
                  data: data1,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(255, 206, 86, 0.4)',
                    'rgba(75, 192, 192, 0.4'],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'],
                  borderWidth: 2,
                },
              ],
            }}
            height={400}
            width={400}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            }}
        />
      </div>
  );
};

export default (CaseGraph);

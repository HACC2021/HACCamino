import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useTracker } from 'meteor/react-meteor-data';
import { Loader } from 'semantic-ui-react';
import { Reports } from '../../api/report/ReportCollection';

const CaseGraph = () => {
  const loadData = useTracker(() => {
    const handle = Reports.subscribeReportAdmin();
    return handle.ready();
  }, []);
  const sealCase = Reports.getSealReports();
  const turtleCase = Reports.getTurtleReports();
  const birdsCase = Reports.getBirdReports();

  const data1 = [sealCase.length, turtleCase.length, birdsCase.length];
  return (
      <div>
        {loadData ?
        <Bar
            data={{
              labels: ['Hawaiian Monk Seal', 'Sea Turtles', 'Sea Birds'],
              datasets: [
                {
                  label: '# of cases',
                  data: data1,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(255, 206, 86, 0.4)'],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'],

                  borderWidth: 2,
                },
              ],
            }}
            height={400}
            width={400}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                    beginAtZero: true,
                  },
              },
            }}
        />
        :
        <Loader>Loading</Loader>}
      </div>
  );
};

export default (CaseGraph);

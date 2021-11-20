import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useTracker } from 'meteor/react-meteor-data';
import { Loader, Grid } from 'semantic-ui-react';
import { Reports } from '../../api/report/ReportCollection';

const CaseGraph = () => {
  const loadData = useTracker(() => {
    const handle = Reports.subscribeReportAdmin();
    return handle.ready();
  }, []);
  const sealCase = Reports.getSealReports();
  const turtleCase = Reports.getTurtleReports();
  const birdsCase = Reports.getBirdReports();
  const islandData = Reports.getIslands();
  const dateData = Reports.getDates();
  console.log(dateData);
  const islandLabel = ['Oʻahu', 'Maui', 'Hawaiʻi', 'Kauaʻi', 'Molokaʻi', 'Lānaʻi', 'Niʻihau', 'Kahoʻolawe'];

  const data1 = [sealCase.length, turtleCase.length, birdsCase.length];
  return (
      <div>
        {loadData ?
        <Grid stackable columns={2}>
          <Grid.Column>
            <Bar
            data={{
              labels: ['Hawaiian Monk Seal', 'Sea Turtles', 'Sea Birds'],
              datasets: [
                {
                  label: '# of cases by animal',
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
          </Grid.Column>
          <Grid.Column>
            <Bar
            data={{
              labels: islandLabel,
              datasets: [
                {
                  label: '# of cases by island',
                  data: islandData,
                  backgroundColor: [
                    'rgba(249, 65, 68, 0.4)',
                    'rgba(243, 114, 44, 0.4)',
                    'rgba(249, 199, 79, 0.4)',
                    'rgba(144, 190, 109, 0.4)',
                    'rgba(67, 170, 139, 0.4)',
                    'rgba(77, 144, 142, 0.4)',
                    'rgba(87, 117, 144, 0.4)',
                    'rgba(39, 125, 161, 0.4)'],
                  borderColor: [
                    'rgba(249, 65, 68, 1)',
                    'rgba(243, 114, 44, 1)',
                    'rgba(249, 199, 79, 1)',
                    'rgba(144, 190, 109, 1)',
                    'rgba(67, 170, 139, 1)',
                    'rgba(77, 144, 142, 1)',
                    'rgba(87, 117, 144, 1)',
                    'rgba(39, 125, 161, 1)'],

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
          </Grid.Column>
        </Grid>
        :
        <Loader>Loading</Loader>}
      </div>
  );
};

export default (CaseGraph);

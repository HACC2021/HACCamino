import React from 'react';
import { Grid, Tab } from 'semantic-ui-react';
import CaseGraph from '../components/CaseGraph';
import AdminListReports from '../components/AdminListReports';
import Export from './Export';

const panes = [
  { menuItem: 'List of Reports', render: () => <Grid textAlign='center'>
      <Grid.Row>
      <AdminListReports/>
    </Grid.Row>
      <Grid.Row>
        <Export/>
      </Grid.Row> </Grid> },
  { menuItem: 'Report Analytics', render: () => <Grid textAlign='center'>
      <Grid.Row>
        <Grid.Column>
          <h2>Report Analytics</h2>
          <CaseGraph/>
        </Grid.Column>
      </Grid.Row>
    </Grid> },
];

const Dashboard = () => (
    <div className={'dash'}>
      <Tab panes={panes} />
    </div>
);

export default Dashboard;

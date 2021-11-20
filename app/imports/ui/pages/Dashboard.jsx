import React from 'react';
import { Grid } from 'semantic-ui-react';
import CaseGraph from '../components/CaseGraph';
import AdminListReports from '../components/AdminListReports';
import Export from './Export';

const Dashboard = () => (
    <div className={'dash'}>
      <Grid textAlign='center'>
        <Grid.Row>
          <AdminListReports/>
        </Grid.Row>
        <Grid.Row>
          <Export/>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <h2>Report Analytics</h2>
            <CaseGraph/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
);

export default Dashboard;

import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
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
          <Grid.Column>
            <Header
                as="h2"
                textAlign="center"
                content={'Cases by SubType'}
            />
            <CaseGraph/>
          </Grid.Column>
        </Grid.Row>
      <Grid.Row>
        <Grid.Column celled>
            <Export/>
        </Grid.Column>
      </Grid.Row>
      </Grid>
    </div>
);

export default Dashboard;

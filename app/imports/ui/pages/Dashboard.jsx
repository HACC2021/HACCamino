import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import CaseGraph from '../components/CaseGraph';
import AdminListReports from '../components/AdminListReports';

const Dashboard = () => (
    <div className={'dash'}>
      <Grid textAlign='center' divided>
        <Grid.Row>
          <AdminListReports />
          <Grid.Column width={11}>
            <Header
                as="h2"
                textAlign="center"
                content={'Cases by SubType'}
            />
            <CaseGraph/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
);

export default Dashboard;

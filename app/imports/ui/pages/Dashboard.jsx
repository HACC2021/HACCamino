import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

const Dashboard = () => (
  <Grid container textAlign='center'>
    <Grid.Row>
      <Grid.Column>
        <Header
          as="h2"
          textAlign="center"
          content={'Dashboard'}
          subheader={'Page is under construction. Thank you for your patience.'}
        />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Dashboard;

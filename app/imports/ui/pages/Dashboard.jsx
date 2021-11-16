import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

const Dashboard = () => (
    <div className={'dash'}>
      <Grid textAlign='center' divided>
        <Grid.Row>
          <Grid.Column width={5} >
            <Header
                as="h2"
                textAlign="center"
                content={'Active cases'}
                subheader={'This is where all the cases will be'}
            />
          </Grid.Column>
          <Grid.Column width={11} color={'grey'}>
            <Header
                as="h2"
                textAlign="center"
                content={'Cases by SubType'}
                subheader={'Page is under construction. Thank you for your patience.'}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
);

export default Dashboard;

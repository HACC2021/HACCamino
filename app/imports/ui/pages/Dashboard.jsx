import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import CaseGraph from '../components/CaseGraph';

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

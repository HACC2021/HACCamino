import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import CaseGraph from '../components/CaseGraph';
import Export from './Export';

const Dashboard = () => (
    <div className={'dash'}>
      <Grid textAlign='center' celled>
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
      <Grid.Row>
        <Grid.Column celled>
            <Export/>
        </Grid.Column>
      </Grid.Row>
      </Grid>
    </div>
);

export default Dashboard;

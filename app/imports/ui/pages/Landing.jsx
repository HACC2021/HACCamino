import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import PreReportModalRedirect from '../components/pre-report-modals/PreReportModalRedirect';
import PreReportModalHotline from '../components/pre-report-modals/PreReportModalHotline';

/** A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container>
    <Grid textAlign='center' container>
      <Grid.Row>
        <Grid.Column>
          <Header>This is the landing</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header as='h3'>Redirect</Header>
          <PreReportModalRedirect/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header as='h3'>Hotline</Header>
          <PreReportModalHotline/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);

export default Landing;

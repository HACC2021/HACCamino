import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Grid, Image } from 'semantic-ui-react';
import PreReportModalRedirect from '../components/pre-report-modals/PreReportModalRedirect';
import PreReportModalHotline from '../components/pre-report-modals/PreReportModalHotline';

/** A simple static component to render some text for the landing page. */
const Landing = () => (
      <Grid centered container style={ { margin: 'auto' } }>
        <Grid.Row>
          <Image size='small' src='images/hmarcamino.png' />
        </Grid.Row>
        <Grid.Row >
          <PreReportModalHotline/>
        </Grid.Row>

        <Grid.Row>
          <PreReportModalRedirect/>
        </Grid.Row>
        <Grid.Row>
          <Button className="ui signin button" as={NavLink} exact to="/signin" size="tiny"> Sign In </Button>
        </Grid.Row>
      </Grid>
);

export default Landing;

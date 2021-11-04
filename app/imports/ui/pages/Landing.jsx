import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';
import PreReportModal from '../components/PreReportModal';

/** A simple static component to render some text for the landing page. */
const Landing = () => {

    return (
        <Grid textAlign='center' container>
            <Grid.Row>
                <Grid.Column>
                    <Header>This is the landing</Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <PreReportModal/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default Landing;

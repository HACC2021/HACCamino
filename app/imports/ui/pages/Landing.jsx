import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
const Landing = () => {

    return (
        <Grid textAlign='center' container>
            <Grid.Row>
                <Header>This is the landing</Header>
            </Grid.Row>
        </Grid>
    );
}

export default Landing;

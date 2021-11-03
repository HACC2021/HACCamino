import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

const PreReport = () => (
    <div style={{ paddingLeft: '1rem', paddingRight: '1rem'}}>
        <Grid>
            <Grid.Row columns={4}>
                <Grid.Column>
                    <Header>SUP BRRO</Header>
                </Grid.Column>
                <Grid.Column>
                    <Header>SUP BRRO</Header>
                </Grid.Column>
                <Grid.Column>
                    <Header>SUP BRRO</Header>
                </Grid.Column>
                <Grid.Column>
                    <Header>SUP BRRO</Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Header>SUP BRO 2</Header>
            </Grid.Row>
        </Grid>
    </div>
);

export default PreReport;

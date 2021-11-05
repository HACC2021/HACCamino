import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Grid, Header, Loader, Table } from 'semantic-ui-react';
import { Users } from '../../../api/user/UserCollection';
import CustomPagination from '../../components/CustomPagination';
import VolunteerRow from '../../components/admin-exclusive/VolunteerRow';

const ListVolunteers = () => {
  const { ready, allVolunteers } = useTracker(() => ({
      ready: Users.subscribeUserAdmin().ready(),
      allVolunteers: Users.getUserVolunteers(),
    }), []);

  // copy this part for pagination
  const maxRows = 15;
  const [rows, setRows] = useState(allVolunteers.slice(0, maxRows));
  const handlePageCallback = (childRows) => {
    setRows(childRows);
  };

  return (ready ?
    <Container>
      <Grid container textAlign='center'>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2" textAlign="center" content={'List of Volunteers'}/>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Table celled selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Last Name</Table.HeaderCell>
                  <Table.HeaderCell>First Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Photo</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {rows.map((row) => <VolunteerRow volunteerObj={row} key={row._id}/>)}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column textAlign='center'>
            <CustomPagination
              maxRows={maxRows}
              arrayObjects={allVolunteers}
              parentCallback={handlePageCallback}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  : <Loader content={'Loading Volunteers\' Data'}/>);
};

export default ListVolunteers;

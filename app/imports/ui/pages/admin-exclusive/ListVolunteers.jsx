import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Grid, Header, Loader } from 'semantic-ui-react';
import { Users } from '../../../api/user/UserCollection';
import UserListTable from '../../components/admin-exclusive/UserListTable';

const ListVolunteers = () => {
  const { ready, allVolunteers } = useTracker(() => ({
      ready: Users.subscribeUserAdmin().ready(),
      allVolunteers: Users.getUserVolunteers(),
    }), []);

  return (ready ?
    <Grid container textAlign='center'>
      <Grid.Row>
        <Grid.Column>
          <Header as="h2" textAlign="center" content={'List of Volunteers'}/>
        </Grid.Column>
      </Grid.Row>

      <UserListTable arrayObjects={allVolunteers}/>
    </Grid>
  : <Loader content={'Loading Volunteers\' Data'}/>);
};

export default ListVolunteers;

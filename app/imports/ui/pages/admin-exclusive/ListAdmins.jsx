import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Grid, Header, Loader } from 'semantic-ui-react';
import { Users } from '../../../api/user/UserCollection';
import UserListTable from '../../components/admin-exclusive/UserListTable';

const ListAdmins = () => {
  const { ready, allAdmins } = useTracker(() => ({
    ready: Users.subscribeUserAdmin().ready(),
    allAdmins: Users.getUserAdmins(),
  }), []);

  return (ready ?
    <Grid container textAlign='center'>
      <Grid.Row>
        <Grid.Column>
          <Header as="h2" textAlign="center" content={'List of Staff Members'}/>
        </Grid.Column>
      </Grid.Row>

      <UserListTable arrayObjects={allAdmins}/>
    </Grid>
    : <Loader content={'Loading Volunteers\' Data'}/>);
};

export default ListAdmins;

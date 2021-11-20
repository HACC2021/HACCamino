import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Feed, Grid, Header, Loader } from 'semantic-ui-react';
import { Updates } from '../../../api/updates/UpdateCollection';
import CustomPagination from '../../components/CustomPagination';
import UpdateFeedEvent from '../../components/admin-exclusive/UpdateFeedEvent';
import { Users } from '../../../api/user/UserCollection';

const AuditLog = () => {
  const { ready, allLogs, allUsers } = useTracker(() => ({
    ready: Updates.subscribeUpdates().ready()
    && Users.subscribeUserAdmin().ready(),
    allLogs: Updates.getAllUpdatesAdmin(),
    allUsers: Users.getAllUsers(),
  }), []);

  const maxRows = 15;
  const [rows, setRows] = useState(allLogs.slice(0, maxRows));
  const handlePageCallback = (childRows) => {
    setRows(childRows);
  };

  const getUsers = (updateObj) => {
    const usersArray = [];
    if (updateObj.creator) {
      usersArray.push(['hacccamino@gmail.com', 'general-public'].includes(updateObj.creator) ?
        { owner: updateObj.creator }
        : allUsers.find(user => user.owner === updateObj.creator));
    }

    if (updateObj.userOwner) {
      usersArray.push(allUsers.find(user => user.owner === updateObj.userOwner));
    }

    return usersArray;
  };

  return (ready ?
    <Grid container textAlign='center'>
      <Grid.Row>
        <Grid.Column>
          <Header as="h2" textAlign="center" content={'Audit Log'}/>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Feed>
            {rows.length === 0 ? null : rows.map((row) => <UpdateFeedEvent
              key={row._id}
              updateObj={row}
              usersArray={getUsers(row)}
            />)}
          </Feed>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column textAlign='center'>
          <CustomPagination
            maxRows={maxRows}
            arrayObjects={allLogs}
            parentCallback={handlePageCallback}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    : <Loader content={'Loading All Updates'}/>);
};

export default AuditLog;

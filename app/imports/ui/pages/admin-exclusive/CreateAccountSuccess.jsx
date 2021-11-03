import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Container, Grid, Header, Icon, Loader, Message, Popup, Table } from 'semantic-ui-react';
import { useHistory, useLocation } from 'react-router-dom';
import { Users } from '../../../api/user/UserCollection';

const CreateAccountSuccess = () => {
  const location = useLocation();
  const userID = location.state.userID;
  const password = location.state.password;
  const { ready, userDetail } = useTracker(() => ({
    ready: Users.subscribeUserAdmin().ready(),
    userDetail: Users.getUserDetailFromID(userID),
  }), [userID, password]);

  const history = useHistory();
  const goToPage = () => {
    const pageLink = '/dashboard';
    history.push(pageLink);
  };

  return (ready ?
    <Container>
      <Grid container centered>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2" textAlign="center" icon>
              <Icon name='check circle outline' color='green' size='massive'/>
              <Header.Content>You have successfully created user account!</Header.Content>
              <Header.Subheader>
                The following details has been sent to the new {userDetail.role}&apos;s
                e-mail, together with a link that allows them to create their own password.
              </Header.Subheader>
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Table basic='very' fixed>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Name</Table.Cell>
                  <Table.Cell>{userDetail.firstName} {userDetail.lastName}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>E-mail</Table.Cell>
                  <Table.Cell>{userDetail.owner}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Password</Table.Cell>
                  <Table.Cell>
                    {password}
                    <Popup
                      content='This is a temporary password. In full implementation, the
                      user will have to create their own password via a link sent upon
                      successful user creation.'
                      trigger={<Icon name='warning sign'/>}
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Button onClick={goToPage} content='Go to Dashboard'/>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Message>
              <Message.Header>Application is still under development process.</Message.Header>
              <p>We apologize for the inconvenience. We are still working on the
                implementation of sending new volunteers/admins their account information
                and a link that allows them to create their own password. For the time
                being, please see table below for the temporary password that the user
                may use for testing.
                <br/>
                <br/>
                Mahalo!</p>
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    : <Loader content={'Loading Volunteers\' Data'}/>);
};

export default CreateAccountSuccess;

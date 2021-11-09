import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink, useHistory } from 'react-router-dom';
import { Menu, Dropdown, Sidebar, Button, Icon, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
const SideNavBar = () => {
  const { currentUser, isAdmin } = useTracker(() => ({
    currentUser: Meteor.user()?.username,
    isAdmin: Roles.userIsInRole(Meteor.userId(), 'admin'),
  }), []);
  const history = useHistory();
  const goToPage = (pageLink) => {
    history.push(pageLink);
  };
  const handleSignOut = () => {
    // insert signout verification here
    goToPage('/sign-out');
  };
  const [visible, setVisible] = React.useState(false);
  const handleShowClick = () => setVisible(!visible);
  const menuStyle = { marginBottom: '10px', borderRadius: 0 };
  return (
    <Menu style={menuStyle} attached="top" borderless inverted>
      <Menu.Item as={NavLink} activeClassName="" exact to="" key='landing'>
        <Header inverted as='h5'>HACCamino</Header>
      </Menu.Item>
      <Menu.Item
        as={Button}
        position={'right'}
        style={{
          zIndex: 1, top: 0,
          height: '5vh',
          borderRadius: 0,
          marginBottom: '10px' }}
        icon
        color='blue'
        disabled={false}
        onClick={handleShowClick}>
        <Icon name='bars'/>
      </Menu.Item>
      <Sidebar
        stackable
          as={Menu}
          animation='push'
          icon='labeled'
          inverted
          onHide={() => setVisible(false)}
          direction='top'
          visible={visible}
          width='thin'
      >
        {currentUser ? ( // volunteers && admin
            <Menu.Item as={Dropdown} item text='Reports'>
              <Dropdown.Menu>
                <Dropdown.Item
                    text='Create Report'
                    onClick={() => goToPage('/createReport')}
                />
                <Dropdown.Item
                    text='View Report'
                    onClick={() => goToPage(isAdmin ? '/admin/viewReport' : '/volunteer/viewReport')}
                />
              </Dropdown.Menu>
            </Menu.Item>
        ) : null}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? ( // admin-exclusive
            <Menu.Item as={Dropdown} text='Admin'>
              <Dropdown.Menu>
                <Dropdown.Item
                    text='Volunteers'
                    onClick={() => goToPage('/admin/volunteers-list')}
                />
                <Dropdown.Item
                    text='Staff Members'
                    onClick={() => goToPage('/admin/staff-list')}
                />
                <Dropdown.Item
                    text='Create Account'
                    onClick={() => goToPage('/admin/create-account')}
                />
                <Dropdown.Item
                    text='Audit Log'
                    onClick={() => goToPage('/admin/audit-log')}
                />
              </Dropdown.Menu>
            </Menu.Item>
        ) : null}
        <Menu.Item
            position="right"
            as={NavLink}
            content='Resources'
            exact to='/resources'
        />
        {currentUser ? // admin && volunteer
            <Menu.Item as={Dropdown} item text={currentUser}>
              <Dropdown.Menu>
                <Dropdown.Item
                    icon='sign out'
                    text='Sign Out'
                    onClick={handleSignOut}
                />
              </Dropdown.Menu>
            </Menu.Item>
            :
            <Menu.Item
                as={NavLink}
                icon="sign in"
                content='Sign In'
                exact to='/signin'
            />
        }
      </Sidebar>
    </Menu>
  );
};

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default SideNavBar;

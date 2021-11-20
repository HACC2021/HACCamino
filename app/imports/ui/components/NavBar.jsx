import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink, useHistory } from 'react-router-dom';
import { Menu, Image, Button, Sidebar } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
const NavBar = () => {
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

  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setVisible(show);
  }, [show]);

  const menuStyle = { marginBottom: '10px', borderRadius: 0 };
  return (
    <>
      <Menu style={menuStyle} attached="top" borderless inverted>
        <Button as={Menu.Item} key='bar' icon='bars' onClick={() => setShow(!show)}/>
        <Image as={Menu.Item} src='images/hmarcamino.png' position="right" />
      </Menu>
      <Sidebar
        as={Menu}
        inverted
        vertical
        visible={visible}
        width='thin'
      >
        <Menu.Item
          content='Close'
          icon='x'
          onClick={() => setShow(!show)}
        />
        <Menu.Item
          header
          content={currentUser ? 'Dashboard' : 'Home'}
          as={NavLink}
          exact to="/"
          key='landing'
        />
        {currentUser ? (
          <Menu.Item>
            <Menu.Header>Reports</Menu.Header>
            <Menu.Menu>
              <Menu.Item
                content='Create Report'
                as={NavLink}
                exact to='/createReport'
              />
              <Menu.Item
                content='View Report'
                as={NavLink}
                exact to={isAdmin ? '/admin/viewReport' : '/volunteer/viewReport'}
              />
            </Menu.Menu>
          </Menu.Item>
        ) : null}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Menu.Item>
            <Menu.Header>Admin</Menu.Header>
            <Menu.Menu>
              <Menu.Item
                content='Volunteers'
                as={NavLink}
                exact to='/admin/volunteers-list'
              />
              <Menu.Item
                content='Staff Members'
                as={NavLink}
                exact to='/admin/staff-list'
              />
              <Menu.Item
                content='Volunteers'
                as={NavLink}
                exact to='/admin/create-account'
              />
              <Menu.Item
                content='Volunteers'
                as={NavLink}
                exact to='/admin/audit-log'
              />
            </Menu.Menu>
          </Menu.Item>
        ) : null}
        <Menu.Item
          header
          content='Resources'
          as={NavLink}
          exact to="/resources"
          key='resources'
          position='right'
        />
        {currentUser ? // admin && volunteer
          <Menu.Item
            header
            icon='sign out'
            content='Sign Out'
            onClick={handleSignOut}
          />
          :
          <Menu.Item
            header
            as={NavLink}
            icon="sign in"
            content='Sign In'
            exact to='/signin'
          />
        }
      </Sidebar>
    </>
  );
};

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default NavBar;

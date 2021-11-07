import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink, useHistory } from 'react-router-dom';
import { Menu, Header, Dropdown } from 'semantic-ui-react';
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

  const menuStyle = { marginBottom: '10px' };
    return (
      <Menu style={menuStyle} attached="top" borderless inverted>
        <Menu.Item as={NavLink} activeClassName="" exact to="" key='landing'>
          <Header inverted as='h5'>HACCamino</Header>
        </Menu.Item>
        {currentUser ? ( // volunteers && admin
          [<Menu.Item as={NavLink} activeClassName="active" exact to="/createReport" key='createReport'>
              Create Report
            </Menu.Item>,
            <Menu.Item as={NavLink}
                       activeClassName="active"
                       exact to={isAdmin ? '/admin/viewReport' : '/volunteer/viewReport'}
                       key='viewReport'>
              View Report
            </Menu.Item>,
          ]
        ) : (
          // general public
          [
            // remove 'Create Report' menu item on final navbar
            <Menu.Item as={NavLink} activeClassName="active" exact to="/createReport" key='createReport'>
              Create Report
            </Menu.Item>,
          ]
        )}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? ( // admin-exclusive
          <Menu.Item>
            <Dropdown item text='Admin'>
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
            </Dropdown>
          </Menu.Item>
        ) : null}
        <Menu.Item
          position="right"
          as={NavLink}
          content='Resources'
          exact to='/resources'
        />
        {currentUser ? // admin && volunteer
          <Menu.Item>
            <Dropdown item text={currentUser}>
              <Dropdown.Menu>
                <Dropdown.Item
                  icon='sign out'
                  text='Sign Out'
                  onClick={handleSignOut}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          :
          <Menu.Item
            as={NavLink}
            icon="sign in"
            content='Sign In'
            exact to='/signin'
          />
        }
      </Menu>
    );
};

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default NavBar;

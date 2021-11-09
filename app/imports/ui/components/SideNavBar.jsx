import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Button, Icon, IconGroup, Sidebar } from 'semantic-ui-react';
// import SignOutConfirmation from './SignOutConfirmation';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class SideNavBar extends React.Component {
  state = {
    visible: false,
    visible2: false,
  }

  handleShowClick = () => {
    this.setState((prevState) => ({
      visible: !prevState.visible,
    }));
  }

  handleShowClick2 = () => {
    this.setState((prevState) => ({
      visible2: !prevState.visible2,
    }));
  }

  render() {
    const { visible } = this.state;
    const username = Meteor.user()?.username;
    return (
        <div>
          {(username === 'admin' || username === 'volunteer') ?
            [<Button key='bar' style={{ position: 'fixed', zIndex: 1, top: 0, height: '100vh', borderRadius: 0 }}
                  attached={'left'}
                  icon color='blue' disabled={false}
                  onClick={this.handleShowClick}>
            <Icon name='bars'/>
          </Button>,
          <Sidebar
              key='sidebar'
              as={Menu}
              direction='left'
              animation='push'
              icon='labeled'
              inverted
              vertical
              visible={visible}
              width='thin'
              color='blue'
              style={{ height: '100vh', minHeight: '100vh' }}
          >
            <Button key='barbutton' fluid style={{ zIndex: 2 }} icon color='blue'
                    disabled={false} onClick={this.handleShowClick}>
              <Icon name='bars'/>
            </Button>,
            <Menu.Item key='home' style={{ floated: 'left', width: '100%' }} id="navbar-home"
                       as={NavLink} exact to="/home" onClick={this.handleShowClick}>
              <IconGroup>
                <Icon name='home'/>
                Home
              </IconGroup>
            </Menu.Item>,
            <Menu.Item key='health' style={{ floated: 'left', width: '100%' }} id="'user'"
                       as={NavLink} exact to="/health" onClick={this.handleShowClick}>
              <IconGroup>
                <Icon name='heart'/>
                Health
              </IconGroup>
            </Menu.Item>,
          </Sidebar>] : ''}
        </div>
    );
  }
}

// Declare the types of all properties.
SideNavBar.propTypes = {
  currentUser: PropTypes.string,
  ready: PropTypes.bool,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => {
  const curr = Meteor.user() ? Meteor.user().username : '';
  return {
    currentUser: curr,
  };
})(SideNavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);

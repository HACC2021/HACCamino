import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Button, Icon, IconGroup, Sidebar, Image } from 'semantic-ui-react';
import SignOutConfirmation from './SignOutConfirmation';

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
    // const font = "'Geo', sans-serif";
    /*    const menuStyle = {
      height: '100%', /!* Full-height: remove this if you want "auto" height *!/
      width: 'auto', /!* Set the width of the sidebar *!/
      position: 'fixed', /!* Fixed Sidebar (stay in place on scroll) *!/
      zIndex: '1', /!* Stay on top *!/
      top: '0', /!* Stay at the top *!/
      left: '0',
      /!* overflowX: 'hidden', /!* Disable horizontal scroll *!/ *!/
      paddingTop: '20px',
    }; */

    if (this.props.currentUser === '') {
      return ('');
    }

    return (
        <div>
          {/* eslint-disable-next-line max-len */}
          <Button style={{ position: 'fixed', zIndex: 1, top: 0, height: '5vh', borderRadius: 0, marginBottom: '10px' }}
                  attached={'right'} fluid={'centered'}
                  icon color='blue' disabled={false} onClick={this.handleShowClick}>
            <Image centered src='/images/logo-side.png' size='mini'/>
          </Button>
          <Sidebar
              as={Menu}
              animation='push'
              direction='top'
              icon='labeled'
              inverted
              vertical
              visible={visible}
              width='thin'
              color='blue'
              style={{ height: '25vh', minHeight: '30vh' }}
          >
            <Button fluid style={{ zIndex: 2 }} icon color='blue' disabled={false} onClick={this.handleShowClick}>
              <Icon name='bars'/>
            </Button>
            <Menu.Item style={{ floated: 'left', width: '100%' }} id="dashboard-home"
                       as={NavLink} exact to="/dashboard" onClick={this.handleShowClick}>
              <IconGroup>
                <Icon name='home'/>
                Home
              </IconGroup>
            </Menu.Item>
            <Menu.Item style={{ floated: 'left', width: '100%' }} id="'user'"
                       {/* eslint-disable-next-line max-len */}
                       as={NavLink} exact to={isAdmin ? '/admin/viewReport' : '/volunteer/viewReport'} onClick={this.handleShowClick}>
              <IconGroup>
                <Icon name='heart'/>
                Reports
              </IconGroup>
            </Menu.Item>
            <Menu.Item style={{ floated: 'left', width: '100%' }} id="'user'"
                       as={NavLink} exact to="/createReport" onClick={this.handleShowClick}>
              <IconGroup>
                <Icon name='heart'/>
                Create a Report
              </IconGroup>
            </Menu.Item>

            <SignOutConfirmation id="navbar-sign-out" as={NavLink}
                                 exact to="/" style={{ padding: 0, margin: 0 }}/>
          </Sidebar>
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

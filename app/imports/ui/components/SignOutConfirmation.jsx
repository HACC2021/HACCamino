import React from 'react';
import { Modal, Button, Icon, Menu, IconGroup } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { NavLink } from 'react-router-dom';
import Landing from '../pages/Landing';

function Reducer(state, action) {

  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        open: true,
        dimmer: action.dimmer,
      };
    case 'CLOSE_MODAL':
      return {
        open: false,
      };
    case 'LOG_OUT':
      return {
        logout: Meteor.logout(),
        open: false,
      };
    default:
      throw new Error();
  }
}

function SignOutConfirmation() {

  const [state, dispatch] = React.useReducer(Reducer, {
    open: false,
    dimmer: undefined,
    return: <div id="signout-page">
      <Landing/>
    </div>,
  });
  const { open, dimmer } = state;

  return (
      <div>
        <Menu.Item text="Sign Out"
                   onClick={() => dispatch({
                     type: 'OPEN_MODAL',
                     dimmer: 'blurring',
                   })} style={{ position: 'absolute', bottom: 0, width: '100%' }} >
          <IconGroup>
            <Icon name='sign out'/>
            Logout
          </IconGroup>
        </Menu.Item>

        <Modal basic size={'mini'} dimmer={dimmer}
               onOpen={(e) => dispatch({ event: e.type, type: 'OPEN_MODAL' })
               }
               onClose={(e) => dispatch({ event: e.type, type: 'CLOSE_MODAL' })
               }
               open={open}
            // trigger={}
        >
          <Modal.Header>
            <Icon name='sign-out'/>
            Sign Out</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to sign out?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
                onClick={(e) => dispatch({
                  event: e.type,
                  name: 'onClick',
                  type: 'CLOSE_MODAL',
                })
                }
                negative
            >
              No
            </Button>
            <Button
                onClick={(e) => dispatch({
                  event: e.type,
                  name: 'onClick',
                  type: 'LOG_OUT',
                })
                }
                positive
                as={NavLink} exact to="/">
              Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
  );
}

export default SignOutConfirmation;

import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';
import { userSetActiveStatus } from '../../api/user/UserCollection.methods';

const SignOut = () => {
  const currentUser = useTracker(() => (Meteor.user()?.username), []);

  Meteor.logout((err) => {
    if (err) {
      Swal.fire(
        'Sign out failed',
        err.message,
        'error',
      );
    } else {
      userSetActiveStatus.call({ owner: currentUser, active: false }, (err2 => {
        if (err2) {
          Swal.fire(
            'Sign out failed',
            err2.message,
            'error',
          );
        } else {
          Swal.fire(
            'Sign out successful',
            '',
            'success',
          );
        }
      }));
    }
  });

  return <Redirect to={'/public-landing'}/>;
};

export default SignOut;

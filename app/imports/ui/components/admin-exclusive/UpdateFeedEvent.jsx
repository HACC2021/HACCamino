import React from 'react';
import PropTypes from 'prop-types';
import { Feed, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import UserPreview from './UserPreview';

const getUserLink = (user) => {
  if (user.owner === 'hacccamino@gmail.com') {
    return <a
      href={'https://hacc-camino.github.io/'}
      target='_blank' rel="noreferrer"
    >
      HACC Camino
    </a>;
  }
  if (user.owner === 'general-public') {
    return 'An individual (general public)';
  }
  return <UserPreview page={'audit-log'} userObj={user}/>;
};

const getEvent = (collectionName, updatedType, creator, userOwner) => {
  if (collectionName === 'user') {
    if (updatedType === 'createUser') {
      return {
        icon: 'add user',
        content: <>{getUserLink(creator)} created an account for: {getUserLink(userOwner)}</>,
      };
    }
    if (updatedType === 'createPassword') {
      return {
        icon: 'lock',
        content: <>{getUserLink(creator)} created their first password</>,
      };
    }
    if (updatedType === 'signIn') {
      return {
        icon: 'sign in',
        content: <>{getUserLink(creator)} signed in</>,
      };
    }
    if (updatedType === 'signOut') {
      return {
        icon: 'sign out',
        content: <>{getUserLink(creator)} signed out</>,
      };
    }
  }

  if (collectionName === 'report') {
    if (updatedType === 'createReport') {
      return {
        icon: 'add',
        content: <>{getUserLink(creator)} submitted a new <Link to='/admin/viewReport'>report</Link></>,
      };
    }
    if (updatedType === 'appendReport') {
      return {
        icon: 'edit',
        content: <>{getUserLink(creator)} consolidated <Link to='/admin/viewReport'>reports</Link></>,
      };
    }
  }
  return null;
};

const UpdateFeedEvent = ({ updateObj, usersArray }) => {

  const creator = usersArray.find(user => user.owner === updateObj.creator);
  const userOwner = usersArray.find(user => user.owner === updateObj.userOwner);

  const event = getEvent(updateObj.collectionName, updateObj.updatedType, creator, userOwner);

  return (
    <Feed.Event>
      <Feed.Label>
        <Icon
          size='mini'
          name={event.icon}
        />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          {event.content}
          <Feed.Date>{updateObj.date.toLocaleString()}</Feed.Date>
        </Feed.Summary>
        {updateObj.reportID ?
          <Feed.Extra text>
            Report ID: {updateObj.reportID}
          </Feed.Extra> : null}
      </Feed.Content>
    </Feed.Event>
  );
};

UpdateFeedEvent.propTypes = {
  updateObj: PropTypes.object.isRequired,
  usersArray: PropTypes.array.isRequired,
};

export default UpdateFeedEvent;

import React from 'react';
import PropTypes from 'prop-types';
import { Feed, Icon } from 'semantic-ui-react';
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

const getIcon = (collectionName, updatedTypes) => {
  if (collectionName === 'user') {
    if (updatedTypes.includes('createUser')) {
      return 'add user';
    }
    if (updatedTypes.includes('createPassword')) {
      return 'lock';
    }
    if (updatedTypes.includes('signIn')) {
      return 'sign in';
    }
    if (updatedTypes.includes('signOut')) {
      return 'sign out';
    }
  }
  return 'file alternate outline';
};

const getSummary = (collectionName, updatedTypes, creator, userOwner) => {
  if (collectionName === 'user') {
    if (updatedTypes.includes('createUser')) {
      return <>{getUserLink(creator)} created an account for: {getUserLink(userOwner)}</>;
    }
    if (updatedTypes.includes('createPassword')) {
      return <>{getUserLink(creator)} created their first password</>;
    }
    if (updatedTypes.includes('signIn')) {
      return <>{getUserLink(creator)} signed in</>;
    }
    if (updatedTypes.includes('signOut')) {
      return <>{getUserLink(creator)} signed out</>;
    }
  }
  return null;
};

const UpdateFeedEvent = ({ updateObj, usersArray }) => {

  const creator = usersArray.find(user => user.owner === updateObj.creator);
  const userOwner = usersArray.find(user => user.owner === updateObj.userOwner);

  return (
    <Feed.Event>
      <Feed.Label>
        <Icon name={getIcon(updateObj.collectionName, updateObj.updatedTypes)}/>
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          {getSummary(
            updateObj.collectionName,
            updateObj.updatedTypes,
            creator,
            userOwner,
          )}
          <Feed.Date>{updateObj.date.toLocaleString()}</Feed.Date>
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  );
};

UpdateFeedEvent.propTypes = {
  updateObj: PropTypes.object.isRequired,
  usersArray: PropTypes.array.isRequired,
};

export default UpdateFeedEvent;

import React from 'react';
import PropTypes from 'prop-types';
import { Feed, Icon } from 'semantic-ui-react';
import UserPreview from './UserPreview';

const UpdateFeedEvent = ({ updateObj, usersArray }) => {

  const creator = usersArray.find(user => user.owner === updateObj.creator);
  const userOwner = usersArray.find(user => user.owner === updateObj.userOwner);

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

  const getSummary = () => {
    if (updateObj.collectionName === 'user') {
      if (updateObj.updatedTypes.includes('createUser')) {
        return (
          <Feed.Summary>
            {getUserLink(creator)} created an account for: {getUserLink(userOwner)}
            <Feed.Date>{updateObj.date.toLocaleString()}</Feed.Date>
          </Feed.Summary>
        );
      }
    }
    return null;
  };

  return (
    <Feed.Event>
      <Feed.Label>
        <Icon name='add user'/>
      </Feed.Label>
      <Feed.Content>
        {getSummary()}
      </Feed.Content>
    </Feed.Event>
  );
};

UpdateFeedEvent.propTypes = {
  updateObj: PropTypes.object.isRequired,
  usersArray: PropTypes.array.isRequired,
};

export default UpdateFeedEvent;

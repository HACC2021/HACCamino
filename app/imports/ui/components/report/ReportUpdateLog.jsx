import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import { updatedTypes } from '../../../api/utilities/utilities';

const getCreator = (creator) => (creator === 'general-public' ?
  'An observer (general public)' : creator);

const getListItems = (update) => {
  if (update.updatedType === updatedTypes.createReport) {
    return {
      icon: 'add',
      header: `${getCreator(update.creator)} submitted this report`,
      description: update.date.toLocaleString(),
    };
  }
  if (update.updatedType === updatedTypes.appendReport) {
    return {
      icon: 'edit',
      header: `${getCreator(update.creator)} consolidated related reports`,
      description: update.date.toLocaleString(),
    };
  }
  if (update.updatedType === updatedTypes.updateReport) {
    return {
      icon: 'edit',
      header: `${getCreator(update.creator)} updated this report`,
      description: update.date.toLocaleString(),
    };
  }
  if (update.updatedType === updatedTypes.reviewReport) {
    return {
      icon: 'check',
      header: `${getCreator(update.creator)} reviewed this report`,
      description: update.date.toLocaleString(),
    };
  }
  return null;
};

const ReportUpdateLog = ({ updates }) => (
    <List>
      {updates.map(update => {
        const listItem = getListItems(update);
        return (
          <List.Item
            key={update._id}
            icon={listItem.icon}
            header={listItem.header}
            description={listItem.description}
          />
        );
      })}
    </List>
  );

ReportUpdateLog.propTypes = {
  updates: PropTypes.array.isRequired,
};

export default ReportUpdateLog;

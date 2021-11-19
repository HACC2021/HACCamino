import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import { getListItems } from '../utilities';

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

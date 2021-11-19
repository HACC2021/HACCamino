import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import { Meteor } from 'meteor/meteor';
import { reportRemoveItMethod } from '../../../api/report/ReportCollection.methods';
import { updateDefineMethod } from '../../../api/updates/UpdateCollection.methods';
import { updatedTypes } from '../../../api/utilities/utilities';

const DeleteButton = ({ report }) => {

  const deleteHandle = () => {
    const _id = report._id;
    reportRemoveItMethod.call({ _id },
    error => {
      if (error) {
        Swal.fire('Error', error.message, 'error');
      } else {
        Swal.fire('Success', 'Report Deleted Successfully', 'success').then(() => {
          const definitionData = {
            date: new Date(),
            roles: ['admin', 'volunteer'],
            collectionName: 'report',
            reportID: _id,
            updatedType: updatedTypes.deleteReport,
            creator: Meteor.user().username,
          };
          updateDefineMethod.call(definitionData);
        });
      }
    });
  };

  return (
  <Button color='red' onClick={deleteHandle} floated='left'>
    Delete
  </Button>
  );
};

DeleteButton.propTypes = {
  report: PropTypes.object.isRequired,
};

export default DeleteButton;

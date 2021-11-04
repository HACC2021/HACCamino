import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import { reportRemoveItMethod } from '../../../api/report/ReportCollection.methods';

const DeleteButton = ({ report }) => {

  const deleteHandle = () => {
    const _id = report._id;
    reportRemoveItMethod.call({ _id },
    error => {
      if (error) {
        Swal.fire('Error', error.message, 'error');
      } else {
        Swal.fire('Success', 'Report Deleted Successfully', 'success');
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

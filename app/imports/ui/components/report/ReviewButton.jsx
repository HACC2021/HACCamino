import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'semantic-ui-react';
import Select from 'react-select';
import swal from 'sweetalert';
import { reportUpdateMethod } from '../../../api/report/ReportCollection.methods';

const ReviewButton = ({ report }) => {
  const [status, setStatus] = useState('');
  const [firstOpen, setFirstOpen] = useState(false);
  const statusDropdown = [
    { value: 'pending', label: 'pending' },
    { value: 'approved', label: 'approved' },
  ];

  const onSubmit = () => {
    const updateData = report;
    updateData.status = status;
    reportUpdateMethod.call(updateData,
    error => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Report Reviewed Successfully', 'success').then(() => {
          setFirstOpen(false);
        });
      }
    });
  };

  return (
    <div>
      <Modal
      onClose={() => setFirstOpen(false)}
      onOpen={() => setFirstOpen(true)}
      open={firstOpen}
      size='small'
      trigger={
        <Button>
          Review
        </Button>
      }
      >
        <Modal.Header>Review Report</Modal.Header>
        <Form>
          <Form.Group>
            <Form.Field width={16}>
              <label>Status Of Report</label>
              <Select
                options={statusDropdown}
                name='status'
                onChange={setStatus}
                defaultValue={status}
                />
            </Form.Field>
          </Form.Group>
        </Form>
        <Button onClick={onSubmit}>
          Submit
        </Button>
      </Modal>
    </div>
  );
};

ReviewButton.propTypes = {
  report: PropTypes.object.isRequired,
};

export default ReviewButton;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Container, TextArea } from 'semantic-ui-react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { reportUpdateMethod } from '../../../api/report/ReportCollection.methods';

const ReviewButton = ({ report }) => {
  const [status, setStatus] = useState({ value: report.status, label: report.status });
  const [comments, setComments] = useState(report.link);
  const statusDropdown = [
    { value: 'pending', label: 'pending' },
    { value: 'approved', label: 'approved' },
  ];

  const onSubmit = () => {
    const updateData = report;
    updateData.status = status.value;
    updateData.link = comments;
    reportUpdateMethod.call(updateData,
    error => {
      if (error) {
        Swal.fire('Error', error.message, 'error');
      } else {
        Swal.fire('Success', 'Report Reviewed Successfully', 'success');
      }
    });
  };

  return (
    <Container>
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
          <Form.Group width={16}>
            <Form.Field
            width={16}
            id='form-textarea-control-opinion'
            control={TextArea}
            label='Comments'
            placeholder='Comments'
            value={comments}
            onChange={ e => setComments(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Button onClick={onSubmit}>
          Submit
        </Button>
    </Container>
  );
};

ReviewButton.propTypes = {
  report: PropTypes.object.isRequired,
};

export default ReviewButton;

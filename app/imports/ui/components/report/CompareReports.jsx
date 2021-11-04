import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Modal } from 'semantic-ui-react';

const CompareReports = ({ report }) => {
  const [firstOpen, setFirstOpen] = useState(false);
  return (
  <>
    <Modal
    onClose={() => setFirstOpen(false)}
    onOpen={() => setFirstOpen(true)}
    open={firstOpen}
    size='small'
    trigger={
      <Card>
        <Card.Content>
          <Card.Header>{report.title} - {report.animal}</Card.Header>
          <Card.Description>
            <p>{report.date.toLocaleString()}</p>
            <p>{report.location}</p>
          </Card.Description>
        </Card.Content>
      </Card>
    }
    >
      <Modal.Header>{report.title} - {report.animal}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>Reporter Name: {report.name}</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  </>);
};

CompareReports.propTypes = {
  report: PropTypes.object.isRequired,
};

export default CompareReports;

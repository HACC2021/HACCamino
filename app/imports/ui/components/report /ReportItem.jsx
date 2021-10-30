import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Modal, Button } from 'semantic-ui-react';
import ReviewButton from './ReviewButton';

const ReportItem = ({ report }) => {
  const [open, setOpen] = useState(false);

  return (
  <Modal
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    trigger={<Card>
      <Card.Content>
        <Card.Header>{report.title}</Card.Header>
        <Card.Description>
          <p>{report.date.toLocaleString()}</p>
          <p>{report.location}</p>
        </Card.Description>
      </Card.Content>
    </Card>}
  >
    <Modal.Header>{report.title}</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <p>Reporter Name: {report.name}</p>
        <p>Phone: {report.phone}</p>
        <p>Date: {report.date.toLocaleString()}</p>
        <p>Location: {report.location}</p>
        <p>Animal Characteristics: {report.characteristics}</p>
        <p>Animal Behavior: {report.animalBehavior}</p>
        <p>Number Of People Around The Area: {report.people}</p>
        <p>Notes: {report.notes}</p>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <ReviewButton />
      <Button
      primary
      onClick={() => setOpen(false)}
      >
        Close
      </Button>
    </Modal.Actions>
  </Modal>
  );
};

ReportItem.propTypes = {
  report: PropTypes.object.isRequired,
};

export default ReportItem;

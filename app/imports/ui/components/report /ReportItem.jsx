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
      </Card.Content>
    </Card>}
  >
    <Modal.Header>{report.title}</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        {report.name}
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

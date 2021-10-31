import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Modal, Button, Icon } from 'semantic-ui-react';
import ReviewButton from './ReviewButton';
import DeleteButton from './DeleteButton';

const ReportItem = ({ report }) => {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);

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
          <Card.Header>{report.title}</Card.Header>
          <Card.Description>
            <p>{report.date.toLocaleString()}</p>
            <p>{report.location}</p>
          </Card.Description>
        </Card.Content>
      </Card>
    }
    >
      <Modal.Header>{report.title}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>Reporter Name: {report.name}</p>
          <p>Phone Number: {report.phoneNumber}</p>
          <p>Date: {report.date.toLocaleString()}</p>
          <p>Location: {report.location}</p>
          <p>Animal Characteristics: {report.animalCharacteristics}</p>
          <p>Animal Behavior: {report.animalBehavior}</p>
          <p>Number Of People Around The Area: {report.people}</p>
          <p>Notes: {report.notes}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <DeleteButton report={report} />
        <Button
        primary
        onClick={() => setFirstOpen(false)}>
          Close
        </Button>
        <Button onClick={() => setSecondOpen(true)} primary>
          Review <Icon name='right chevron' />
        </Button>
      </Modal.Actions>

      <Modal
      onClose={() => setSecondOpen(false)}
      open={secondOpen}
      size='small'
      >
        <Modal.Header>Edit Report</Modal.Header>
        <Modal.Content>
          <ReviewButton report={report}/>
        </Modal.Content>
        <Modal.Actions>
          <Button
          icon='check'
          content='All Done'
          onClick={() => setSecondOpen(false)}
          />
        </Modal.Actions>
      </Modal>
    </Modal>
  </>);
};

ReportItem.propTypes = {
  report: PropTypes.object.isRequired,
};

export default ReportItem;

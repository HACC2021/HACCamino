import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Image, Modal, Tab, Table } from 'semantic-ui-react';
import ImageItem from './report/ImageItem';
import DeleteButton from './report/DeleteButton';
import EditButton from './report/EditButton';
import ReviewButton from './report/ReviewButton';

const AdminActiveCases = ({ reportObj }) => {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const handleModalOpen = () => {
    setFirstOpen(true);
  };
  const handleModalClose = () => setFirstOpen(false);

  const triggerComponent = (
          <Table.Row style={{ cursor: 'pointer' }}>
            <Table.Cell>{reportObj.name}</Table.Cell>
            <Table.Cell>{reportObj.location}</Table.Cell>
            <Table.Cell>{reportObj.status}</Table.Cell>
            <Table.Cell>{reportObj.animal}</Table.Cell>
          </Table.Row>
  );
// console.log(reportObj);
  let index = 0;
  const test = reportObj.name;
  const panes = [];
  test.forEach(function () {
    const temp = {};
    temp.name = reportObj.name[index];
    temp.phoneNumber = reportObj.phoneNumber[index];
    // temp.accessKey = report.accessKey[index];
    temp.animalBehavior = reportObj.animalBehavior[index];
    temp.animalCharacteristics = reportObj.animalCharacteristics[index];
    temp.notes = reportObj.notes[index];
    temp.people = reportObj.people[index];
    temp.date = reportObj.date[index];
    panes.push(
        {
          menuItem: index.toString(),
          render: function name() {
            return (
                <div>
                  <p>Reporter Name: {temp.name}</p>
                  <p>Phone Number: {temp.phoneNumber}</p>
                  <p>Date: {temp.date}</p>
                  <p>Location: {reportObj.location}</p>
                  <p>Animal Characteristics: {temp.animalCharacteristics}</p>
                  <p>Animal Behavior: {temp.animalBehavior}</p>
                  <p>Number Of People Around The Area: {temp.people}</p>
                  <p>Notes: {temp.notes}</p>
                </div>
            );
          },
        },
    );
    index++;
  });
  return (
      <Modal
          size='small'
          closeIcon
          open={firstOpen}
          onClose={handleModalClose}
          onOpen={handleModalOpen}
          trigger={triggerComponent}
      >
        <Modal.Header>{reportObj.location} - {reportObj.animal}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <h3>Report(s)</h3>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            <br/>
            <h3>Volunteer Comments</h3>
            <p>Status: {reportObj.status}</p>
            <p>Comments: {reportObj.link}</p>
            <br/>
            <h3>Image Gallery</h3>
            <Image.Group size='small'>
              {reportObj.accessKey.map((img) => <ImageItem key={img} img={img}/>)}
            </Image.Group>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <DeleteButton report={reportObj} />
          <EditButton report={reportObj} />
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
          <Modal.Header>Review Report</Modal.Header>
          <Modal.Content>
            <ReviewButton report={reportObj}/>
          </Modal.Content>
        </Modal>
      </Modal>
  );
};

AdminActiveCases.propTypes = {
  reportObj: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired,
};

export default AdminActiveCases;

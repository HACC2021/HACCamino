import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Form, Modal } from 'semantic-ui-react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { Meteor } from 'meteor/meteor';
import { reportUpdateMethod } from '../../../api/report/ReportCollection.methods';
import { updatedTypes } from '../../../api/utilities/utilities';

const EditButton = ({ report }) => {
  const [finalLocation, setFinalLocation] = useState(report.location);
  const [firstOpen, setFirstOpen] = useState(false);
  const [finalIsland, setFinalIsland] = useState({ value: report.island, label: report.island });
  const [finalAnimal, setFinalAnimal] = useState({ value: report.animal, label: report.animal });
  const animalDropdown = [
    { value: 'Hawaiian Monk Seal', label: 'Hawaiian Monk Seal' },
    { value: 'Sea Turtles', label: 'Sea Turtles' },
    { value: 'Sea Birds', label: 'Sea Birds' },
  ];
  const islandDropdown = [
    { value: 'Oʻahu', label: 'Oʻahu' },
    { value: 'Maui', label: 'Maui' },
    { value: 'Hawaiʻi', label: 'Hawaiʻi' },
    { value: 'Kauaʻi', label: 'Kauaʻi' },
    { value: 'Molokaʻi', label: 'Molokaʻi' },
    { value: 'Lānaʻi', label: 'Lānaʻi' },
    { value: 'Niʻihau', label: 'Niʻihau' },
    { value: 'Kahoʻolawe', label: 'Kahoʻolawe' },
  ];

  const onSubmit = () => {
    const updateData = {};
    updateData._id = report._id;
    updateData.link = report.link;
    updateData.name = report.name;
    updateData.date = report.date;
    updateData.location = finalLocation;
    updateData.animalCharacteristics = report.animalCharacteristics;
    updateData.animalBehavior = report.animalBehavior;
    updateData.people = report.people;
    updateData.phoneNumber = report.phoneNumber;
    updateData.notes = report.notes;
    updateData.lat = report.lat;
    updateData.lng = report.lng;
    if (finalAnimal.value) {
      updateData.animal = finalAnimal.value;
    } else {
      updateData.animal = finalAnimal;
    }
    if (finalIsland.value) {
      updateData.island = finalIsland.value;
    } else {
      updateData.island = finalIsland;
    }
    updateData.accessKey = report.accessKey;
    updateData.updatedType = updatedTypes.updateReport;
    updateData.creator = Meteor.user().username;
    reportUpdateMethod.call(updateData,
    error => {
      if (error) {
        Swal.fire('Error', error.message, 'error');
      } else {
        Swal.fire('Success', 'Report Edit Successfully', 'success');
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
        <Button primary floated='left'>
          Edit Report
        </Button>
    }
    >
    <Modal.Header>Edit Report</Modal.Header>
      <Modal.Content>
        <Container>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field width={8} required>
                <label>Type Of Animal</label>
                <Select
                options={animalDropdown}
                name='animal'
                onChange={setFinalAnimal}
                defaultValue={finalAnimal}
                />
              </Form.Field>
              <Form.Field width={8} required>
                <label>Island</label>
                <Select
                options={islandDropdown}
                name='island'
                onChange={setFinalIsland}
                defaultValue={finalIsland}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field width={16}>
                <label>Location</label>
                <input placeholder='Location' value={finalLocation} onChange={ e => setFinalLocation(e.target.value)}/>
              </Form.Field>
            </Form.Group>
          </Form>
          <Button onClick={onSubmit}>
            Submit
          </Button>
        </Container>
      </Modal.Content>
    </Modal>
  </div>
  );
};

EditButton.propTypes = {
  report: PropTypes.object.isRequired,
};

export default EditButton;

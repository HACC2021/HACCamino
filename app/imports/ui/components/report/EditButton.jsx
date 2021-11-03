import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, Form, TextArea, Modal } from 'semantic-ui-react';
import swal from 'sweetalert';
import Select from 'react-select';
import { reportUpdateMethod } from '../../../api/report/ReportCollection.methods';

const EditButton = ({ report }) => {
  const [finalTitle, setFinalTitle] = useState(report.title);
  const [finalName, setFinalName] = useState(report.name);
  const [finalLocation, setFinalLocation] = useState(report.location);
  const [finalCharacteristics, setFinalCharacteristics] = useState(report.animalCharacteristics);
  const [finalAnimalBehavior, setFinalAnimalBehavior] = useState(report.animalBehavior);
  const [finalPeople, setFinalPeople] = useState(report.people);
  const [finalPhone, setFinalPhone] = useState(report.phoneNumber);
  const [finalNotes, setFinalNotes] = useState(report.notes);
  const [firstOpen, setFirstOpen] = useState(false);
  const [finalAnimal, setFinalAnimal] = useState(report.animal);

  const animalDropdown = [
    { value: 'Hawaiian Monk Seal', label: 'Hawaiian Monk Seal' },
    { value: 'Sea Turtles', label: 'Sea Turtles' },
    { value: 'Sea Birds', label: 'Sea Birds' },
  ];

  const onSubmit = () => {
    const updateData = {};
    updateData._id = report._id;
    updateData.title = finalTitle;
    updateData.name = finalName;
    updateData.date = report.date;
    updateData.location = finalLocation;
    updateData.animalCharacteristics = finalCharacteristics;
    updateData.animalBehavior = finalAnimalBehavior;
    updateData.people = finalPeople;
    updateData.phoneNumber = finalPhone;
    updateData.notes = finalNotes;
    updateData.lat = report.lat;
    updateData.lng = report.lng;
    updateData.link = report.link;
    updateData.animal = finalAnimal;
    updateData.accessKey = report.accessKey;
    reportUpdateMethod.call(updateData,
    error => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Report Edit Successfully', 'success');
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
      <Card>
        <Button>
          Edit Report
        </Button>
      </Card>
    }
    >
    <Modal.Header>Edit Report</Modal.Header>
      <Modal.Content>
        <Container>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field width={8} required>
                <label>Title Of Report</label>
                <input placeholder='Title' value={finalTitle} onChange={ e => setFinalTitle(e.target.value)}/>
              </Form.Field>
              <Form.Field width={8} required>
                <label>Type Of Animal</label>
                <Select
                options={animalDropdown}
                name='animal'
                onChange={setFinalAnimal}
                defaultValue={finalAnimal}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field width={8}>
                <label>Name</label>
                <input placeholder='Name' value={finalName} onChange={ e => setFinalName(e.target.value)}/>
              </Form.Field>
              <Form.Field width={8}>
                <label>Location</label>
                <input placeholder='Location' value={finalLocation} onChange={ e => setFinalLocation(e.target.value)}/>
              </Form.Field>
            </Form.Group>
            <Form.Group width='equal'>
              <Form.Field width={8}>
                <label>Animal Characteristics</label>
                <input placeholder='characteristics'
                       value={finalCharacteristics} onChange={ e => setFinalCharacteristics(e.target.value)}/>
              </Form.Field>
              <Form.Field width={8}>
                <label>Animal Behavior</label>
                <input placeholder='behavior'
                       value={finalAnimalBehavior} onChange={ e => setFinalAnimalBehavior(e.target.value)}/>
              </Form.Field>
            </Form.Group>
            <Form.Group width='equal'>
              <Form.Field width={8}>
                <label>Number Of People Around The Area</label>
                <input type='number' placeholder='people'
                       value={finalPeople} onChange={ e => setFinalPeople(e.target.value)}/>
              </Form.Field>
              <Form.Field width={8}>
                <label>Phone Number</label>
                <input placeholder='(xxx)' value={finalPhone} onChange={ e => setFinalPhone(e.target.value)}/>
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field
              width={16}
              id='form-textarea-control-opinion'
              control={TextArea}
              label='Notes'
              placeholder='Notes'
              value={finalNotes}
              onChange={ e => setFinalNotes(e.target.value)}
              />
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

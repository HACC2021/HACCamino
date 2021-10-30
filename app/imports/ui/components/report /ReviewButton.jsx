import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Form, TextArea } from 'semantic-ui-react';
import swal from 'sweetalert';
import { reportUpdateMethod } from '../../../api/report/ReportCollection.methods';

const ReviewButton = ({ report }) => {
  const [finalTitle, setFinalTitle] = useState(report.title);
  const [finalName, setFinalName] = useState(report.name);
  const [finalLocation, setFinalLocation] = useState(report.location);
  const [finalCharacteristics, setFinalCharacteristics] = useState(report.characteristics);
  const [finalAnimalBehavior, setFinalAnimalBehavior] = useState(report.animalBehavior);
  const [finalPeople, setFinalPeople] = useState(report.people);
  const [finalPhone, setFinalPhone] = useState(report.phone);
  const [finalNotes, setFinalNotes] = useState(report.notes);

  const onSubmit = () => {
    const updateData = {};
    updateData._id = report._id;
    updateData.title = finalTitle;
    updateData.name = finalName;
    updateData.date = report.date;
    updateData.location = finalLocation;
    updateData.characteristics = finalCharacteristics;
    updateData.animalBehavior = finalAnimalBehavior;
    updateData.people = finalPeople;
    updateData.phone = finalPhone;
    updateData.notes = finalNotes;
    updateData.lat = report.lat;
    updateData.lng = report.lng;
    updateData.link = report.link;
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
    <Container>
      <Form>
        <Form.Group>
          <Form.Field width={16}>
            <label>Title Of Report</label>
            <input placeholder='Title' value={finalTitle} onChange={ e => setFinalTitle(e.target.value)}/>
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
            <input placeholder='people' value={finalPeople} onChange={ e => setFinalPeople(e.target.value)}/>
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
  );
};

ReviewButton.propTypes = {
  report: PropTypes.object.isRequired,
};

export default ReviewButton;

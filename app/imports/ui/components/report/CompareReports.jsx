import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Modal, Table, Button, Image } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import { Meteor } from 'meteor/meteor';
import { reportRemoveItMethod, reportUpdateMethod } from '../../../api/report/ReportCollection.methods';
import ImageItem from './ImageItem';
import { updatedTypes } from '../../../api/utilities/utilities';

const CompareReports = ({ report, oreport }) => {
  const [firstOpen, setFirstOpen] = useState(false);
  const AppendHandle = () => {
    const updateData = oreport;
    const test = report.name;
    const imgArray = report.accessKey;
    let index = 0;
    let imgIndex = 0;
    updateData.name = [...oreport.name];
    updateData.date = [...oreport.date];
    updateData.notes = [...oreport.notes];
    updateData.animalCharacteristics = [...oreport.animalCharacteristics];
    updateData.phoneNumber = [...oreport.phoneNumber];
    updateData.animalBehavior = [...oreport.animalBehavior];
    updateData.accessKey = [...oreport.accessKey];
    updateData.people = [...oreport.people];
    test.forEach(function () {
      updateData.name.push(report.name[index]);
      updateData.date.push(report.date[index]);
      updateData.notes.push(report.notes[index]);
      updateData.animalCharacteristics.push(report.animalCharacteristics[index]);
      updateData.phoneNumber.push(report.phoneNumber[index]);
      updateData.animalBehavior.push(report.animalBehavior[index]);
      updateData.people.push(report.people[index]);
      index++;
    });
    imgArray.forEach(function () {
      updateData.accessKey.push(report.accessKey[imgIndex]);
      imgIndex++;
    });
    const _id = report._id;
    updateData.updatedType = updatedTypes.appendReport;
    updateData.creator = Meteor.user().username;
    reportRemoveItMethod.call({ _id });
    reportUpdateMethod.call(updateData,
    error => {
      if (error) {
        Swal.fire('Error', error.message, 'error');
      } else {
        Swal.fire('Success', 'Report Merged Successfully', 'success');
      }
    });
  };
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
      <Modal.Header>{oreport.title} vs. {report.title}</Modal.Header>
      <Modal.Content>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>{oreport.title}</Table.HeaderCell>
              <Table.HeaderCell>{report.title}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Reporters Name</Table.Cell>
              <Table.Cell>{oreport.name.map((name) => (
              <p key={name}>{name}</p>
              ))}</Table.Cell>
              <Table.Cell>{report.name.map((name) => (
                  <p key={name}>{name}</p>
                ))}</Table.Cell>
            </Table.Row>
              <Table.Row>
                <Table.Cell>Reporters Phone Number</Table.Cell>
                <Table.Cell>{oreport.phoneNumber.map((phoneNumber) => (
                <p key={phoneNumber}>{phoneNumber}</p>
                ))}</Table.Cell>
                <Table.Cell>{report.phoneNumber.map((phoneNumber) => (
                <p key={phoneNumber}>{phoneNumber} </p>
                ))}</Table.Cell>
              </Table.Row>
            <Table.Row>
              <Table.Cell>Date</Table.Cell>
              <Table.Cell>{oreport.date.map((date) => (
              <p key={date}>{date}</p>
              ))}</Table.Cell>
              <Table.Cell>{report.date.map((date) => (
              <p key={date}>{date}</p>
              ))}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Characteristics</Table.Cell>
              <Table.Cell>{oreport.animalCharacteristics.map((animalCharacteristics) => (
              <p key={animalCharacteristics}>{animalCharacteristics}</p>
              ))}</Table.Cell>
              <Table.Cell>{report.animalCharacteristics.map((animalCharacteristics) => (
              <p key={animalCharacteristics}>{animalCharacteristics}</p>
              ))}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Behavior</Table.Cell>
              <Table.Cell>{oreport.animalBehavior.map((animalBehavior) => (
              <p key={animalBehavior}>{animalBehavior}</p>
              ))}</Table.Cell>
              <Table.Cell>{report.animalBehavior.map((animalBehavior) => (
              <p key={animalBehavior}>{animalBehavior}</p>
              ))}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Number Of People</Table.Cell>
              <Table.Cell>{oreport.people.map((people) => (
              <p key={people}>{people}</p>
              ))}</Table.Cell>
              <Table.Cell>{report.people.map((people) => (
              <p key={people}>{people}</p>
              ))}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Notes</Table.Cell>
              <Table.Cell>{oreport.notes.map((notes) => (
              <p key={notes}>{notes}</p>
              ))}</Table.Cell>
              <Table.Cell>{report.notes.map((notes) => (
              <p key={notes}>{notes}</p>
              ))}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Images</Table.Cell>
              <Table.Cell><Image.Group size='small'>{oreport.accessKey.map((img) => (
              <ImageItem key={img} img={img}/>
              ))}</Image.Group></Table.Cell>
              <Table.Cell><Image.Group size='small'>
                {report.accessKey.map((img) => (
                <ImageItem key={img} img={img}/>
                ))}
              </Image.Group></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Button onClick={AppendHandle}>
          Append
        </Button>
      </Modal.Content>
    </Modal>
  </>);
};

CompareReports.propTypes = {
  report: PropTypes.object.isRequired,
  oreport: PropTypes.object.isRequired,
};

export default CompareReports;

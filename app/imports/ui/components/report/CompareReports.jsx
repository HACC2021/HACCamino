import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Modal, Table, Button } from 'semantic-ui-react';
import swal from 'sweetalert';
import { reportUpdateMethod } from '../../../api/report/ReportCollection.methods';

const CompareReports = ({ report, oreport }) => {
  const [firstOpen, setFirstOpen] = useState(false);
  const AppendHandle = () => {
    const updateData = oreport;
    updateData.name = [...oreport.name];
    updateData.name.push(report.name[0]);
    updateData.date = [...oreport.date];
    updateData.date.push(report.date[0]);
    updateData.notes = [...oreport.notes];
    updateData.notes.push(report.notes[0]);
    updateData.animalCharacteristics = [...oreport.animalCharacteristics];
    updateData.animalCharacteristics.push(report.animalCharacteristics[0]);
    updateData.phoneNumber = [...oreport.phoneNumber];
    updateData.phoneNumber.push(report.phoneNumber[0]);
    updateData.animalBehavior = [...oreport.animalBehavior];
    updateData.animalBehavior.push(report.animalBehavior[0]);
    updateData.accessKey = [...oreport.accessKey];
    updateData.accessKey.push(report.accessKey[0]);
    console.log(updateData);
    reportUpdateMethod.call(updateData,
    error => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Report Merged Successfully', 'success');
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
              <Table.Cell>Date</Table.Cell>
              <Table.Cell>{oreport.date.toLocaleString()}</Table.Cell>
              <Table.Cell>{report.date.toLocaleString()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Characteristics</Table.Cell>
              <Table.Cell>{oreport.animalCharacteristics}</Table.Cell>
              <Table.Cell>{report.animalCharacteristics}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Behavior</Table.Cell>
              <Table.Cell>{oreport.animalBehavior}</Table.Cell>
              <Table.Cell>{report.animalBehavior}</Table.Cell>
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

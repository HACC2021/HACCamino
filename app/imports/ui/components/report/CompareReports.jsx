import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Modal, Table } from 'semantic-ui-react';

const CompareReports = ({ report, oreport }) => {
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
      </Modal.Content>
    </Modal>
  </>);
};

CompareReports.propTypes = {
  report: PropTypes.object.isRequired,
  oreport: PropTypes.object.isRequired,
};

export default CompareReports;

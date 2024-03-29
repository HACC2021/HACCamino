import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Modal, Button, Icon, Tab, Image } from 'semantic-ui-react';
import { Reports } from '../../../api/report/ReportCollection';
import EditButton from './EditButton';
import ReviewButton from './ReviewButton';
import DeleteButton from './DeleteButton';
import CompareReports from './CompareReports';
import ImageItem from './ImageItem';
import ReportUpdateLog from './ReportUpdateLog';

const ReportItem = ({ report, updates }) => {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const relatedReport = Reports.getRelatedReports(report);
  let index = 0;
  const test = report.name;
  const panes = [];
  test.forEach(function () {
    const temp = {};
    temp.name = report.name[index];
    temp.phoneNumber = report.phoneNumber[index];
    // temp.accessKey = report.accessKey[index];
    temp.animalBehavior = report.animalBehavior[index];
    temp.animalCharacteristics = report.animalCharacteristics[index];
    temp.notes = report.notes[index];
    temp.people = report.people[index];
    temp.date = report.date[index];
    panes.push(
    {
      menuItem: index.toString(),
      render: function name() {
        return (
        <div>
          <p>Reporter Name: {temp.name}</p>
          <p>Phone Number: {temp.phoneNumber}</p>
          <p>Date: {temp.date}</p>
          <p>Location: {report.location}</p>
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
  const colorReport = (animal) => {
    switch (animal) {
      case 'Hawaiian Monk Seal':
        return 'rgba(39, 125, 161, 0.5)';
      case 'Sea Turtles':
        return 'rgba(129, 178, 154, 0.5)';
      case 'Sea Birds':
        return 'rgba(242, 204, 143, 0.5)';
      default:
        return ' ';
    }
  };
  const finalColor = colorReport(report.animal);
  return (
  <>
    <Modal
    onClose={() => setFirstOpen(false)}
    onOpen={() => setFirstOpen(true)}
    open={firstOpen}
    size='small'
    trigger={
      <Card style={{ backgroundColor: finalColor }}>
        <Card.Content>
          <Card.Header>{report.location} - {report.animal}</Card.Header>
          <Card.Description>
            <p>{report.date[0]}</p>
            <p>{report.island} - {report.location}</p>
            <p>{report.status}</p>
            <p>{report._id}</p>
          </Card.Description>
        </Card.Content>
      </Card>
    }
    >
      <Modal.Header>{report.location} - {report.animal}</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          <h3>Report(s)</h3>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
          <br/>
          <h3>Volunteer Comments</h3>
          <p>Status: {report.status}</p>
          <p>Comments: {report.link}</p>
          <br/>
          <h3>Image Gallery</h3>
          <Image.Group size='small'>
            {report.accessKey.map((img) => <ImageItem key={img} img={img}/>)}
          </Image.Group>
          <br/>
          <h3>Related Reports</h3>
          {relatedReport.length === 0 ? 'None'
            : <Card.Group style={{ paddingTop: '10px' }}>
            {relatedReport.map((reports) => <CompareReports report={reports} key={reports._id} oreport={report} />)}
          </Card.Group>}
          <h3>Update Log</h3>
          <ReportUpdateLog updates={updates}/>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <DeleteButton report={report} />
        <EditButton report={report} />
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
          <ReviewButton report={report}/>
        </Modal.Content>
      </Modal>
    </Modal>
  </>);
};

ReportItem.propTypes = {
  report: PropTypes.object.isRequired,
  updates: PropTypes.array.isRequired,
};

export default ReportItem;

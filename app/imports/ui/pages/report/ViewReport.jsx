import React, { useState } from 'react';
import { Container, Loader, Card, Form } from 'semantic-ui-react';
import { useTracker } from 'meteor/react-meteor-data';
import Select from 'react-select';
import { Reports } from '../../../api/report/ReportCollection';
import ReportItem from '../../components/report/ReportItem';
import Maps from '../../components/report/Maps';

const ViewReport = () => {
  const { ready, allReports } = useTracker(() => {
    const r = Reports.subscribeReportAdmin().ready();
    const a = Reports.getCurrentReports();
    return {
      ready: r,
      allReports: a,
    };
  }, []);
  const [finalAnimal, setFinalAnimal] = useState({ value: 'All', label: 'All' });
  const [finalIsland, setFinalIsland] = useState({ value: 'All', label: 'All' });
  const [status, setStatus] = useState({ value: 'All', label: 'All' });
  let temp = allReports;
  const animalDropdown = [
    { value: 'All', label: 'All' },
  { value: 'Hawaiian Monk Seal', label: 'Hawaiian Monk Seal' },
    { value: 'Sea Turtles', label: 'Sea Turtles' },
    { value: 'Sea Birds', label: 'Sea Birds' },
  ];
  const islandDropdown = [
    { value: 'All', label: 'All' },
    { value: 'Oʻahu', label: 'Oʻahu' },
    { value: 'Maui', label: 'Maui' },
    { value: 'Hawaiʻi', label: 'Hawaiʻi' },
    { value: 'Kauaʻi', label: 'Kauaʻi' },
    { value: 'Molokaʻi', label: 'Molokaʻi' },
    { value: 'Lānaʻi', label: 'Lānaʻi' },
    { value: 'Niʻihau', label: 'Niʻihau' },
    { value: 'Kahoʻolawe', label: 'Kahoʻolawe' },
  ];
  const approvedDropdown = [
    { value: 'All', label: 'All' },
    { value: 'pending', label: 'pending' },
    { value: 'approved', label: 'approved' },
  ];
    if (finalAnimal.value !== 'All') {
      let second = allReports.filter((report) => report.animal === finalAnimal.value);
      if (finalIsland.value !== 'All') {
        second = second.filter((report) => report.island === finalIsland.value);
      }
      if (status.value !== 'All') {
        second = second.filter((report) => report.status === status.value);
      }
      temp = second;
    } else {
      let second = allReports;
      if (finalIsland.value !== 'All') {
        second = second.filter((report) => report.island === finalIsland.value);
      }
      if (status.value !== 'All') {
        second = second.filter((report) => report.status === status.value);
      }
      temp = second;
    }
  return (
  <Container>
    { ready ?
    <div>
      <Form>
        <Form.Group widths='equal'>
          <Form.Field width={4} required>
            <label>Type Of Animal</label>
            <Select
            options={animalDropdown}
            name='animal'
            onChange={setFinalAnimal}
            defaultValue={finalAnimal}
            />
          </Form.Field>
          <Form.Field width={4} required>
            <label>Island</label>
            <Select
            options={islandDropdown}
            name='island'
            onChange={setFinalIsland}
            defaultValue={finalIsland}
            />
          </Form.Field>
          <Form.Field width={4} required>
            <label>Status</label>
            <Select
            options={approvedDropdown}
            name='status'
            onChange={setStatus}
            defaultValue={status}
            />
          </Form.Field>
        </Form.Group>
      </Form>
      <Maps allReports={temp} />
         <Card.Group style={{ paddingTop: '10px' }}>
           {temp.map((report) => <ReportItem report={report} key={report._id} />)}
         </Card.Group>
    </div>
    : <Loader>Loading</Loader>
    }
  </Container>
  );
};

export default ViewReport;

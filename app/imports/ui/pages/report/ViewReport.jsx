import React, { useState } from 'react';
import { Container, Loader, Card, Form } from 'semantic-ui-react';
import { useTracker } from 'meteor/react-meteor-data';
import Select from 'react-select';
import { Reports } from '../../../api/report/ReportCollection';
import ReportItem from '../../components/report/ReportItem';
import Maps from '../../components/report/Maps';
import { Updates } from '../../../api/updates/UpdateCollection';

const ViewReport = () => {
  const { ready, allReports, allReportUpdates } = useTracker(() => {
    const r = Reports.subscribeReportAdmin().ready()
      && Updates.subscribeUpdates().ready();
    const a = Reports.getCurrentReports();
    const u = Updates.getAllUpdatesVolunteer();
    return {
      ready: r,
      allReports: a,
      allReportUpdates: u,
    };
  }, []);
  const basic = { lat: 20.5, lng: -156.9 };
  let center = ({ lat: 20.5, lng: -156.9 });
  let zoom = (7.3);

  const convert = (arr) => {
    const selectList = [];
    arr.forEach(function (element) {
      selectList.push({ value: element, label: element._id });
    });
    return selectList;
  };

  const reportID = convert(allReports);

  const getUpdates = (id) => allReportUpdates.filter(update => update.reportID === id);
  const [finalSearch, setFinalSearch] = useState({ value: '', label: '' });
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
  const islandPane = (island) => {
    switch (island) {
      case 'Oʻahu':
        zoom = 10;
        center = ({ lat: 21.4389, lng: -158.0001 });
        break;
      case 'Maui':
        zoom = 10;
        center = ({ lat: 20.798363, lng: -156.3319 });
        break;
      case 'Hawaiʻi':
        zoom = 9;
        center = ({ lat: 19.5429, lng: -155.6659 });
        break;
      case 'Kauaʻi':
        zoom = 10;
        center = ({ lat: 22.0964, lng: -159.5261 });
        break;
      case 'Molokaʻi':
        zoom = 10;
        center = ({ lat: 21.1444, lng: -157.0226 });
        break;
      case 'Lānaʻi':
        zoom = 10;
        center = ({ lat: 20.8166, lng: -156.9273 });
        break;
      case 'Niʻihau':
        zoom = 10;
        center = ({ lat: 21.8921, lng: -160.1575 });
        break;
      case 'Kahoʻolawe':
        zoom = 10;
        center = ({ lat: 20.5580, lng: -156.6057 });
        break;
      default:
        zoom = 7.3;
        center = basic;
    }
  };
    if (ready) {
      if (finalSearch.label !== '') {
        temp = allReports.filter((report) => report._id === finalSearch.label);
        zoom = 13;
        center = ({ lat: finalSearch.value.lat, lng: finalSearch.value.lng });
      } else if (finalAnimal.value !== 'All') {
        let second = allReports.filter((report) => report.animal === finalAnimal.value);
        if (finalIsland.value !== 'All') {
          second = second.filter((report) => report.island === finalIsland.value);
          islandPane(finalIsland.value);
        }
        if (status.value !== 'All') {
          second = second.filter((report) => report.status === status.value);
        }
        temp = second;
      } else {
        let second = allReports;
        zoom = 7.3;
        center = basic;
        if (finalIsland.value !== 'All') {
          second = second.filter((report) => report.island === finalIsland.value);
          islandPane(finalIsland.value);
        }
        if (status.value !== 'All') {
          second = second.filter((report) => report.status === status.value);
        }
        temp = second;
      }
    }
    const clearHandle = () => {
      setFinalSearch({ value: '', label: '' });
    };
  return (
  <Container>
    { ready ?
    <div>
      <h2>View Reports</h2>
      <Form>
        <Form.Group widths='equal'>
          <Form.Field width={3}>
            <label>Type Of Animal</label>
            <Select
            options={animalDropdown}
            name='animal'
            onChange={setFinalAnimal}
            defaultValue={finalAnimal}
            />
          </Form.Field>
          <Form.Field width={3}>
            <label>Island</label>
            <Select
            options={islandDropdown}
            name='island'
            onChange={setFinalIsland}
            defaultValue={finalIsland}
            />
          </Form.Field>
          <Form.Field width={3}>
            <label>Status</label>
            <Select
            options={approvedDropdown}
            name='status'
            onChange={setStatus}
            defaultValue={status}
            />
          </Form.Field>
          <Form.Field width={4}>
            <label>Search By ID</label>
            <Select
            options={reportID}
            name='id'
            onChange={setFinalSearch}
            value={finalSearch}
            />
          </Form.Field>
          <Form.Field width={3}>
            <Form.Button onClick={clearHandle} style={{ marginTop: '25px' }}>Clear Search</Form.Button>
          </Form.Field>
        </Form.Group>
      </Form>
      <Maps allReports={temp} zoom={zoom} center={center} />
         <Card.Group style={{ paddingTop: '10px' }}>
           {temp.map((report) => <ReportItem
             report={report}
             updates={getUpdates(report._id)}
             key={report._id}
           />)}
         </Card.Group>
    </div>
    : <Loader>Loading</Loader>
    }
  </Container>
  );
};

export default ViewReport;

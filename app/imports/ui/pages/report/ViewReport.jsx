import React, { useState } from 'react';
import { Container, Loader, Card, Tab, Form } from 'semantic-ui-react';
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
  const [filter, setFilter] = useState(allReports);
  const animalDropdown = [
    { value: 'Hawaiian Monk Seal', label: 'Hawaiian Monk Seal' },
    { value: 'Sea Turtles', label: 'Sea Turtles' },
    { value: 'Sea Birds', label: 'Sea Birds' },
  ];
  const changeAnimal = async (e) => {
    await setFinalAnimal(e.value);
    await console.log(finalAnimal);
  };
  return (
  <Container>
    { ready ?
    <div>
      <Form>
        <Form.Group widths='equal'>
          <Form.Field width={8} required>
            <label>Type Of Animal</label>
            <Select
            options={animalDropdown}
            name='animal'
            onChange={changeAnimal}
            defaultValue={finalAnimal}
            />
          </Form.Field>
        </Form.Group>
      </Form>
      {/* <Maps allReports={birdReports} /> */}
      {/* <Card.Group style={{ paddingTop: '10px' }}> */}
      {/*  {birdReports.map((report) => <ReportItem report={report} key={report._id} />)} */}
      {/* </Card.Group> */}
    </div>
    : <Loader>Loading</Loader>
    }
  </Container>
  );
};

export default ViewReport;

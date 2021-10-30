import React from 'react';
import { Container, Loader, Card } from 'semantic-ui-react';
import { useTracker } from 'meteor/react-meteor-data';
import { Reports } from '../../../api/report/ReportCollection';
import ReportItem from '../../components/report/ReportItem';
import Maps from '../../components/report/Maps';

const ViewReport = () => {
  const listLoading = useTracker(() => {
    const handle = Reports.subscribeReportAdmin();
    return handle.ready();
  }, []);
  const allReports = Reports.getCurrentReports();
  return (
  <Container>
    { listLoading ?
    <div>
      <Maps allReports={allReports} />
      <Card.Group style={{ marginTop: '10px' }}>
        {allReports.map((report) => <ReportItem report={report} key={report._id} />)}
      </Card.Group>
    </div>
    : <Loader>Loading</Loader>
    }
  </Container>
  );
};

export default ViewReport;

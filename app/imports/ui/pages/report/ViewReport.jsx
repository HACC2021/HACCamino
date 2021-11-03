import React from 'react';
import { Container, Loader, Card, Tab } from 'semantic-ui-react';
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
  const pendingReports = Reports.getPendingReports();
  const approvedReports = Reports.getApprovedReports();
  const panes = [
    {
      menuItem: 'Pending Reports',
      render: function one() {
        return (
          <Tab.Pane attached={false}>
            <Card.Group>
              {pendingReports.map((report) => <ReportItem report={report} key={report._id} />)}
            </Card.Group>
        </Tab.Pane>
        );
      },
    },
    {
      menuItem: 'Approved Reports',
      render: function two() {
        return (
        <Tab.Pane attached={false}>
          <Card.Group>
            {approvedReports.map((report) => <ReportItem report={report} key={report._id} />)}
          </Card.Group>
        </Tab.Pane>
        );
      },
    },
  ];
  return (
  <Container>
    { listLoading ?
    <div>
      <Maps allReports={allReports} />
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    </div>
    : <Loader>Loading</Loader>
    }
  </Container>
  );
};

export default ViewReport;

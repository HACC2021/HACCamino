import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Reports } from '../../../api/report/ReportCollection';
import ReportItem from '../../components/report/ReportItem';
import Maps from '../../components/report/Maps';

const ViewReport = ({ ready, allReports }) => (
  <Container>
    { ready ?
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

ViewReport.propTypes = {
  ready: PropTypes.bool.isRequired,
  allReports: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const username = Meteor.user()?.username;
  const ready = Reports.subscribeReportAdmin().ready() && username !== undefined;
  const allReports = Reports.getCurrentReports();
  return {
    ready,
    allReports,
  };
})(ViewReport);

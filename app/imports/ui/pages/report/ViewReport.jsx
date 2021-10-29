import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Container, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Reports } from '../../../api/report/ReportCollection';

const ViewReport = ({ ready, allReports }) => {
  const placeHolder = 'placeHolder';
  console.log(allReports);
  return (
  <Container>
    { ready ?
    <div>
      {placeHolder}
    </div>
    : <Loader>Loading</Loader>
    }
  </Container>
  );
};

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

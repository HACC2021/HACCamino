import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

const ReportItem = ({ report }) => (
    <Card>
      <Card.Content>
        <Card.Header>{report.title}</Card.Header>
      </Card.Content>
    </Card>
  );

ReportItem.propTypes = {
  report: PropTypes.object.isRequired,
};

export default ReportItem;

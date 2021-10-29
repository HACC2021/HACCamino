import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Container, Card } from 'semantic-ui-react';

const ReportItem = ({ report }) => {
  const placeHolder = 'place holder';
  return (
    <Container>
      {placeHolder}
    </Container>
  );
};

ReportItem.propTypes = {
  report: PropTypes.object.isRequired,
};

export default ReportItem;

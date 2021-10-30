import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

const ReviewButton = ({ report }) => {
  const placeHolder = 'place holder';
  return (
    <Container>
      Welcome {report.name}
    </Container>
  );
};

ReviewButton.propTypes = {
  report: PropTypes.object.isRequired,
};

export default ReviewButton;

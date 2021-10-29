import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const ReviewButton = ({ report }) => {
  const placeHolder = 'place holder';
  return (
    <Button positive>
      Review
    </Button>
  );
};

ReviewButton.propTypes = {
  report: PropTypes.object.isRequired,
};

export default ReviewButton;

import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import { GetPhoto } from '../aws/GetPhoto';

const ImageItem = ({ img }) => {
  const src = GetPhoto(img);
  return (
    <Image src={src} />
  );
};

ImageItem.propTypes = {
  img: PropTypes.string.isRequired,
};

export default ImageItem;

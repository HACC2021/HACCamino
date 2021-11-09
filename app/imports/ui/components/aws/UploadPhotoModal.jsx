import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import UploadPhotoButton from './UploadPhotoButton';

const UploadPhotoModal = ({ parentCallback }) => {
  const [open, setOpen] = useState(false);
  const [data2, setData2] = useState([]);
  const handleClose = () => {
    setOpen(false);
    parentCallback(data2);
  };
  const handleCallback = (childData2) => {
    setData2(arr => [...arr, childData2]);
  };
  return (
  <Modal
  onClose={() => handleClose()}
  onOpen={() => setOpen(true)}
  open={open}
  trigger={ <Button>Upload Photo</Button> }
  >
    <Modal.Header>
      Upload Photo
    </Modal.Header>
    <Modal.Content>
      <UploadPhotoButton parentCallback2={handleCallback}/>
    </Modal.Content>
  </Modal>
  );
};

UploadPhotoModal.propTypes = {
  parentCallback: PropTypes.func.isRequired,
};

export default UploadPhotoModal;

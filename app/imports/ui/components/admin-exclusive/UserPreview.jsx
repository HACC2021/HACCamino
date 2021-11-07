import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, Image, Modal, Table } from 'semantic-ui-react';

const UserPreview = ({ userObj, page }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);

  const status = (userObj.active ?
    <div>
      Online <Icon size='tiny' name='circle' color='green'/>
    </div>
    :
    <div>
      Offline <Icon size='tiny' name='circle outline'/>
    </div>
  );

  const triggerComponent = (page === 'users' ?
      <Table.Row style={{ cursor: 'pointer' }}>
        <Table.Cell>{userObj.lastName}</Table.Cell>
        <Table.Cell>{userObj.firstName}</Table.Cell>
        <Table.Cell>{userObj.owner}</Table.Cell>
        <Table.Cell>{status}</Table.Cell>
      </Table.Row>
      : <a>{userObj.firstName} {userObj.lastName}</a>
  );

  return (
    <Modal
      size='small'
      closeIcon
      open={modalOpen}
      onClose={handleModalClose}
      onOpen={handleModalOpen}
      trigger={triggerComponent}
    >
      <Modal.Content image scrolling>
        <Image size='medium' src={`/images/${userObj.photoAWSKey}`}/>

        <Modal.Description>
          <Table basic='very' singleLine fixed>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={5}><b>Status</b></Table.Cell>
                <Table.Cell>{status}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell><b>Role</b></Table.Cell>
                <Table.Cell>{
                  userObj.role.charAt(0).toUpperCase() + userObj.role.slice(1)
                }</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell><b>First Name</b></Table.Cell>
                <Table.Cell>{userObj.firstName}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell><b>Last Name</b></Table.Cell>
                <Table.Cell>{userObj.lastName}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell><b>E-mail</b></Table.Cell>
                <Table.Cell>
                  <a href={`mailto:${userObj.owner}`}>
                    {userObj.owner}
                  </a>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

UserPreview.propTypes = {
  userObj: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired,
};

export default UserPreview;

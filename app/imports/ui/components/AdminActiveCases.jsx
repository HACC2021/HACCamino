import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, Image, Modal, Table } from 'semantic-ui-react';

const AdminActiveCases = ({ reportObj, page }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);

  const status = (reportObj.active ?
          <div>
            Online <Icon size='tiny' name='circle' color='green'/>
          </div>
          :
          <div>
            Offline <Icon size='tiny' name='circle outline'/>
          </div>
  );

  const triggerComponent = (page === 'report' ?
          <Table.Row style={{ cursor: 'pointer' }}>
            <Table.Cell>{reportObj.name}</Table.Cell>
            <Table.Cell>{reportObj.location}</Table.Cell>
            <Table.Cell>{reportObj.status}</Table.Cell>
            <Table.Cell>{reportObj.animal}</Table.Cell>
            <Table.Cell>{status}</Table.Cell>
          </Table.Row>
          : <a>{reportObj.firstName} {reportObj.lastName}</a>
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
          <Image size='medium' src={`/images/${reportObj.photoAWSKey}`}/>

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
                    reportObj.role.charAt(0).toUpperCase() + reportObj.role.slice(1)
                  }</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell><b>First Name</b></Table.Cell>
                  <Table.Cell>{reportObj.firstName}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell><b>Last Name</b></Table.Cell>
                  <Table.Cell>{reportObj.lastName}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell><b>E-mail</b></Table.Cell>
                  <Table.Cell>
                    <a href={`mailto:${reportObj.owner}`}>
                      {reportObj.owner}
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

AdminActiveCases.propTypes = {
  reportObj: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired,
};

export default AdminActiveCases;

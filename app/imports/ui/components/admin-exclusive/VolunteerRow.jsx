import React from 'react';
import { Image, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const VolunteerRow = ({ volunteerObj }) => (
  <Table.Row>
    <Table.Cell>{volunteerObj.lastName}</Table.Cell>
    <Table.Cell>{volunteerObj.firstName}</Table.Cell>
    <Table.Cell>{volunteerObj.owner}</Table.Cell>
    <Table.Cell>{volunteerObj.active ? 'Active' : 'Inactive'}</Table.Cell>
    <Table.Cell>
      <Image src={'app/public/images/default-photo.png'} fluid/>
    </Table.Cell>
  </Table.Row>
);

VolunteerRow.propTypes = {
  volunteerObj: PropTypes.object.isRequired,
};

export default VolunteerRow;

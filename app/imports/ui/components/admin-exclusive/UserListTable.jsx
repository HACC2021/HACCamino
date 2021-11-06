import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Table } from 'semantic-ui-react';
import UserPreview from './UserPreview';
import CustomPagination from '../CustomPagination';

const UserListTable = ({ arrayObjects }) => {
  // copy this part for pagination
  const maxRows = 15;
  const [rows, setRows] = useState(arrayObjects.slice(0, maxRows));
  const handlePageCallback = (childRows) => {
    setRows(childRows);
  };

  return (
    <>
      <Grid.Row>
        <Grid.Column>
          <Table celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Last Name</Table.HeaderCell>
                <Table.HeaderCell>First Name</Table.HeaderCell>
                <Table.HeaderCell>E-mail</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {rows.map((row) => <UserPreview
                key={row._id}
                userObj={row}
                page='users'
              />)}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column textAlign='center'>
          <CustomPagination
            maxRows={maxRows}
            arrayObjects={arrayObjects}
            parentCallback={handlePageCallback}
          />
        </Grid.Column>
      </Grid.Row>
    </>
  );
};

UserListTable.propTypes = {
  arrayObjects: PropTypes.array.isRequired,
};

export default UserListTable;

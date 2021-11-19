import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Grid, Header, Loader, Table } from 'semantic-ui-react';
import AdminActiveCases from './AdminActiveCases';
import CustomPagination from './CustomPagination';
import { Reports } from '../../api/report/ReportCollection';

const AdminListReports = () => {
  const { ready, allReports } = useTracker(() => ({
    ready: Reports.subscribeReportAdmin().ready(),
    allReports: Reports.getCurrentReports(),
  }), []);
  const maxRows = 15;
  const [rows, setRows] = useState(allReports.slice(0, maxRows));
  const handlePageCallback = (childRows) => {
    setRows(childRows);
  };
  // console.log(allReports);

  return (ready ?
      <Grid container textAlign='center'>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2" textAlign="center" content={'List of Reports'}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Table celled selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Location</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Animal</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {rows.map((row) => <AdminActiveCases
                    key={row._id}
                    reportObj={row}
                    page='reports'
                />)}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column textAlign='center'>
            <CustomPagination
                maxRows={maxRows}
                arrayObjects={allReports}
                parentCallback={handlePageCallback}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      : <Loader content={'Loading Reports\' Data'}/>);
};

export default AdminListReports;

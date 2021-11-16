import React, { useState } from 'react';
import { Card, Container, Loader } from 'semantic-ui-react';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxPopover, ComboboxList } from '@reach/combobox';
import { useTracker } from 'meteor/react-meteor-data';
import { Reports } from '../../../api/report/ReportCollection';
import ReportItem from '../../components/report/ReportItem';
import Maps from '../../components/report/Maps';

const ViewReport = () => {
  const listLoading = useTracker(() => {
    const handle = Reports.subscribeReportAdmin();
    return handle.ready();
  }, []);
  const approvedReports = Reports.getApprovedReports();
  const [search, setSearch] = useState('');
  const [searchArray, setSearchArray] = useState([]);
  const searchHandle = (address) => {
    setSearch(address);
    setSearchArray(approvedReports.filter((report) => report._id === address));
  };
  return (
  <Container>
    { listLoading ?
    <div>
      <h2>Search Approved Report</h2>
      <Maps allReports={searchArray} />
      <br/>
      <Combobox onSelect={searchHandle}>
        <ComboboxInput id='search-css' value={search} onChange={(e) => {
          setSearch(e.target.value);
        }}
                       placeholder='Search Location'
        />
        <ComboboxPopover>
          <ComboboxList>
            { approvedReports.map((report) => (<ComboboxOption
            key={report._id} value={report._id} />))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
      <Card.Group style={{ paddingTop: '10px' }}>
        {searchArray.map((report) => <ReportItem report={report} key={report._id} />)}
      </Card.Group>
    </div>
    : <Loader>Loading</Loader>
    }
  </Container>
  );
};

export default ViewReport;

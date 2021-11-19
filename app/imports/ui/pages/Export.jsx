import React, { useState, useEffect } from 'react';
import { Button, Container, Loader, Grid } from 'semantic-ui-react';
import { useTracker } from 'meteor/react-meteor-data';
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import { Reports } from '../../api/report/ReportCollection';
import { convertTime } from './export-functions/convertTime';
import { getInitials } from './export-functions/getInitials';
import { getSector } from './export-functions/getSector';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Export = () => {
    const listLoading = useTracker(() => {
        const handle = Reports.subscribeReportAdmin();
        return handle.ready();
    }, []);
    /*
    Seal Reports:
    accessKey
    animal
    animalBehavior
    animalCharacteristics
    date
    lat
    link
    lng
    location
    name
    notes
    people
    phonenumber
    status
    _id
    */

    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: 'selection',
        },
    ]);

    const [sealReports, setSealReports] = useState({});

    useEffect(() => {
        // eslint-disable-next-line max-len
        setSealReports(Reports.getReportsFromDateRange(state[0].startDate.toLocaleString(), state[0].endDate.toLocaleString()));
    }, [state]);

    const objectToCsv = (data) => {
        const csvRows = [];
        // get headers
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(','));
        // loop over rows
        // eslint-disable-next-line no-restricted-syntax
        for (const row of data) {
            const values = headers.map(header => `"${row[header]}"`);
            csvRows.push(values.join(','));
        }
        return csvRows.join('\n');
    };

    const download = (data) => {
        // eslint-disable-next-line no-undef
        const blob = new Blob([data], { type: 'text/csv' });
        // eslint-disable-next-line no-undef
        const url = window.URL.createObjectURL(blob);
        // eslint-disable-next-line no-undef
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'download.csv');
        // eslint-disable-next-line no-undef
        document.body.appendChild(a);
        a.click();
        // eslint-disable-next-line no-undef
        document.body.removeChild(a);
    };

    const getReport = async () => {
        const data = sealReports.map(row => ({
            Date: row.date[0].split(',')[0].replaceAll('/', ''),
            // Date: sealReports[row].date[0],
            Time: convertTime(row.date[0].split(',')[1]),
            TicketNumber: '',
            HotlineOperatorInitials: '',
            TicketType: 'I',
            ObserverInitials: getInitials(row.name[0]),
            ObserverType: 'P',
            Sector: getSector(row.lat, row.lng),
            Location: row.location,
            LocationNotes: '',
            SealPresent: 'Y',
            Size: 'U',
            Sex: 'U',
            BeachPosition: '1',
            HowIdendified: '',
            IDTemp: '',
            TagNumber: '',
            TagSide: '',
            TagColor: '',
            IDPerm: '',
            Molt: '',
            AdditionalNotesOnID: '',
            IDVerifiedBy: '',
            SealLogging: '',
            MomAndPupPair: '',
            SRASetUp: '',
            SRASetBy: '',
            NumOfVolunteersEngaged: row.people[0],
            SealDepartInfoAvil: '',
            SealDepartedDate: '',
            SealDepartedTime: '',
            OtherNotes: row.notes[0],
        }));
        if (data.length !== 0) {
            const csvData = objectToCsv(data);
            // console.log(csvData);
            download(csvData);
        } else {
            // eslint-disable-next-line max-len
            const headerData = 'Time, TicketNumber, HotlineOperatorInitials,TicketType, ObserverInitials, ObserverType, Sector, Location, LocationNotes, SealPresent, Size, Sex, BeachPosition, HowIdendified, IDTemp, TagNumber, TagSize, TagColor, IDPerm, Molt, AdditionalNotesOnID, IDVerifiedBy, SealLogging, MomAndPupPair, SRASetUp, SRASetBy, NumOfVolunteersEngaged, SealDepartInfoAvil, SealDepartedDate, SealDepartedTime, OtherNotes';
            download(headerData);
        }
    };

    return (
        <Container>
            {listLoading ?
                <Container>
                    <Grid>
                        <Grid.Row centered>
                            <DateRangePicker
                                onChange={item => setState([item.selection])}
                                showSelectionPreview={true}
                                moveRangeOnFirstSelection={false}
                                months={2}
                                ranges={state}
                                direction="horizontal"
                            />
                        </Grid.Row>
                        <Grid.Row>
                            <Button id='export-button' onClick={getReport}>Export csv</Button>
                        </Grid.Row>
                    </Grid>
                </Container>
                :
                <Loader>Loading</Loader>}
        </Container>
    );
};

export default Export;

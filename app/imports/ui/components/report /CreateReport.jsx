import React, { useState } from 'react';
import { Container, Button, Grid } from 'semantic-ui-react';
import swal from 'sweetalert';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { reportDefineMethod } from '../../../api/report/ReportCollection.methods';

const containerStyle = {
  width: '100%',
  height: '500px',
  marginTop: '10px',
};

const center = {
  lat: 21.5,
  lng: -158,
};

const CreateReport = () => {
  // Google Maps
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'secret',
  });
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const onMapClick = React.useCallback((event) => {
    setMarkers([{ time: new Date(), lat: event.latLng.lat(), lng: event.latLng.lng() }]);
  }, []);

  // Form Hooks
  const [finalName, setFinalName] = useState(() => '');
  const [finalLocation, setFinalLocation] = useState(() => '');
  const [finalCharacteristics, setFinalCharacteristics] = useState(() => '');
  const [finalAnimalBehavior, setFinalAnimalBehavior] = useState(() => '');
  const [finalPeople, setFinalPeople] = useState(0);
  const [finalPhone, setFinalPhone] = useState(() => '');
  const [finalNotes, setFinalNotes] = useState(() => '');

  const onSubmit = () => {
    const definitionData = {};
    definitionData.name = finalName;
    definitionData.date = new Date();
    definitionData.location = finalLocation;
    definitionData.characteristics = finalCharacteristics;
    definitionData.animalBehavior = finalAnimalBehavior;
    definitionData.people = finalPeople;
    definitionData.phone = finalPhone;
    definitionData.notes = finalNotes;
    definitionData.lat = markers[0].lat;
    definitionData.lng = markers[0].lng;
    definitionData.accessKey = '';
    reportDefineMethod.call(definitionData,
    error => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Report Created Successfully',
        'success');
      }
      setFinalName('');
      setFinalLocation('');
      setFinalCharacteristics('');
      setFinalAnimalBehavior('');
      setFinalPeople(1);
      setFinalPhone('');
      setFinalNotes('');
    });
  };
  return (
    <Container>
      <h2>Create Report</h2>
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <label>Name</label>
            <input placeholder='Name' onChange={ e => setFinalName(e.target.value)}/>
          </Grid.Column>
          <Grid.Column width={8}>
            <label>Location</label>
            <input placeholder='Location' onChange={ e => setFinalLocation(e.target.value)}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <label>Animal Characteristics</label>
            <input placeholder='characteristics' onChange={ e => setFinalCharacteristics(e.target.value)}/>
          </Grid.Column>
          <Grid.Column width={8}>
            <label>Animal Behavior</label>
            <input placeholder='behavior' onChange={ e => setFinalAnimalBehavior(e.target.value)}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <label>Number Of People Around The Area</label>
            <input placeholder='people' onChange={ e => setFinalPeople(e.target.value)}/>
          </Grid.Column>
          <Grid.Column width={8}>
            <label>Phone Number</label>
            <input placeholder='(xxx)' onChange={ e => setFinalPhone(e.target.value)}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <label>Extra Notes</label>
            <input placeholder='notes' onChange={ e => setFinalNotes(e.target.value)}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      { isLoaded ?
      <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onClick={onMapClick}
      >
        {markers.map(marker => <Marker
        key={marker.time.toISOString()}
        position={{ lat: marker.lat, lng: marker.lng }}
        onClick={() => {
          setSelected(marker);
        }}/>)}

        {selected ? (<InfoWindow
        position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => { setSelected(null); }}>
          <div>
            <h4> Location Of Report </h4>
          </div>
        </InfoWindow>) : null }
      </GoogleMap> : ' '
      }
      <Button onSubmit={onSubmit}>
        Submit
      </Button>
    </Container>
  );
};

export default CreateReport;

import React, { useState } from 'react';
import { Container, Button, Form, TextArea } from 'semantic-ui-react';
import Select from 'react-select';
import swal from 'sweetalert';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { reportDefineMethod } from '../../../api/report/ReportCollection.methods';

const containerStyle = {
  width: '100%',
  height: '500px',
  margin: '10px 0px',
};

const center = {
  lat: 21.5,
  lng: -158,
};

const CreateReport = () => {
  // Google Maps
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: '',
  });
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const onMapClick = React.useCallback((event) => {
    setMarkers([{ time: new Date(), lat: event.latLng.lat(), lng: event.latLng.lng() }]);
  }, []);

  // Form Hooks
  const [finalTitle, setFinalTitle] = useState(() => '');
  const [finalName, setFinalName] = useState(() => '');
  const [finalLocation, setFinalLocation] = useState(() => '');
  const [finalCharacteristics, setFinalCharacteristics] = useState(() => '');
  const [finalAnimalBehavior, setFinalAnimalBehavior] = useState(() => '');
  const [finalPeople, setFinalPeople] = useState(0);
  const [finalPhone, setFinalPhone] = useState(() => '');
  const [finalNotes, setFinalNotes] = useState('');
  const [finalAnimal, setFinalAnimal] = useState('');

  const animalDropdown = [
    { value: 'Hawaiian Monk Seal', label: 'Hawaiian Monk Seal' },
    { value: 'Sea Turtles', label: 'Sea Turtles' },
    { value: 'Sea Birds', label: 'Sea Birds' },
  ];

  const onSubmit = () => {
    const definitionData = {};
    definitionData.title = finalTitle;
    definitionData.name = finalName;
    definitionData.date = new Date();
    definitionData.location = finalLocation;
    definitionData.animalCharacteristics = finalCharacteristics;
    definitionData.animalBehavior = finalAnimalBehavior;
    definitionData.people = finalPeople;
    definitionData.phoneNumber = finalPhone;
    if (finalNotes.length < 1) {
      definitionData.notes = 'Nothing';
    } else {
      definitionData.notes = finalNotes;
    }
    if (markers[0] !== undefined) {
      definitionData.lat = markers[0].lat;
      definitionData.lng = markers[0].lng;
    }
    definitionData.link = 'empty';
    definitionData.accessKey = 'blank';
    definitionData.status = 'pending';
    definitionData.animal = finalAnimal.value;
    reportDefineMethod.call(definitionData,
    error => {
      if (error) {
        let errorMessage = ' ';
        if (error.message.substring(0, 3) === 'Lat') {
          errorMessage = ' Please Place A Marker On The Google Map ';
        } else {
          errorMessage = error.message.substring(0, error.message.indexOf('required') + 8);
        }
        swal('Error', errorMessage, 'error');
      } else {
        swal('Success', 'Report Added Successfully', 'success');
        setFinalTitle('');
        setFinalAnimal('');
        setFinalName('');
        setFinalLocation('');
        setFinalCharacteristics('');
        setFinalAnimalBehavior('');
        setFinalPeople(1);
        setFinalPhone('');
        setFinalNotes('');
      }
    });
  };
  return (
    <Container>
      <h2>Create Report</h2>
      <Form>
        <Form.Group widths='equal'>
          <Form.Field width={8} required>
            <label>Title Of Report</label>
            <input placeholder='Title' value={finalTitle} onChange={ e => setFinalTitle(e.target.value)}/>
          </Form.Field>
          <Form.Field width={8} required>
            <label>Type Of Animal</label>
            <Select
            options={animalDropdown}
            name='animal'
            onChange={setFinalAnimal}
            defaultValue={finalAnimal}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field width={8} required>
            <label>Name</label>
            <input placeholder='Name' value={finalName} onChange={ e => setFinalName(e.target.value)}/>
          </Form.Field>
          <Form.Field width={8} required>
            <label>Location</label>
            <input placeholder='Location' value={finalLocation} onChange={ e => setFinalLocation(e.target.value)}/>
          </Form.Field>
        </Form.Group>
        <Form.Group width='equal'>
          <Form.Field width={8} required>
            <label>Animal Characteristics</label>
            <input placeholder='characteristics'
                   value={finalCharacteristics} onChange={ e => setFinalCharacteristics(e.target.value)}/>
          </Form.Field>
          <Form.Field width={8} required>
            <label>Animal Behavior</label>
            <input placeholder='behavior'
                   value={finalAnimalBehavior} onChange={ e => setFinalAnimalBehavior(e.target.value)}/>
          </Form.Field>
        </Form.Group>
        <Form.Group width='equal'>
          <Form.Field width={8} required>
            <label>Number Of People Around The Area</label>
            <input type='number' placeholder='people' value={finalPeople}
                   onChange={ e => setFinalPeople(e.target.value)}/>
          </Form.Field>
          <Form.Field width={8} required>
            <label>Phone Number</label>
            <input placeholder='(xxx)' value={finalPhone} onChange={ e => setFinalPhone(e.target.value)}/>
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field
          width={16}
          id='form-textarea-control-opinion'
          control={TextArea}
          label='Notes'
          placeholder='Notes'
          value={finalNotes}
          onChange={ e => setFinalNotes(e.target.value)}
          />
        </Form.Group>
        <Form.Field required>
          <label>Please Place A Marker On The Google Map</label>
        </Form.Field>
      </Form>
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
      <Button onClick={onSubmit}>
        Submit
      </Button>
    </Container>
  );
};

export default CreateReport;

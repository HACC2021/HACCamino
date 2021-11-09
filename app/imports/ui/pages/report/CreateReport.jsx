import React, { useState } from 'react';
import { Container, Button, Form, TextArea } from 'semantic-ui-react';
import Select from 'react-select';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import Swal from 'sweetalert2';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxPopover, ComboboxList } from '@reach/combobox';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { reportDefineMethod } from '../../../api/report/ReportCollection.methods';
import '@reach/combobox/styles.css';
import mapStyle from '../../components/report/googleMapStyle';
import UploadPhotoModal from '../../components/aws/UploadPhotoModal';

const containerStyle = {
  width: '100%',
  height: '500px',
  margin: '10px 0px',
};

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

const libraries = ['places'];

const CreateReport = () => {
  // Google Maps
  const [center, setCenter] = useState({ lat: 21.5, lng: -158 });
  const [zoom, setZoom] = useState(10);
  // eslint-disable-next-line no-undef
  navigator.geolocation.getCurrentPosition((position) => {
    setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
    setZoom(16);
  },
  () => null, { timeout: 5000 });
  const panTo = (lat, lng) => {
    setCenter({ lat: lat, lng: lng });
    setZoom(16);
  };
  const Search = () => {
    const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => 21.5, lng: () => -158 },
    radius: 2 * 1000,
      },
    });

    const searchHandle = async (address) => {
      setValue(address, false);
      clearSuggestions();
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo(lat, lng);
    };

    return (
    <div className='google-bar'>
      <Combobox onSelect={searchHandle}>
        <ComboboxInput id='form-css' value={value} onChange={(e) => {
          setValue(e.target.value);
        }}
          disabled={!ready}
                       placeholder='Search Location'
                       />
        <ComboboxPopover>
          <ComboboxList>
            { status === 'OK' && data.map(({ description }) => (<ComboboxOption
            key={description} value={description} />))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
    );
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: '',
    libraries,
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
  // aws hosting
  const [data, setData] = useState([]);
  const handleCallback = (childData) => {
    setData(arr => [...arr, childData]);
  };
  const onSubmit = () => {
    const definitionData = {};
    definitionData.title = finalTitle;
    definitionData.name = finalName;
    definitionData.date = new Date().toLocaleString();
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
    definitionData.link = 'pending';
    const temp = [];
    let index = 0;
    data.forEach(function () {
      temp.push(data[index]);
      index++;
    });
    definitionData.accessKey = temp[0];
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
        Swal.fire('Error', errorMessage, 'error');
      } else {
        Swal.fire('Success', 'Report Added Successfully', 'success');
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
          <label>Please Upload A Picture Of The Animal</label>
          <UploadPhotoModal parentCallback={handleCallback}/>
        </Form.Field>
        <Form.Field required>
          <label>Please Place A Marker On The Google Map</label>
        </Form.Field>
      </Form>
      <div>
      </div>
      { isLoaded ?
      <div>
        <Search />
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onClick={onMapClick}
        options={options}
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
        </GoogleMap>
      </div> : ' '
      }
      <Button onClick={onSubmit}>
        Submit
      </Button>
    </Container>
  );
};

export default CreateReport;

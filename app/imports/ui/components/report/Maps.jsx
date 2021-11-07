import React, { useState } from 'react';
import { Container, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import ReportItem from './ReportItem';
import mapStyle from './googleMapStyle';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 21.5,
  lng: -158,
};

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

const libraries = ['places'];

const Maps = ({ allReports }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: '',
    libraries,
  });
  const [selected, setSelected] = useState(null);
  return (
    <Container>
      { isLoaded ?
      <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      options={options}
      >
        {allReports.map(marker => <Marker
        key={marker.lat + marker.lng}
        position={{ lat: marker.lat, lng: marker.lng }}
        onClick={() => { setSelected(marker); }}
        />)}
        {selected ? (
        <InfoWindow
        position={{ lat: selected.lat, lng: selected.lng }}
        onCloseClick={() => { setSelected(null); }}
        >
          <div>
            <ReportItem key={selected._id} report={selected}/>
          </div>
        </InfoWindow>
          ) : null }
      </GoogleMap> :
      <Loader> Loading </Loader>
      }
    </Container>
  );
};

Maps.propTypes = {
  allReports: PropTypes.array.isRequired,
};

export default Maps;

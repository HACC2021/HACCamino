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

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

const libraries = ['places'];

const Maps = ({ allReports, center, zoom }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: '',
    libraries,
  });
  const [selected, setSelected] = useState(null);
  const sealReports = allReports.filter((report) => report.animal === 'Hawaiian Monk Seal');
  const birdReports = allReports.filter((report) => report.animal === 'Sea Birds');
  const turtleReports = allReports.filter((report) => report.animal === 'Sea Turtles');
  return (
    <Container>
      { isLoaded ?
      <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      options={options}
      >
        {sealReports.map(marker => <Marker
        key={marker.lat + marker.lng}
        position={{ lat: marker.lat, lng: marker.lng }}
        icon={{
          url: 'images/blueMarker.png',
          scale: 2,
        }}
        onClick={() => { setSelected(marker); }}
        />)}
        {birdReports.map(marker => <Marker
        key={marker.lat + marker.lng}
        position={{ lat: marker.lat, lng: marker.lng }}
        icon={{
          url: 'images/tanMarker.png',
          scale: 2,
        }}
        onClick={() => { setSelected(marker); }}
        />)}
        {turtleReports.map(marker => <Marker
        key={marker.lat + marker.lng}
        position={{ lat: marker.lat, lng: marker.lng }}
        icon={{
          url: 'images/greenMarker.png',
          scale: 2,
        }}
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
  center: PropTypes.object.isRequired,
  zoom: PropTypes.number.isRequired,
};

export default Maps;

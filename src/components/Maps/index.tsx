import React, { useState } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '1000px',
  height: '500px'
};

const center = {
  lat: -8.05428,
  lng: -34.8813
};
const position = {
  lat: -7.080,
  lng: -41.4583
}


export default function MyComponent() {

const [mouse,setMouse]= useState({showInfoWindow:false});
  const handleMouseOver = ()=> {
    setMouse({
        showInfoWindow: true
    });
};
const handleMouseExit = () => {
    setMouse({
        showInfoWindow: false
    });
};

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyA5ynBs1BxZYrCebESiQloFSZIiALVBGzg"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        { /* Child components, such as markers, info windows, etc. */ }

    <Marker
      position={position}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseExit}
    > {mouse.showInfoWindow && (
        <InfoWindow>
            <h4>teste</h4>
        </InfoWindow>
  )}</Marker>

      </GoogleMap>
    </LoadScript>
  )
}



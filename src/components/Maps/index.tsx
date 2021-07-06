import React, { useState } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { AreaPoints } from '../../store/ducks/areas/types';
import { useEffect } from 'react';

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

const points =[
  {
    lat: -8.0235849,
    lng: -34.9040313
  },
  {
    lat: -7.993208099999999,
    lng: -34.9097491

  }
]

interface IMapsProps {
  points: any[]
}
export default function MyComponent(props: IMapsProps) {


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
        {props.points?.map((point, index) => (
   <Marker key={index} position={{lat:parseFloat(point.geolocation.latitude),lng:parseFloat(point.geolocation.longitude)}}
    onMouseOver={handleMouseOver}
    onMouseOut={handleMouseExit}>
      {mouse.showInfoWindow && (
        <InfoWindow>
            <h4>{point.street}</h4>
        </InfoWindow>
      )}
   </Marker>
  ))}



    {/* <Marker
      position={position}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseExit}
    > {mouse.showInfoWindow && (
        <InfoWindow>
            <h4>teste</h4>
        </InfoWindow>
  )}</Marker> */}

      </GoogleMap>
    </LoadScript>
  )
}



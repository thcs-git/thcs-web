import React, { useState } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker, MarkerProps } from '@react-google-maps/api';
import { AreaPoints } from '../../store/ducks/areas/types';
import { useEffect } from 'react';
import { Button } from '@material-ui/core';

const containerStyle = {
  width: '1000px',
  height: '500px'
};

const center = {
  lat: -8.05428,
  lng: -34.8813
};




interface IMapsProps {
  points: any[];
}

interface PropsCheck {
  [key: string]: any
}

export default function MyComponent(props: IMapsProps) {

const [commentShown, setCommentShown] = useState<PropsCheck>({});
const [mouse,setMouse]= useState({showInfoWindow:true});
  const handleMouseOver = (index:any) => {
   console.log(index);
   setCommentShown(prev => Boolean(!prev[index]) ? {...prev, [index]: true} : {...prev, [index]: false});
    // setMouse({
    //     showInfoWindow: true
    // });
};
const coordenadas = (point:any)=>{

  let coordenadas = {
    lat:0,
    lng:0
  }
  if(point.address.geolocation){
    coordenadas.lat = point.address.geolocation.latitude;
    coordenadas.lng = point.address.geolocation.longitude;
  }else{
    return center;
  }

  return coordenadas;
}
  const handleMouseExit = (index:any) => {
    setCommentShown(prev => Boolean(!prev[index]) ? {...prev, [index]: true} : {...prev, [index]: false});
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
          <Marker position={coordenadas(point)}
            onMouseOver={()=>{
              handleMouseOver(index)}}
            onMouseOut={()=>{handleMouseExit(index)}}>
            {commentShown[index] && (
              <InfoWindow>
                <>
                <h3>{point.name}</h3>
                <h4>{point.address.street} - {point.address.number}</h4>
                <h4>{point.address.district} - {point.address.state}</h4>
                </>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </LoadScript>
  )
}



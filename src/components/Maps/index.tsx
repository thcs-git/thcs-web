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
          <Marker position={{lat:parseFloat(point.address.geolocation.latitude),lng:parseFloat(point.address.geolocation.longitude)}}
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



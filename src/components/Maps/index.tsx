import React, { useState } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
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
  points: any[]
}
export default function MyComponent(props: IMapsProps) {

  useEffect(()=>{
     console.log(props.points);
  },[])
  const [shownInfo, setShownInfo] = useState({});
  const [info, setInfo] = useState({});


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


  const [commentShown, setCommentShown] = useState({});

  const toggleComment = (id:any) => {
    setCommentShown((prev:any) => Boolean(!prev[id]) ? {...prev, [id]: true} : {...prev, [id]: false});
  };

  return (
    <>
      {props.points?.map(obj =>
        <Button key={obj._id}>
          { obj.name ? <img onClick={() => toggleComment(obj._id)}/> : null }
          <div>{obj.name}</div>
          {/* { commentShown[obj._id] ? <p>{obj.street}</p> : null } */}
        </Button>
      )}
    </>
  );


  // return (
  //   <LoadScript
  //     googleMapsApiKey="AIzaSyA5ynBs1BxZYrCebESiQloFSZIiALVBGzg"
  //   >
  //     <GoogleMap
  //       mapContainerStyle={containerStyle}
  //       center={center}
  //       zoom={12}
  //     >
  //       {props.points?.map((point, index) => (
  //       <Marker key={index}  position={{lat:parseFloat(point.address.geolocation.latitude),lng:parseFloat(point.address.geolocation.longitude)}}
  //         onMouseOver={handleMouseOver}
  //         onMouseOut={handleMouseExit}>
  //         {shownInfo[index] && (
  //           <InfoWindow>
  //           <>
  //             <h4>{point.name}</h4>
  //             <h5>{point.address.street} - {point.address.number}</h5>
  //             <h5>{point.address.district}</h5>
  //             <h5>{point.address.city}</h5>
  //           </>
  //           </InfoWindow>
  //         )}
  //       </Marker>
  //       ))}
  //     </GoogleMap>
  //   </LoadScript>
  // )
}



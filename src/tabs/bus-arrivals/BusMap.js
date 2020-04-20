import React, { useState, useEffect} from 'react';
import MapGl, {Popup, GeolocateControl, Marker} from 'react-map-gl';

import { getBusArrivalsByStop } from "./BusArrivalsService";


const geolocateStyle = {
  float: 'left',
  margin: '50px',
  padding: '10px'
};

var busArrivalsRes;

function BusMap() {

  const [viewport, setViewport] = useState({
    width: '100%',
    height: 'calc(100vh - 56px)',
    zoom: 15,
    latitude: 33.748997,
    longitude: -84.387985,
  });

  const [stopInfo, setStopInfo] = useState();

  const _onViewportChange = viewport => setViewport({...viewport})

  const handleClick = event => {
    const {
      features,
      lngLat,
    } = event;
    console.log(features);
    console.log(lngLat);
	
	if(features[0] != undefined){
		var stopClick = features[0].properties.stop_id;
		console.log(stopClick);		//stop_id
		if(stopClick != null) {
			busArrivalsRes = getBusArrivalsByStop(stopClick);
		}
	}
	
	
	
    try {
      if (features[0].sourceLayer == "stops") {
        const {
          stop_code,
          stop_id,
          stop_name,
        } = features[0].properties;

        setStopInfo({
          stop_code: stop_code,
          stop_id: stop_id,
          stop_name: stop_name,
          lng: lngLat[0],
          lat: lngLat[1]
        })
      }

    } catch (e) {
      setStopInfo(null)
    }
  };

  
  
  const renderPopup = () => {

    return (
        stopInfo && (
            <Popup
                tipSize={5}
                anchor="top"
                longitude={stopInfo.lng}
                latitude={stopInfo.lat}
                closeOnClick={false}
                onClose={() => setStopInfo(null)}
            >
              <div>{stopInfo.stop_name} <br></br> <b>{stopInfo.stop_id}</b></div>
            </Popup>
        )
    );
  };

  return (
      <div className="App">
        <MapGl
            {...viewport}
            onViewportChange={_onViewportChange}
            onClick={handleClick}
            mapStyle="mapbox://styles/jdavis410/ck7dlurt80ppy1is1ctxxxb4b"
            mapboxApiAccessToken={'pk.eyJ1IjoiamRhdmlzNDEwIiwiYSI6ImNrNzB1MHg5OTAwNWczbXF3MHpjYnMyZncifQ.B3T_bzVcUxuxp1QymoeegQ'}
        >
          <GeolocateControl
              style={geolocateStyle}
              positionOptions={{enableHighAccuracy: true}}
              trackUserLocation={true}
          />
          {renderPopup()}
        </MapGl>
      </div>
  );
}

export default BusMap;

import React, { useState, useEffect} from 'react';
import MapGl, {Popup, GeolocateControl, Marker} from 'react-map-gl';
import BusMap from "./BusMap";

import busses from './BusMap'

import { getBusArrivalsByStop } from "./BusArrivalsService";


const geolocateStyle = {
  float: 'left',
  margin: '50px',
  padding: '10px'
};

var busArrivalsRes;


function RouteMap() {

  const [viewport, setViewport] = useState({
    width: '100%',
    height: 'calc(100vh - 56px)',
    zoom: 15,
    latitude: 33.748997,
    longitude: -84.387985,
  });

  const [stopInfo, setStopInfo] = useState();
  
  const [busInfo, setBusInfo] = useState();

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
			console.log('Received answer from BusarrivalService');
			console.log(busArrivalsRes);
			
			busArrivalsRes.then(resp => {
				for(var i  = 0; i < resp.length; i++){
					console.log(resp[i]);
					
					var temp = '{ "LATITUDE":' + resp[i].LATITUDE + ', "LONGITUDE":' + resp[i].LONGITUDE + '}';
					busses.push(JSON.parse(temp));
				}
				console.log(busses[0].LATITUDE);
			});
			
			//TODO make popups based on lat/long busses[i].LATITUDE, busses[i].LONGITUDE
			
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
  
  const renderBusPopup = () => {
	
	var t = busses.pop();
	if(t == undefined){
		t = JSON.parse('{ "LATITUDE":' + 0 + ', "LONGITUDE":' + 0 + '}');
	}
	  
	return (
		
		<Marker
			longitude={t.LONGITUDE}
			latitude={t.LATITUDE}
			closeOnClick={false}
		> 
		 <img src="./bus.png" alt=""/>
		</Marker>
		
	);
  };
	

  return (
      <div className="App">
        <MapGl
            {...viewport}
            onViewportChange={_onViewportChange}
            onClick={handleClick}
            mapStyle='mapbox://styles/mapbox/streets-v11'
            mapboxApiAccessToken={'pk.eyJ1IjoiamRhdmlzNDEwIiwiYSI6ImNrNzB1MHg5OTAwNWczbXF3MHpjYnMyZncifQ.B3T_bzVcUxuxp1QymoeegQ'}
        >
          <GeolocateControl
              style={geolocateStyle}
              positionOptions={{enableHighAccuracy: true}}
              trackUserLocation={true}
          />
		  
		  
			  
          //{renderPopup()}
			  {renderBusPopup()}
		
        </MapGl>
      </div>
	  
  );
}

export default RouteMap;

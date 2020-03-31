import React, { useState, useEffect} from 'react';
import MapGl, {Popup, GeolocateControl} from 'react-map-gl';


const geolocateStyle = {
  float: 'left',
  margin: '50px',
  padding: '10px'
};

function BusMap() {

  const [viewport, setViewport] = useState({
    width: '100%',
    height: 'calc(100vh - 56px)',
    zoom: 15,
    latitude: 0,
    longitude: 0,
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
              <div>{stopInfo.stop_name}</div>
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

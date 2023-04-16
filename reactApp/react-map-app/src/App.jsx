import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Header } from "./components/Header";
import { LeftMenu } from "./components/LeftMenu";
// import MainContent from "./MainContent";
import "./styles.css";



export const App = () => {
  const [center, setCenter] = useState({ lat: 35.681167, lng: 139.767052 });
  const [pinCoords, setPinCoords] = useState(
    Array.from({ length: 2 }, () => ({ lat: 35.681167, lng: 139.767052 }))
  );
  const [zoom, setZoom] = useState(15);
  const [searchValue, setSearchValue] = useState("");
  const [pinNum, setPinNum] = useState(3);
  const onChangePinNum = (e) => {
    const num = parseInt(e.target.value, 10);
    setPinNum(num);
    setPinCoords(
      Array.from({ length: num }, () => ({ lat: center.lat, lng: center.lng }))
    );
  };
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [markers, setMarkers] = useState([]);

  // 入力された地名をGeocoding APIを使用して経度緯度に変換し、center座標を更新
  const handleSearch = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      {
        address: searchValue,
      },
      (results, status) => {
        if (status === "OK") {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          setCenter({ lat, lng });
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      }
    );
  };
  const defaultLatLng = {
    lat: 35.675069,
    lng: 139.763328,
  };

  const addPinCoord = () => {
    setPinCoords([...pinCoords, { lat: center.lat, lng: center.lng }]);
  };

  const handleApiLoaded = ({ map, maps }) => {
    setMap(map);
    setMaps(maps);
    const newMarkers = pinCoords.map((coord) => {
      return new maps.Marker({
        map,
        position: coord,
      });
    });
    setMarkers(newMarkers);
  };

  const setLatLng = ({ lat, lng }) => {
    if (markers[pinNum - 1]) {
      markers[pinNum - 1].setMap(null);
    }
    const latLng = {
      lat,
      lng,
    };
    const newMarkers = markers.map((marker, index) => {
      if (index === pinNum - 1) {
        return new maps.Marker({
          map,
          position: latLng,
        });
      }
      return marker;
    });
    setMarkers(newMarkers);
    setPinCoords(pinCoords.map((coord, index) => (index === pinNum - 1 ? latLng : coord)));
    map.panTo(latLng);
  };


  return (
    <>
      <Header />
      <div className="container">
        <LeftMenu
          // pinLocs={pinLocs}
          pinNum={pinNum}
          onChange={onChangePinNum}
        />
        <div className="main-contents">
          <div className="input-area">
            <input
              placeholder="地図を移動"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button onClick={handleSearch}>検索</button>
          </div>
          <div className="map-area">
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
              center={center}
              zoom={zoom}
              onClick={setLatLng}
              onGoogleApiLoaded={handleApiLoaded}
            />
          </div>
        </div>
      </div>
    </>
  )

};

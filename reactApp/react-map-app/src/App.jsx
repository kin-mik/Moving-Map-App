import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Header } from "./components/Header";
import { LeftMenu } from "./components/LeftMenu";
// import MainContent from "./MainContent";
import "./styles.css";



export const App = () => {
  const [center, setCenter] = useState({ lat: 35.681167, lng: 139.767052 });
  const [pinCoords, setPinCoords] = useState([{ lat: 35.681167, lng: 139.767052 }]);
  const [zoom, setZoom] = useState(15);
  const [searchValue, setSearchValue] = useState("");
  const [pinValue, setPinValue] = useState([]);
  const [pinNum, setPinNum] = useState(3);
  const onChangePinNum = (e) => setPinNum(e.target.value);
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
  // const defaultLatLng = {
  //   lat: 35.675069,
  //   lng: 139.763328,
  // };

  // const handleApiLoaded = (object) => {
  //   setMap(object.map);
  //   setMaps(object.maps);
  // };
  
  // const setLatLng = ({ lat, lng }) => {
  //     // if (markers) {
  //     //   markers.setMap(null);
  //     // }
  //     const latLng = {
  //       lat,
  //       lng,
  //     };
  //     const marker = new maps.Marker({
  //       map,
  //       position: latLng,
  //     })

  //    setMaps(...markers, marker);
  //     map.panTo(latLng);
  
  // };


  return (
    <>
      <Header />
      <div className="container">
        <LeftMenu
          // pinLocs={pinLocs}
          pinNum={pinNum}
          onChange={onChangePinNum}
          handleSearch={handleSearch}
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
              // onClick={setLatLng}
              // onGoogleApiLoaded={handleApiLoaded}
              // yesIWantToUseGoogleMapApiInternals={true}
            />
          </div>
        </div>
      </div>
    </>
  )

};

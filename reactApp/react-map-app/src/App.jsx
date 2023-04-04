import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Header } from "./components/Header";
import { LeftMenu } from "./components/LeftMenu";
// import MainContent from "./MainContent";
import "./styles.css";



export const App = () => {
  const [center, setCenter] = useState({ lat: 35.681167, lng: 139.767052 });
  const [zoom, setZoom] = useState(15);
  const [searchValue, setSearchValue] = useState("");
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


  return (
    <>
      <Header />
      <div className="container">
        <LeftMenu />
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
              // bootstrapURLKeys={{ key: "AIzaSyAMQiUaZvE2RY8GL-LkNVK6l8jV3lWG0Z8" }}
              center={center}
              zoom={zoom}
            />
          </div>
        </div>
      </div>
    </>
  )

};

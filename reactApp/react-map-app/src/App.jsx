import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Header } from "./components/Header";
// import LeftMenu from "./LeftMenu";
// import MainContent from "./MainContent";
import "./styles.css";



export const App = () => {
  const [center, setCenter] = useState({ lat: 35.681167, lng: 139.767052 });
  const [zoom, setZoom] = useState(15);

  return (
    <>
    <Header />
      <div className="container">
        <div className="left-menu">
          左メニュー
        </div>
        <div class="main-contents">
          <div className="input-area">
            <input placeholder="地図を移動" />
            <button>検索</button>
          </div>
          <div className="map-area">
            <GoogleMapReact
              //bootstrapURLKeys={{ key: "AIzaSyAMQiUaZvE2RY8GL-LkNVK6l8jV3lWG0Z8" }}
              defaultCenter={center}
              defaultZoom={zoom}
            />
          </div>
        </div>
      </div>
    </>
  )

};

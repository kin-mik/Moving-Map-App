import axios from "axios";
import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";
import { Header } from "./components/Header";
import { LeftMenu } from "./components/LeftMenu";
import { MemoizedGoogleMap } from "./components/MemoizedGoogleMap";
// import MainContent from "./MainContent";

import "./styles.css";

export const App = () => {
  const pinMax = 5;
  const [center, setCenter] = useState({ lat: 35.681167, lng: 139.767052 });
  const [zoom, setZoom] = useState(15);
  const [searchValue, setSearchValue] = useState("");
  const [pinNum, setPinNum] = useState(3);
  const [searchValues, setSearchValues] = useState(new Array(pinMax).fill(""));
  const [pinValue, setPinValue] = useState(new Array(pinMax).fill(""));
  const [locations, setLocations] = useState(new Array(pinMax).fill(""));
  const [radiusValues, setRadiusValues] = useState(new Array(pinMax).fill(""));
  const [historyData, setHistoryData] = useState([]);
  const onChangePinNum = (e) => setPinNum(e.target.value);
  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  const handleClick = async () => {
    const result = await axios.get("http://localhost:5001/history");
    setHistoryData(result.data);
  };

  useEffect(() => {
    const calculateCenter = (locations) => {
      const filteredLocations = locations.filter(
        (location) =>
          location &&
          location.location &&
          location.location.lat &&
          location.location.lng
      );
      const lats = filteredLocations
        .map((location) => location.location.lat)
        .filter((lat) => !isNaN(lat));
      const lngs = filteredLocations
        .map((location) => location.location.lng)
        .filter((lng) => !isNaN(lng));

      if (lats.length > 1 && lngs.length > 1) {
        const latMin = Math.min(...lats);
        const latMax = Math.max(...lats);
        const lngMin = Math.min(...lngs);
        const lngMax = Math.max(...lngs);

        const latAvg = (latMin + latMax) / 2;
        const lngAvg = (lngMin + lngMax) / 2;

        // Calculate the zoom level based on the distance between the min and max lat/lng values
        const R = 6371; // Earth's radius in km
        const dLat = ((latMax - latMin) * Math.PI) / 180;
        const dLng = ((lngMax - lngMin) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((latMin * Math.PI) / 180) *
            Math.cos((latMax * Math.PI) / 180) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        const zoomLevel = Math.round(
          14 - Math.log(distance / Math.sqrt(2)) / Math.log(2)
        );

        setCenter({ lat: latAvg, lng: lngAvg });
        setZoom(zoomLevel * 1.1);
      }
    };
    calculateCenter(locations);
  }, [locations]);

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
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
  };

  return (
    <>
      <Header />
      <div className="container">
        <LeftMenu
          pinMax={pinMax}
          pinNum={pinNum}
          searchValues={searchValues}
          setSearchValues={setSearchValues}
          pinValue={pinValue}
          setPinValue={setPinValue}
          locations={locations}
          setLocations={setLocations}
          radiusValues={radiusValues}
          setRadiusValues={setRadiusValues}
          onChange={onChangePinNum}
          historyData={historyData}
          handleClick={handleClick}
        />
        <div className="main-contents">
          <div className="input-area">
            <input
              className="search-input"
              placeholder="地図を移動"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button onClick={handleSearch}>検索</button>
          </div>
          <div className="map-area">
            <LoadScript
              googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            >
              <GoogleMap
                mapContainerStyle={mapStyles}
                center={center}
                zoom={zoom}
              >
                <MemoizedGoogleMap locations={locations} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </>
  );
};

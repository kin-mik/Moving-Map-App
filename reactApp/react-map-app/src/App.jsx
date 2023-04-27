import React, { useState, useEffect } from "react";
// import GoogleMapReact from "google-map-react";
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api';
import { Header } from "./components/Header";
import { LeftMenu } from "./components/LeftMenu";
import { MemoizedGoogleMap } from './components/MemoizedGoogleMap';
// import MainContent from "./MainContent";
import "./styles.css";



export const App = () => {
  const pinMax = 5;
  const [center, setCenter] = useState({ lat: 35.681167, lng: 139.767052 });
  const [zoom, setZoom] = useState(13);
  const [searchValue, setSearchValue] = useState("");
  const [pinNum, setPinNum] = useState(3);
  const [searchValues, setSearchValues] = useState(new Array(pinMax).fill(''));
  const [pinValue, setPinValue] = useState(new Array(pinMax).fill(''));
  const [locations, setLocations] = useState(new Array(pinMax).fill(''));
  const [radiusValues, setRadiusValues] = useState(new Array(pinMax).fill(''));
  const handleAddLocation = (location) => {
    setLocations((prevLocations) => [...prevLocations, { location }]);
  };
  const onChangePinNum = (e) => setPinNum(e.target.value);
  const mapStyles = {
    height: "100%",
    width: "100%"
  };

  useEffect(() => {
    const calculateCenter = (locations) => {
      const filteredLocations = locations.filter(location => location && location.location && location.location.lat && location.location.lng);
      const lats = filteredLocations.map(location => location.location.lat).filter(lat => !isNaN(lat));
      const lngs = filteredLocations.map(location => location.location.lng).filter(lng => !isNaN(lng));

      if (lats.length > 1 && lngs.length > 1) {
        const latMin = Math.min(...lats);
        const latMax = Math.max(...lats);
        const lngMin = Math.min(...lngs);
        const lngMax = Math.max(...lngs);

        const latAvg = (latMin + latMax) / 2;
        const lngAvg = (lngMin + lngMax) / 2;
        setCenter({ lat: latAvg, lng: lngAvg });
      }
    };
    calculateCenter(locations);
  }, [locations]);

  // const MemoizedGoogleMap = React.memo(({ locations }) => {
  //   const memoizedLocations = React.useMemo(
  //     () => locations.filter(Boolean),
  //     [locations]
  //   );

  //   return memoizedLocations.map((item, index) => {
  //     console.log(locations);
  //     return (
  //       <div key={index}>
  //         <Marker position={item.location} />
  //         <Circle center={item.location} radius={1000} options={circleOptions} />
  //       </div>
  //     );
  //   });
  // }, (prevProps, nextProps) => {
  //   // locationsが同じ場合は再レンダリングしない
  //   return prevProps.locations === nextProps.locations;
  // });

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
              <GoogleMap mapContainerStyle={mapStyles} center={center} zoom={zoom}>
                <MemoizedGoogleMap locations={locations} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </>
  )

};

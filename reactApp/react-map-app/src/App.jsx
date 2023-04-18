import React, { useState } from "react";
// import GoogleMapReact from "google-map-react";
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api';
import { Header } from "./components/Header";
import { LeftMenu } from "./components/LeftMenu";
// import MainContent from "./MainContent";
import "./styles.css";



export const App = () => {
  const pinMax = 5;
  const [center, setCenter] = useState({ lat: 35.681167, lng: 139.767052 });
  const [zoom, setZoom] = useState(15);
  const [searchValue, setSearchValue] = useState("");
  const [pinNum, setPinNum] = useState(3);
  const [searchValues, setSearchValues] = useState(new Array(pinMax).fill(''));
  const [pinValue, setPinValue] = useState(new Array(pinMax).fill(''));
  // const [locations, setLocations] = useState([]);
  const [locations, setLocations] = useState(new Array(pinMax).fill(''));
  const [showLocations, setShowLocations] = useState(false);
  const onChangePinNum = (e) => setPinNum(e.target.value);
  const mapStyles = {
    height: "100%",
    width: "100%"
  };
  const circleOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1,
  };


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
          setShowLocations={setShowLocations}
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


            <LoadScript
              googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} >
              <GoogleMap
                mapContainerStyle={mapStyles}
                center={center}
                zoom={zoom}>
                {
                  locations.filter(Boolean).map((item, index) => {
                    // console.log(item.location);
                    if (locations[index]){
                      // setSearchValue(false)
                      console.log(locations);
                      return (
                        <div key={item.name}>
                          <Marker position={item.location} />
                          <Circle center={item.location} radius={1000} options={circleOptions} />
                        </div>
                      )
                      
                    }}
                  )
                //     return (
                //       <div key={item.name}>
                //         <Marker position={item.location} />
                //         <Circle center={item.location} radius={1000} options={circleOptions} />
                //       </div>
                //     )
                //   })


                //   const searchBoxes = Array(parseInt(pinMax)).fill().map((_, index) => {
                //     if (index < pinNum) {
                //         return (
                //             <SearchBox key={index} index={index} searchValues={searchValues} handleSearchBoxChange={handleSearchBoxChange} handlePin={handlePin} />
                //         );
                //     }
                // }
                // );



                }
              </GoogleMap>
            </LoadScript>

          </div>
        </div>
      </div>
    </>
  )

};

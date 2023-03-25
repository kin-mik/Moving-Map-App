import React, { useState }  from "react";
import GoogleMapReact from "google-map-react";
import "./styles.css";


export const App = () => {
  const [center, setCenter] = useState({ lat: 35.681167, lng: 139.767052 });
  const [zoom, setZoom] = useState(15);

  return (
    <>
      <div className="input-area">
        <input placeholder="地図を移動" />
        <button>検索</button>
      </div>
      <div style={{ height: "400px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "自分のAPIkey" }}
          defaultCenter={center}
          defaultZoom={zoom}
        />
      </div>

    </>
  )

};

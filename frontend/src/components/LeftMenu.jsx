// import axios from 'axios';
import React, { useState, useEffect } from "react";
import { SearchBox } from "./SearchBox";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export const LeftMenu = (props) => {
  const {
    pinMax,
    pinNum,
    searchValues,
    setSearchValues,
    pinValue,
    setPinValue,
    locations,
    setLocations,
    radiusValues,
    setRadiusValues,
    onChange,
    historyData,
  } = props;
  const areaColor = new Array(
    "#FF3B0D",
    "#1957FF",
    "#FF7B00",
    "#19FFB0",
    "#FFBA0D"
  );

  const addPin = async (place, lat, lng, radius) => {
    try {
      const res = await fetch("http://localhost:5001/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ place, lat, lng, radius }),
      });
      const data = await res.json();
      console.log(res.status); // ステータスコードをログに出力する
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePin = (index) => {
    if (searchValues[index] !== "") {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        {
          address: searchValues[index],
        },
        (results, status) => {
          if (status === "OK") {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            const newPinValue = [...pinValue];
            newPinValue[index] = { lat, lng };
            setPinValue(newPinValue);
            const newLocations = [...locations];
            newLocations[index] = {
              name: searchValues[index],
              location: {
                lat: lat,
                lng: lng,
              },
              radius: parseInt(radiusValues[index]) * 1000,
              circleOptions: {
                strokeColor: areaColor[index],
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: areaColor[index],
                fillOpacity: 0.2,
                clickable: false,
                draggable: false,
                editable: false,
                visible: true,
                radius: 30000,
                zIndex: 1,
              },
            };
            setLocations(newLocations);
            // POSTリクエストを送信
            addPin(
              searchValues[index],
              lat,
              lng,
              parseInt(radiusValues[index]) * 1000
            );
          } else {
            alert(
              "Geocode was not successful for the following reason: " + status
            );
          }
        }
      );
    }
  };

  const handleSearchBoxChange = (index) => (e) => {
    const newSearchValues = [...searchValues];
    newSearchValues[index] = e.target.value;
    setSearchValues(newSearchValues);
  };

  const handleRadiusChange = (index) => (e) => {
    const newRadiusValues = [...radiusValues];
    newRadiusValues[index] = e.target.value;
    setRadiusValues(newRadiusValues);
  };

  const onClickLift = (index) => {
    const newSearchValues = [...searchValues];
    newSearchValues[index] = "";
    setSearchValues(newSearchValues);

    const newRadiusValues = [...radiusValues];
    newRadiusValues[index] = "";
    setRadiusValues(newRadiusValues);

    const newLocations = [...locations];
    newLocations[index] = "";
    setLocations(newLocations);
  };

  return (
    <div className="left-menu">
      <div className="left-head">
        <div>
          ピンの数：
          <input
            className="value-input"
            type="number"
            min="1"
            max={pinMax}
            size="5"
            value={pinNum}
            onChange={onChange}
          />
          点
        </div>
      </div>
      <Tabs>
        <TabList>
          <Tab>地名検索</Tab>
          <Tab>履歴</Tab>
        </TabList>

        <TabPanel>
          {/* {searchBoxes} */}
          {searchValues.map((_, index) => {
            return (
              <SearchBox
                key={index}
                index={index}
                searchValues={searchValues}
                radiusValues={radiusValues}
                handleSearchBoxChange={handleSearchBoxChange}
                handleRadiusChange={handleRadiusChange}
                handlePin={handlePin}
                onClickLift={onClickLift}
                disabled={index >= pinNum}
              />
            );
          })}
        </TabPanel>
        <TabPanel>
          <div>
            <p className="title">History Data</p>
            <button>履歴全て削除</button>
            <table className="table-history">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>地名</th>
                  {/* <th>Lat</th>
                  <th>Lng</th> */}
                  <th>半径</th>
                  {/* <th>Created At</th> */}
                  <th>アクション</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.place}</td>
                    {/* <td>{row.lat.toFixed(2)}</td>
                    <td>{row.lng.toFixed(2)}</td> */}
                    <td>{(row.radius / 1000).toFixed(1)}km</td>
                    {/* <td>{row.created_at}</td> */}
                    <td>
                      <button>表示/非表示</button>
                      <button>履歴削除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

import React, { useState } from "react";
import { SearchBox } from "./SearchBox";
import { PinBox } from "./PinBox";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export const LeftMenu = (props) => {
    const { pinNum, searchValues, setSearchValues, pinValue, setPinValue, onChange } = props;

    const handlePin = (index) => {

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode(
            {
                address: searchValues[index],
            },
            (results, status) => {
                if (status === "OK") {
                    const lat = results[0].geometry.location.lat();
                    const lng = results[0].geometry.location.lng();
                    const newPinValue = [...pinValue]
                    newPinValue[index] = { lat, lng }
                    console.log(newPinValue);
                    setPinValue(newPinValue);
                } else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
            }
        );
    };


    const handleSearchBoxChange = (index) => (e) => {
        const newSearchValues = [...searchValues];
        newSearchValues[index] = e.target.value;
        setSearchValues(newSearchValues);
    }
    const searchBoxes = Array(parseInt(pinNum))
        .fill()
        .map((_, index) => <SearchBox key={index} index={index} searchValues={searchValues} handleSearchBoxChange={handleSearchBoxChange} handlePin={handlePin} />);

    return (
        <div className="left-menu">
            <div className="left-head">
                <div>
                    ピンの数：
                    <input type="number" min="1" max="5" size="5" value={pinNum} onChange={onChange}
                    />
                    点
                </div>
            </div>
            <Tabs >
                <TabList>
                    <Tab>ピンで</Tab>
                    <Tab>地名で</Tab>
                </TabList>

                <TabPanel>
                    {/* {pinBoxes} */}
                </TabPanel>
                <TabPanel>
                    {searchBoxes}


                </TabPanel>
            </Tabs>

        </div>
    );
};
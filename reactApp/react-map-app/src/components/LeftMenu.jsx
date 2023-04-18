import React, { useState } from "react";
import { SearchBox } from "./SearchBox";
import { PinBox } from "./PinBox";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export const LeftMenu = (props) => {
    const { pinMax, pinNum, searchValues, setSearchValues, pinValue, setPinValue, locations, setLocations, onChange } = props;

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
                    const newPinValue = [...pinValue];
                    newPinValue[index] = { lat, lng };
                    // console.log(newPinValue);
                    setPinValue(newPinValue);
                    const newLocations = [...locations];
                    newLocations[index] = {
                        "name": searchValues[index],
                        "location": {
                            "lat": lat,
                            "lng": lng
                        }
                    }
                    // console.log(newLocations);
                    setLocations(newLocations);
                    




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


    console.log(pinMax);
    const searchBoxes = Array(parseInt(pinMax)).fill().map((_, index) => {
        if (index < pinNum) {
            return (
                <SearchBox key={index} index={index} searchValues={searchValues} handleSearchBoxChange={handleSearchBoxChange} handlePin={handlePin} />
            );
        }
    }
    );


    return (
        <div className="left-menu">
            <div className="left-head">
                <div>
                    ピンの数：
                    <input type="number" min="1" max={pinMax} size="5" value={pinNum} onChange={onChange}
                    />
                    点
                </div>
            </div>
            <Tabs >
                <TabList>
                    <Tab>地名で</Tab>
                    <Tab>ピンで</Tab>
                </TabList>

                <TabPanel>
                    {searchBoxes}


                </TabPanel>
                <TabPanel>
                    {/* {pinBoxes} */}

                </TabPanel>
            </Tabs>

        </div>
    );
};
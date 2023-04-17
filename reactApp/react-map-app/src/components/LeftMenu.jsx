import React, { useState } from "react";
import { SearchBox } from "./SearchBox";
import { PinBox } from "./PinBox";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export const LeftMenu = (props) => {
    const { 
        // pinLocs,
         pinNum, onChange } = props;

    // const pinBoxes = Array(parseInt(pinNum))
    //     .fill()
    //     .map((pinLoc, index) => <PinBox key={pinLoc} index={index} />); 
    const [searchValue, setSearchValue] = useState("");
    const [pinValue, setPinValue] = useState(new Array(pinNum).fill(''));

    const handlePin = (index) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode(
          {
            address: searchValue,
          },
          (results, status) => {
            if (status === "OK") {
              const lat = results[0].geometry.location.lat();
              const lng = results[0].geometry.location.lng();
              const newPinNalue = [...pinValue]
              newPinNalue[index] = { lat, lng }
              console.log(newPinNalue)
              setPinValue(newPinNalue);
              console.log(index)
            } else {
              alert("Geocode was not successful for the following reason: " + status);
            }
          }
        );
      };

      const searchBoxes = Array(parseInt(pinNum))
      .fill()
      .map((_, index) => <SearchBox key={index} index={index} searchValue={searchValue} setSearchValue={setSearchValue} handlePin={handlePin}/>);

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
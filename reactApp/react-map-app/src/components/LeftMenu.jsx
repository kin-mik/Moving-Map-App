import React, { useState } from "react";
import { SearchBox } from "./SearchBox";
import { PinBox } from "./PinBox";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export const LeftMenu = (props) => {
    const { pinNum, onChange } = props;
    const searchBoxes = Array(parseInt(pinNum))
        .fill()
        .map((_, index) => <SearchBox key={index} index={index} />);
    const pinBoxes = Array(parseInt(pinNum))
        .fill()
        .map((_, index) => <PinBox key={index} index={index} />);


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
                    {pinBoxes}
                </TabPanel>
                <TabPanel>
                    {searchBoxes}
                </TabPanel>
            </Tabs>

        </div>
    );
};
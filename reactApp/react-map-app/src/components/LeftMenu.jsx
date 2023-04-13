import React, { useState } from "react";
import { SearchBox } from "./SearchBox";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export const LeftMenu = (props) => {
    const { pinNum, onChange } = props;
    const n = 3;

    return (
        <div className="left-menu">
            <div className="left-head">
                <div>
                    ピンの数：
                    <input type="number" min="0" max="5" size="5" value={pinNum} //onChange={onChange}
                     />
                    点
                </div>
            </div>
            <Tabs>
        <TabList>
          <Tab>ピンで</Tab>
          <Tab>地名で</Tab>
        </TabList>

        <TabPanel>

        </TabPanel>
        <TabPanel>
        {[...Array(n)].map((_, i) => (
        <SearchBox key={i} />
      ))}
        </TabPanel>
      </Tabs>

        </div>
    );
};
import React, { useState } from "react";
import { SearchBox } from "./SearchBox";

export const LeftMenu = () => {
    // const { todoText, onChange, onClick, disabled } = props;
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className="left-menu">
            <div className="left-head">
                <div>
                    ピンの数：
                    <input type="number" min="0" max="5" size="5" />
                    点
                </div>
            </div>
            <SearchBox />
            <SearchBox />
            <SearchBox />
        </div>
    );
};
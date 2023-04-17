import React, { useState } from "react";

export const SearchBox = (props) => {
    const { index , searchValue, setSearchValue, handlePin} = props;
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className="search-box">
            <p className="title">{`地点${index + 1}`}</p>
            <input placeholder="地名を検索"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)} />
            <button onClick={()=> handlePin(index)}>検索</button>
            <button>解除</button>
            <div>
                <label>
                    移動手段：
                    <select className="drop-down" value={selectedOption} onChange={handleChange}>
                        <option value="car">車</option>
                        <option value="bike">自転車</option>
                        <option value="walk">徒歩</option>
                    </select>
                    で
                    <input type="number" min="0" max="100" size="5" />
                    分以内
                </label>
            </div>
        </div>
    );
};
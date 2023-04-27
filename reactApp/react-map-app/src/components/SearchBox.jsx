import React, { useState } from "react";

export const SearchBox = (props) => {
    const { index, searchValues, radiusValues, handleSearchBoxChange, handleRadiusChange, handlePin, onClickLift, disabled } = props;

    return (
        <div className="search-box">
            <p className="title">{`地点${index + 1}`}</p>

            <input
                className="search-input"
                disabled={disabled}
                placeholder="地名を入力"
                value={searchValues[index]}
                onChange={handleSearchBoxChange(index)}
            />

            <div className="distance-input">
                <input
                    className="value-input"
                    disabled={disabled}
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={radiusValues[index]}
                    onChange={handleRadiusChange(index)} />
                <span>km以内</span>
                <button disabled={disabled} onClick={() => handlePin(index)}>検索</button>
            <button disabled={disabled} onClick={() => onClickLift(index)}>解除</button>
            </div>
        </div>


        // <div className="search-box">
        //     <p className="title">{`地点${index + 1}`}</p>
        //     <input
        //     className="search-input"
        //     disabled={disabled} 
        //     placeholder="地名を検索"
        //         value={searchValues[index]}
        //         onChange={handleSearchBoxChange(index)}
        //          />
        //     <button disabled={disabled} onClick={()=> handlePin(index)}>検索</button>
        //     <button disabled={disabled}>解除</button>
        //     <div>
        //         <label>
        //             移動手段：
        //             <select disabled={disabled} value={selectedOption} onChange={handleChange}>
        //                 <option value="car">車</option>
        //                 <option value="bike">自転車</option>
        //                 <option value="walk">徒歩</option>
        //             </select>
        //             で
        //             <input className="value-input" disabled={disabled} type="number" min="0" max="100" size="5" />
        //             分以内
        //         </label>
        //     </div>
        // </div>
    );
};
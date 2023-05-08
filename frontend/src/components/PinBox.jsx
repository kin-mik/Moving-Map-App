import React, { useState } from "react";

export const PinBox = (props) => {
  const { index } = props;

  return (
    <div className="search-box">
      <p className="title">{`地点${index + 1}`}</p>
      <button>選択</button>
      <button>解除</button>
    </div>
  );
};

import React from "react";

export const Header = () => {
  return (
    <header>
      <div className="header-container">
        <img
          className="icon"
          src={process.env.PUBLIC_URL + "/images/icon.png"}
          alt="icon"
        />
        <img
          className="logo"
          src={process.env.PUBLIC_URL + "/images/logo.png"}
          alt="logo"
        />
      </div>
    </header>
  );
};

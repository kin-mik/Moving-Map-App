import React from "react";

export const Header = () => {
    // const { todoText, onChange, onClick, disabled } = props;

    return (
        <div className="header">
            <img
                src="/images/logo.png"
                alt="ロゴ"
                style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    maxHeight: "90%",
                    maxWidth: "90%",
                }} />
        </div>
    );
};
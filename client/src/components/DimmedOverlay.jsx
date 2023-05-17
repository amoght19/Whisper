import React from "react";

const DimmedOverlay = () => {
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: "9998",
        top: "0px",
      }}
    ></div>
  );
};

export default DimmedOverlay;

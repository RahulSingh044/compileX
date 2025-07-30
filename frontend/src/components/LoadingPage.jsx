import React from "react";
import "../App.css";

const LoadingPage = () => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "80vh",
      color: "#fff",
      fontFamily: "monospace",
    }}>
      <div style={{ fontSize: "2rem", marginBottom: "1.5rem" }}></div>
      <div className="compiler-loader">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
};

export default LoadingPage;

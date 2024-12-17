import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/loading.json"; // Replace with your Lottie JSON file path

const Loading = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
        color: "#fff",
        fontSize: "1.5rem",
        fontFamily: "DMM, sans-serif",
        flexDirection: "column",
      }}
    >
      {/* <Lottie animationData={animatio} />; */}
      <span>Please wait..fetching details!!!</span>
    </div>
  );
};

export default Loading;

import React from "react";
import { FaCheckCircle, FaExclamationCircle, FaEdit } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const PersonalDetails = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
      <div
        style={{
          backgroundColor: "#fff3cd",
          padding: "15px",
          borderRadius: "5px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          fontFamily: "DMM",
        }}
      >
        <FaExclamationCircle style={{ marginRight: "10px" }} />
        We need your attention! You don’t have any payment method added yet. To start receiving withdrawals, please <a href="#" style={{ color: "#007bff", textDecoration: "none", fontWeight: 800, marginLeft: "1rem" }}>Add Payment Method</a>.
      </div>
      <div
        style={{
          backgroundColor: "#f7f9fb",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
        }}
      >
        <h2 style={{ marginTop: "0", fontFamily: "DMM", color: "#000000" }}>Kartikey Mittal</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
          <span style={{ fontFamily: "DMM", color: "#a9a9a9" }}>Email:</span>
          <span style={{ fontFamily: "DMM" }}>g6.kartikey@gmail.com <FaCheckCircle style={{ color: "#57ae8e", marginLeft: "5px" }} /></span>
        </div>
        <hr style={{ border: "none", borderTop: "1px solid rgba(0, 0, 0, 0.05)" }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
          <span style={{ fontFamily: "DMM", color: "#a9a9a9" }}>Phone number:</span>
          <span style={{ fontFamily: "DMM" }}>+91799999999 <FaCheckCircle style={{ color: "#57ae8e", marginLeft: "5px" }} /></span>
        </div>
        <hr style={{ border: "none", borderTop: "1px solid rgba(0, 0, 0, 0.05)" }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
          <span style={{ fontFamily: "DMM", color: "#a9a9a9" }}>Age:</span>
          <span style={{ fontFamily: "DMM" }}>-</span>
        </div>
        <hr style={{ border: "none", borderTop: "1px solid rgba(0, 0, 0, 0.05)" }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
          <span style={{ fontFamily: "DMM", color: "#a9a9a9" }}>Gender:</span>
          <span style={{ fontFamily: "DMM" }}>-</span>
        </div>
        <hr style={{ border: "none", borderTop: "1px solid rgba(0, 0, 0, 0.05)" }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
          <span style={{ fontFamily: "DMM", color: "#a9a9a9" }}>KYC:</span>
          <span style={{ color: "orange", fontFamily: "DMM" }}>Pending</span>
        </div>
        <hr style={{ border: "none", borderTop: "1px solid rgba(0, 0, 0, 0.05)" }} />
        <button style={{ backgroundColor: "#95a4fc", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer", display: "flex", alignItems: "center", fontFamily: "DMM" }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#0056b3"; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#007bff"; }} >
          <MdEdit style={{ marginRight: "5px" }} /> Edit Profile
        </button>
      </div>
    </div>
  );
};

export default PersonalDetails;

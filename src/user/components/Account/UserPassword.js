import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const UserPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "40px",
        maxWidth: "80%", // Limit width to avoid overflow
        margin: "0 auto",
        background: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      <div>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#333",
          }}
        >
          Current Password
        </label>
        <input
          type="password"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "14px",
            borderRadius: "6px",
            border: "1px solid #ddd",
            outline: "none",
          }}
        />
      </div>
      <div>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#333",
          }}
        >
          New Password
        </label>
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              paddingRight: "40px",
              fontSize: "14px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              outline: "none",
            }}
          />
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              top: "50%",
              right: "12px",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "20px",
              color: "#666",
            }}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>
      </div>
      <div>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#333",
          }}
        >
          Confirm New Password
        </label>
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              paddingRight: "40px",
              fontSize: "14px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              outline: "none",
            }}
          />
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              top: "50%",
              right: "12px",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "20px",
              color: "#666",
            }}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>
      </div>
      <button
        onClick={() => alert("Password Updated")}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          // fontWeight: "bold",
          color: "#fff",
          backgroundColor: "#ff4081",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          textAlign: "center",fontFamily:'DMB'
        }}
      >
        Update Password
      </button>
    </div>
  );
};

export default UserPassword;

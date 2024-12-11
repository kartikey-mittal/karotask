import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import karoTask1 from "../assets/karoTask1.png"; // Importing the image
import { auth, db } from "../firebase"; // Import Firebase imports

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("user"); // "user" or "creator"
  const [isSignup, setIsSignup] = useState(false); // Login or Signup mode
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Login
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Check Role
      const userDoc = await getDoc(doc(db, activeTab === "user" ? "users" : "creators", user.uid));
      if (userDoc.exists()) {
        navigate(`/${activeTab}/dashboard`);
      } else {
        alert("Invalid credentials or role!");
      }
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  // Handle Signup
  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Save to Firestore
      await setDoc(doc(db, activeTab === "user" ? "users" : "creators", user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: activeTab,
        ...(activeTab === "user" && {
            UID: "hkCpyjsu0vbob2WrQpxchij5Gk12",
            age: 0,
            completedTask: 0,
            createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
            earnings: 0,
            inProgressTask: 0,
            kyc: "temp",
            panCardUrl: "temp",
            pendingTask: 0,
            photoUrl: "temp"
        })
    });
    

      alert("Signup successful! Please log in.");
      setIsSignup(false); // Switch to login mode
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  // Login as Demo User
  const handleDemoLogin = (role) => {
    alert(`Logging in as Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`);
    navigate(`/${role}/dashboard`);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
      }}
    >
      <img src={karoTask1} alt="Karo Task" style={{ width: "200px", marginBottom: "20px" }} />
      <h1 style={{ marginBottom: "20px", fontFamily: "DMB" }}>{isSignup ? "Sign Up" : "Sign In"}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <button
          onClick={() => setActiveTab("user")}
          style={{
            padding: "10px 20px",
            border: activeTab === "user" ? "2px solid #3b82f6" : "1px solid #d1d5db",
            borderRadius: "5px 0 0 5px",
            backgroundColor: activeTab === "user" ? "#f8f8f8" : "#ffffff",
            cursor: "pointer",
            flex: 1,
            fontFamily: "DMB",
            fontWeight: activeTab === "user" ? "bold" : "normal",
            color: activeTab === "user" ? "#3b82f6" : "#6b7280",
          }}
        >
          Tasker Account
        </button>
        <button
          onClick={() => setActiveTab("creator")}
          style={{
            padding: "10px 20px",
            border: activeTab === "creator" ? "2px solid #3b82f6" : "1px solid #d1d5db",
            borderRadius: "0 5px 5px 0",
            backgroundColor: activeTab === "creator" ? "#f8f8f8" : "#ffffff",
            cursor: "pointer",
            flex: 1,
            fontFamily: "DMB",
            fontWeight: activeTab === "creator" ? "bold" : "normal",
            color: activeTab === "creator" ? "#3b82f6" : "#6b7280",
          }}
        >
          Creator Account
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            style={{
              padding: "10px",
              marginBottom: "10px",
              width: "100%",
              border: "1px solid #d1d5db",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
        )}
        {isSignup && (
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            style={{
              padding: "10px",
              marginBottom: "10px",
              width: "100%",
              border: "1px solid #d1d5db",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{
            padding: "10px",
            marginBottom: "10px",
            width: "100%",
            border: "1px solid #d1d5db",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        />
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{
              padding: "10px",
              marginBottom: "10px",
              width: "100%",
              border: "1px solid #d1d5db",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
        </div>
        <button
          onClick={isSignup ? handleSignup : handleLogin}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3b82f6",
            color: "#ffffff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
            fontFamily: "DMB",
            fontSize: "16px",
            marginBottom: "20px",
          }}
        >
          {isSignup ? "Sign Up" : "Sign In"}
        </button>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => handleDemoLogin("user")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f3f4f6",
              border: "1px solid #d1d5db",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Login as Demo Tasker
          </button>
          <button
            onClick={() => handleDemoLogin("creator")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f3f4f6",
              border: "1px solid #d1d5db",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Login as Demo Creator
          </button>
        </div>
        <button
          onClick={() => setIsSignup(!isSignup)}
          style={{
            color: "#3b82f6",
            background: "none",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
            textDecoration: "underline",
            fontSize: "14px",
          }}
        >
          {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default Login;

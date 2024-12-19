import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import karoTask1 from "../assets/karoTask1.png";
import './Login.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getDoc, doc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../firebase"; // Import auth and Firestore database instance

const AdminLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Check if user is already logged in
    if (auth.currentUser) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const validateForm = () => {
    if (!formData.email.includes("@")) {
      setError("Invalid email address");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    setError(""); // Clear previous errors
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      // Sign in the admin with email and password
      const adminCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const admin = adminCredential.user;
  
      // Fetch the admin's role from Firestore (use the 'admin' collection)
      const adminDoc = await getDoc(doc(db, "admin", admin.uid)); // Changed 'user' to 'admin'
      
      if (adminDoc.exists()) {
        const adminData = adminDoc.data(); // Get admin document data
        if (adminData.role === "admin") {
          // If the role is admin, redirect to the admin dashboard
          navigate('/admin/dashboard');
        } else {
          setError("Access denied. You are not an admin.");
        }
      } else {
        setError("Admin data not found in the database.");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleResetPassword = async () => {
    if (!formData.email) {
      setError("Please enter your email address.");
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, formData.email);
      setError("Password reset email sent. Please check your inbox.");
    } catch (error) {
      setError("Error sending password reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "DMB", textAlign: "center", padding: "2rem", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#f8f8f8", height: "100vh", boxSizing: "border-box" }}>
      <div style={{ width: "100%", maxWidth: "400px", backgroundColor: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)", border: "1px solid #e5e7eb" }}>
        <img src={karoTask1} alt="Karo Task" style={{ width: "200px", marginBottom: "1.5rem", display: "block", marginLeft: "auto", marginRight: "auto" }} />
        <h1 className="title" style={{ position: "relative", width: "100%", marginBottom: "1.5rem" }}>Admin Login</h1>
        <input
  type="email"
  name="email"
  placeholder="Email"
  value={formData.email}
  onChange={handleChange}
  style={{
    width: "100%",
    padding: "0.75rem", // Consistent padding
    marginBottom: "1rem",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "16px",
    backgroundColor: "#f9fafb",
    boxSizing: "border-box", // Ensure consistent box model
    
  }}
/>
<div className="password-input-container" style={{ position: "relative", width: "100%" }}>
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    style={{
      width: "100%", // Full width of the parent
      padding: "0.75rem", // Same padding as email
      paddingRight: "2.5rem", // Extra space for the visibility button
      marginBottom: "1rem",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      fontSize: "16px",
      backgroundColor: "#f9fafb",
      boxSizing: "border-box", // Ensure consistent box model
    }}
  />
  <button
    onClick={togglePasswordVisibility}
    aria-label="Toggle password visibility"
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "#f9fafb",
      border: "none",
      cursor: "pointer",
    }}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>

        {error && <div className="error-message" style={{ color: "red", fontSize: "14px", marginBottom: "1rem", }}>{error}</div>}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{fontFamily: "DMB", width: "100%", padding: "0.75rem", backgroundColor: "#2563eb", color: "#ffffff", border: "none", borderRadius: "5px", fontSize: "16px", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <p onClick={handleResetPassword} style={{ cursor: "pointer", color: "#3b82f6", marginTop: "1rem" }}>
          Forgot password?
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
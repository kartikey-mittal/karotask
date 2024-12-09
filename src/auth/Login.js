import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import karoTask1 from "../assets/karoTask1.png";
import { auth, db } from "../firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("user");
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false); // New state for password reset

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const validateForm = () => {
    if (isSignup && !formData.name) {
      setError("Name cannot be empty");
      return false;
    }
    if (isSignup && formData.phone.length !== 10) {
      setError("Phone number must be 10 digits");
      return false;
    }
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


  const getFirebaseErrorMessage = (errorCode) => {
    console.error(`Firebase error: ${errorCode}`);
    switch (errorCode) {
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/email-already-in-use":
        return "An account already exists with this email address. Please try signing in or use a different email.";
      case "auth/weak-password":
        return "Your password must be at least 6 characters long. Please try a stronger password.";
      case "auth/operation-not-allowed":
        return "This operation is not allowed. Please check your Firebase configuration.";
      case "auth/user-disabled":
        return "This user account has been disabled. Please contact support for assistance.";
      case "auth/user-not-found":
        return "No user account was found with this email address. Please check your email and try again.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/too-many-requests":
        return "Too many requests. Please try again in a few minutes.";
      case "auth/expired-action-code":
        return "The action code has expired. Please request a new one.";
      case "auth/invalid-action-code":
        return "The action code is invalid. Please request a new one.";
      case "auth/missing-email":
        return "Please enter your email address.";
      case "auth/account-exists-with-different-credential":
        return "An account already exists with this email address but a different sign-in method. Please try signing in with that method.";
      case "auth/credential-already-in-use":
        return "This credential is already linked to another user account. Please try a different credential.";
      case "auth/invalid-credential":
        return "The provided credential is invalid. Please check your credentials and try again.";
      default:
        console.error(`Unknown Firebase error: ${errorCode}`); // Log the error
        return "An unknown error occurred. Please try again.";
    }
  };

  
  

  const handleLogin = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, activeTab === "user" ? "users" : "creators", user.uid));
      if (userDoc.exists()) {
        if (user.emailVerified) {
          navigate(`/${activeTab}/dashboard`);
        } else {
          setError("Please verify your email address.");
        }
      } else {
        setError("Invalid role!");
      }
    } catch (error) {
      setError(getFirebaseErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      await setDoc(doc(db, activeTab === "user" ? "users" : "creators", user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: activeTab,
      });

      // Send verification email
      await sendEmailVerification(user);

      // Display a success message
      setError("Signup successful! Please check your email for verification.");
      setIsSignup(false); // You can optionally switch back to login mode
    } catch (error) {
      setError(getFirebaseErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    const formattedRole = role.charAt(0).toUpperCase() + role.slice(1);
    alert(`Logging in as Demo ${formattedRole}`);
    navigate(`/${role}/dashboard`);
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
      setShowResetPassword(false); // Close the password reset modal
    } catch (error) {
      setError(getFirebaseErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "2rem 1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f8f8",
        minHeight: "100vh",
      }}
    >
      <div style={{ width: "100%", maxWidth: "400px", backgroundColor: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <img src={karoTask1} alt="Karo Task" style={{ width: "200px", marginBottom: "1.5rem", display: "block", marginLeft: "auto", marginRight: "auto" }} />
        <h1 className="title" style={{ marginBottom: "1.5rem" }}>{isSignup ? "Sign Up" : "Sign In"}</h1>

        <div className="tab-container" style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem", width: "100%" }}>
          <button
            onClick={() => setActiveTab("user")}
            className={`tab-button ${activeTab === "user" ? "active" : ""}`}
            style={{
              flex: "1",
              padding: "10px",
              border: activeTab === "user" ? "2px solid #3b82f6" : "1px solid #d1d5db",
              backgroundColor: activeTab === "user" ? "#f8f8f8" : "#ffffff",
              cursor: "pointer",
              fontFamily: "DMB, Arial, sans-serif",
              fontWeight: activeTab === "user" ? "bold" : "normal",
              color: activeTab === "user" ? "#3b82f6" : "#6b7280",
            }}
          >
            Tasker Account
          </button>
          <button
            onClick={() => setActiveTab("creator")}
            className={`tab-button ${activeTab === "creator" ? "active" : ""}`}
            style={{
              flex: "1",
              padding: "10px",
              border: activeTab === "creator" ? "2px solid #3b82f6" : "1px solid #d1d5db",
              backgroundColor: activeTab === "creator" ? "#f8f8f8" : "#ffffff",
              cursor: "pointer",
              fontFamily: "DMB, Arial, sans-serif",
              fontWeight: activeTab === "creator" ? "bold" : "normal",
              color: activeTab === "creator" ? "#3b82f6" : "#6b7280",
            }}
          >
            Creator Account
          </button>
        </div>

        <div className="form-container">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              style={{ width: "100%", padding: "0.75rem", marginBottom: "0.75rem", border: "1px solid #d1d5db", borderRadius: "5px", fontSize: "16px" }}
            />
          )}
          {isSignup && (
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="input-field"
              style={{ width: "100%", padding: "0.75rem", marginBottom: "0.75rem", border: "1px solid #d1d5db", borderRadius: "5px", fontSize: "16px" }}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            style={{ width: "100%", padding: "0.75rem", marginBottom: "0.75rem", border: "1px solid #d1d5db", borderRadius: "5px", fontSize: "16px" }}
          />
          <div className="password-input-container" style={{ position: "relative", width: "100%" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input-field password-input"
              style={{
                width: "100%",
                padding: "0.75rem",
                paddingRight: "2.5rem",
                marginBottom: "0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "5px",
                fontSize: "16px",
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
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && <div className="error-message" style={{ color: "red", fontSize: "14px", marginBottom: "1rem" }}>{error}</div>}

          <button
            onClick={isSignup ? handleSignup : handleLogin}
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#3b82f6",
              color: "#ffffff",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              fontFamily: "DMB, Arial, sans-serif",
            }}
          >
            {loading ? "Loading..." : isSignup ? "Sign Up" : "Sign In"}
          </button>

          <button
            onClick={() => handleDemoLogin(activeTab)}
            style={{
              marginTop: "1rem",
              padding: "0.75rem",
              backgroundColor: "#d1d5db",
              color: "#000000",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
              fontFamily: "DMB, Arial, sans-serif",
            }}
          >
            Demo Login
          </button>
          <p
        className="signup-switch"
        onClick={() => setIsSignup((prev) => !prev)}
        style={{
          marginTop: "1.5rem",
          color: "#3b82f6",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        {isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
      </p>

      <p
        className="reset-password-switch"
        onClick={() => setShowResetPassword(true)} // Show the password reset modal
        style={{
          
          color: "#3b82f6",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        {"Forgot password ?"}
      </p>

      {/* Password Reset Modal */}
      {showResetPassword && (
          <div className="reset-password-modal" style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
          }}>
            <div className="modal-content" style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              maxWidth: "400px",
            }}>
              <h2 style={{ marginBottom: "1rem", fontFamily: "DMB, Arial, sans-serif" }}>Reset Password</h2>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  marginBottom: "0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "5px",
                  fontSize: "16px",
                  boxSizing: "border-box",  // Ensures the input takes full width including padding
                }}
              />
              {error && <div className="error-message" style={{ color: "red", fontSize: "14px", marginBottom: "1rem" }}>{error}</div>}
              <button
                onClick={handleResetPassword}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  backgroundColor: "#3b82f6",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "16px",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  fontFamily: "DMB, Arial, sans-serif",
                }}
              >
                {loading ? "Loading..." : "Reset Password"}
              </button>
              <button
                onClick={() => setShowResetPassword(false)}
                style={{
                  marginTop: "1rem",
                  padding: "0.75rem",
                  backgroundColor: "#d1d5db",
                  color: "#000000",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "16px",
                  cursor: "pointer",
                  fontFamily: "DMB, Arial, sans-serif",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Login;

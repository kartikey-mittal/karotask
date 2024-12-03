import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import karoTask1 from '../assets/karoTask1.png'; // Importing the image

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login
    const fakeToken = "example-jwt-token";
    login(fakeToken);
    navigate("/user/dashboard");
  };

  return ( 
    <div className="login-container">
      <img src={karoTask1} alt="Karo Task" style={{ width: '200px', marginBottom: '20px' }} /> {/* Image element */}
      <h1>Log In to KaroTask</h1>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Login; 
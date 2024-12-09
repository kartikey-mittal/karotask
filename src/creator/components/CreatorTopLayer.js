import React, { useState } from "react";
import { FaUserCircle, FaLock, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { auth } from '../../firebase.js'; 

const CreatorTopLayer = ({ name, icon: Icon }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Redirect to the login page or perform other actions after logout
      window.location.href = '/login'; // Replace with your login page URL
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle the error appropriately, e.g., display an error message to the user
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#f4f4f4', borderBottom: '2px solid #ddd' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {Icon && <Icon size="1.5em" style={{ marginRight: '10px', color: '#858585' }} />}
        <h2 style={{ margin: '0', fontFamily: 'DMM', fontSize: '1rem', color: '#858585' }}>{name}</h2>
      </div>
      <div style={{ position: 'relative' }}>
        <FaUserCircle size="2em" color='#858585' onClick={toggleDropdown} style={{ cursor: 'pointer' }} />
        {dropdownVisible && (
          <div style={{ position: 'absolute', top: '100%', right: 0, width: '200px', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderRadius: '5px', marginTop: '10px', zIndex: 1 }}>
            <NavLink to="/user/account" style={{ textDecoration: 'none',color: 'inherit' }}>
              <div style={{ padding: '10px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <FaUserCircle style={{ marginRight: '10px', color: "#bfbfbf" }} />
                <span>My account</span>
              </div>
            </NavLink>
            <div style={{ padding: '10px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <FaLock style={{ marginRight: '10px', color: "#bfbfbf" }} />
              <span>Privacy</span>
            </div>
            <div style={{ padding: '10px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <FaQuestionCircle style={{ marginRight: '10px', color: "#bfbfbf" }} />
              <span>Help & Support</span>
            </div>
            <div style={{ padding: '10px', display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleLogout}>
              <FaSignOutAlt style={{ marginRight: '10px', color: "#bfbfbf" }} />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorTopLayer;

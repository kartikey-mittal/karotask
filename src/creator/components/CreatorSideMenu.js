import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaClipboardList, FaMoneyBillAlt,FaLaptopCode ,FaQuestionCircle  } from "react-icons/fa"; // Imported icons for new options
import logo from './../../assets/karoTask1.png'; 

const CreatorSideMenu = () => {
  return (
      <div style={{ width: "200px", borderRight: "1px solid #ddd", padding: "10px", height: "100%",backgroundColor: "#f4f4f4" }}>
      {/* Logo */}
      <div style={{ marginBottom: "0" }}>
        <img
          src={logo} 
          alt="Logo"
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      {/* Menu Items */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {/* Dashboard */}
        <li style={{ marginBottom: "10px" }}>
          <NavLink
            to="/creator/dashboard"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "white" : "#000",
              display: "flex",
              alignItems: "center",
              padding: "10px",
              borderRadius: "10px",
              backgroundColor: isActive ? "#2f2f2f" : "#f2f2f2", // Active state has #2f2f2f bg, inactive has light gray bg
            })}
            end // This ensures only the exact match will highlight this item.
          >
            <FaTachometerAlt style={{ marginRight: "10px", color: "darkgray" }} />
            Dashboard
          </NavLink>
        </li>

        {/* Tasks */}
        <li style={{ marginBottom: "10px" }}>
          <NavLink
            to="/creator/dashboard/task"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "white" : "#000",
              display: "flex",
              alignItems: "center",
              padding: "10px",
              borderRadius: "10px",
              backgroundColor: isActive ? "#2f2f2f" : "#f2f2f2", // Active state has #2f2f2f bg, inactive has light gray bg
            })}
          >
            <FaClipboardList style={{ marginRight: "10px", color: "darkgray" }} />
            Tasks
          </NavLink>
        </li>

        <li style={{ marginBottom: "10px" }}>
          <NavLink
            to="/creator/dashboard/faq"

            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "white" : "#000",
              display: "flex",
              alignItems: "center",
              padding: "10px",
              borderRadius: "10px",
              backgroundColor: isActive ? "#2f2f2f" : "#f2f2f2", // Active state has #2f2f2f bg, inactive has light gray bg
            })}
          >

            <FaQuestionCircle  style={{ marginRight: "10px", color: "darkgray" }} />
            FAQ

          </NavLink>
        </li>

        
      </ul>
    </div>
  );
};

export default CreatorSideMenu;

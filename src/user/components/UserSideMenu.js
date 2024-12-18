import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaMoneyBillAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import logo from "./../../assets/karoTask1.png"; // Main logo
import mobileLogo from "./../../assets/karoTaskMobile.png"; // Mobile logo

const UserSideMenu = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Detect screen width for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Prevent horizontal scrolling only for mobile view
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflowX = sidebarOpen ? "hidden" : "auto";
    }
  }, [sidebarOpen, isMobile]);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen || !isMobile ? "200px" : "60px", // Adjust width based on state	
          borderRight: "1px solid #ddd",
          backgroundColor: "#f4f4f4",
          // transition: "width 0.3s ease",
          position: "fixed", // Sidebar remains fixed
          height: "100vh",
          zIndex: 999,
        }}
      >
        {/* Logo */}
        <div
          style={{
            marginBottom: "20px",
            textAlign: "center",
            cursor: "pointer", // Clickable logo
          }}
          onClick={toggleSidebar} // Toggle sidebar on logo click
        >
          <img
            src={sidebarOpen || !isMobile ? logo : mobileLogo} // Use different logos for expanded/collapsed state
            alt="Logo"
            style={{
              width: sidebarOpen || !isMobile ? "100%" : "100%", // Adjust size
              height: "auto",
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>

        {/* Menu Items */}
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "10px" }}>
            <NavLink
              to="/user/dashboard"
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "white" : "#000",
                display: "flex",
                alignItems: "center",
                padding: "10px",
                justifyContent:  sidebarOpen || !isMobile ?'start':'center',
                borderRadius: "10px",
                backgroundColor: isActive ? "#2f2f2f" : "#f2f2f2",
              })}
              end
            >
              <FaTachometerAlt
                style={{
                  marginRight: sidebarOpen || !isMobile ? "10px" : "0",
                  color: "darkgray",
                  fontSize: "20px",
                }}
              />
              {sidebarOpen || !isMobile ? "Dashboard" : null}
            </NavLink>
          </li>

          <li style={{ marginBottom: "10px" }}>
            <NavLink
              to="/user/dashboard/task"
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "white" : "#000",
                display: "flex",
                alignItems: "center",
                padding: "10px",
                justifyContent:  sidebarOpen || !isMobile ?'start':'center',
                borderRadius: "10px",
                backgroundColor: isActive ? "#2f2f2f" : "#f2f2f2",
              })}
            >
              <FaClipboardList
                style={{
                  marginRight: sidebarOpen || !isMobile ? "10px" : "0",
                  color: "darkgray",
                  fontSize: "20px",
                }}
              />
              {sidebarOpen || !isMobile ? "Tasks" : null}
            </NavLink>
          </li>

          <li style={{ marginBottom: "10px" }}>
            <NavLink
              to="/user/dashboard/earning"
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "white" : "#000",
                display: "flex",
                alignItems: "center",
                padding: "10px",
                borderRadius: "10px",
                justifyContent:  sidebarOpen || !isMobile ?'start':'center',
                backgroundColor: isActive ? "#2f2f2f" : "#f2f2f2",
              })}
            >
              <FaMoneyBillAlt
                style={{
                  marginRight: sidebarOpen || !isMobile ? "10px" : "0",
                  color: "darkgray",
                  fontSize: "20px",
                }}
              />
              {sidebarOpen || !isMobile ? "Earnings" : null}
            </NavLink>
          </li>

          <li style={{ marginBottom: "10px" }}>
            <NavLink
              to="/user/dashboard/faq"
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "white" : "#000",
                display: "flex",
                alignItems: "center",
                padding: "10px",
                justifyContent:  sidebarOpen || !isMobile ?'start':'center',
                borderRadius: "10px",
                backgroundColor: isActive ? "#2f2f2f" : "#f2f2f2",
              })}
            >
              <FaQuestionCircle
                style={{
                  marginRight: sidebarOpen || !isMobile ? "10px" : "0",
                  color: "darkgray",
                  fontSize: "20px",
                }}
              />
              {sidebarOpen || !isMobile ? "FAQ" : null}
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        style={{
          flexGrow: 1, // Take remaining space
          marginLeft: sidebarOpen || !isMobile ? "200px" : "60px", // Adjust margin for sidebar
          transition: "margin-left 0.3s ease",
          padding: "",
          overflowY: "auto",
        }}
      >
        {children} {/* Main content passed as children */}
      </div>
    </div>
  );
};

export default UserSideMenu;


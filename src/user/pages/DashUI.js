import React, { useState } from 'react';
import StatBox from '../components/StatBox';
import TaskStatus from '../components/TaskStatus';
import LatestTasks from '../components/LatestTask';
import { FaTasks, FaSpinner, FaRegClock, FaRupeeSign } from 'react-icons/fa';
import { FaBell, FaTimes, FaUserCircle, FaTachometerAlt, FaLock, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';

const TopLayer = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FaTachometerAlt size="1.5em" style={{ marginRight: '10px', color: '#858585' }} />
        <h2 style={{ margin: '0', fontFamily: 'DMM', fontSize: '1rem', color: '#858585' }}>Dashboard</h2>
      </div>
      <div style={{ position: 'relative' }}>
        <FaUserCircle size="2em" color='#858585' onClick={toggleDropdown} style={{ cursor: 'pointer' }} />
        {dropdownVisible && (
          <div style={{ position: 'absolute', top: '100%', right: 0, width: '200px', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderRadius: '5px', marginTop: '10px', zIndex: 1 }}>
            <div style={{ padding: '10px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <FaUserCircle style={{ marginRight: '10px' ,color:"#bfbfbf"}} />
              <span>My account</span>
            </div>
            <div style={{ padding: '10px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <FaLock style={{ marginRight: '10px',color:"#bfbfbf" }} />
              <span>Privacy</span>
            </div>
            <div style={{ padding: '10px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <FaQuestionCircle style={{ marginRight: '10px',color:"#bfbfbf" }} />
              <span>Help & Support</span>
            </div>
            <div style={{ padding: '10px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <FaSignOutAlt style={{ marginRight: '10px',color:"#bfbfbf" }} />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DashUI = () => {
  const tasks = [
    { title: "Forward/share WhatsApp channel post WA9", price: 3.00, dueDate: "2025-03-31" },
    { title: "Forward/share WhatsApp channel post WA9", price: 3.00, dueDate: "2025-03-31" },
    { title: "Forward/share WhatsApp channel post WA9", price: 3.00, dueDate: "2025-03-31" },
    { title: "Forward/share WhatsApp channel post WA9", price: 3.00, dueDate: "2025-03-31" },
    { title: "Forward/share WhatsApp channel post WA9", price: 3.00, dueDate: "2025-03-31" },
    { title: "Forward/share WhatsApp channel post WA9", price: 3.00, dueDate: "2025-03-31" },
  ];

  return (
    <>
      <TopLayer />
      <div style={{ fontFamily: 'DMM, sans-serif', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <StatBox icon={<FaTasks size="2em" />} title="Total Tasks" value="194" color="#edf0ff" />
          <StatBox icon={<FaSpinner size="2em" />} title="Ongoing Tasks" value="7" color="#ffe8ef" />
          <StatBox icon={<FaRegClock size="2em" />} title="Pending Approval" value="0" color="#fcd4c8"/>
          <StatBox icon={<FaRupeeSign size="2em" />} title="My Earnings" value="₹15,000" color="#fff3d4" />
        </div>
        <div style={{ backgroundColor: '#E8F5E9', padding: '10px', borderRadius: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <FaBell style={{ marginRight: '10px',color:"#a30b4d" }} />
          <p style={{ margin: '0', flexGrow: '1' }}>You need to update your KYC, profile, social media links and UPI, only then you'll be able to make withdraw request.</p>
          <FaTimes style={{ cursor: 'pointer' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TaskStatus completed={0} inProgress={40} pendingApproval={0} />
          <LatestTasks tasks={tasks} />
        </div>
      </div>
    </>
  );
};

export default DashUI;

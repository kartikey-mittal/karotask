import React, { useState } from 'react';
import StatBox from '../components/StatBox';
import TaskStatus from '../components/TaskStatus';
import LatestTasks from '../components/LatestTask';
import { FaTasks, FaSpinner, FaRegClock, FaRupeeSign } from 'react-icons/fa';
import { FaBell, FaTimes, FaUserCircle, FaTachometerAlt, FaLock, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import UserTopLayer from '../components/UserTopLayer';


const TopLayer = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <UserTopLayer name="Dashboard" icon={FaTachometerAlt} />
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

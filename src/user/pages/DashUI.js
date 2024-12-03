import React from 'react';
import StatBox from '../components/StatBox';
import TaskStatus from '../components/TaskStatus';
import LatestTasks from '../components/LatestTask';
import { FaTasks, FaSpinner, FaRegClock, FaRupeeSign } from 'react-icons/fa';
import { FaBell, FaTimes } from 'react-icons/fa';
const DashUI = () => {
  const tasks = [
    { title: "Forward/share WhatsApp channel post WA9", price: 3.00, dueDate: "2025-03-31" },
    { title: "Forward/share WhatsApp channel post WA8", price: 3.00, dueDate: "2025-03-31" },
    { title: "Forward/share WhatsApp channel post WA7", price: 3.00, dueDate: "2025-03-31" },
    { title: "Forward/share WhatsApp channel post WA6", price: 3.00, dueDate: "2025-03-31" },
    { title: "Forward/share WhatsApp channel post WA5", price: 3.00, dueDate: "2025-03-31" },
    { title: "Forward/share WhatsApp channel post WA4", price: 3.00, dueDate: "2025-03-31" },
  ];

  return (
    <div style={{ fontFamily: 'DMM, sans-serif', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <StatBox icon={<FaTasks size="2em" />} title="Total Tasks" value="194" />
        <StatBox icon={<FaSpinner size="2em" />} title="Ongoing Tasks" value="7" />
        <StatBox icon={<FaRegClock size="2em" />} title="Pending Approval" value="0" />
        <StatBox icon={<FaRupeeSign size="2em" />} title="My Earnings" value="₹0" />
      </div>
      <div style={{ backgroundColor: '#E8F5E9', padding: '10px', borderRadius: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}> <FaBell style={{ marginRight: '10px' }} /> <p style={{ margin: '0', flexGrow: '1' }}>You need to update your KYC, profile, social media links and UPI, only then you'll be able to make withdraw request.</p> <FaTimes style={{ cursor: 'pointer' }} /> </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <TaskStatus completed={0} inProgress={40} pendingApproval={0} />
        <LatestTasks tasks={tasks} />
      </div>
    </div>
  );
};

export default DashUI;

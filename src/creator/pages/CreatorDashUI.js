import React, { useState } from 'react';
import StatsBox from '../../components/StatsBox';


import { FaTasks, FaSpinner, FaRegClock, FaRupeeSign ,FaBan} from 'react-icons/fa';
import { FaBell, FaTimes, FaUserCircle, FaTachometerAlt, FaLock, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';

import CreatorTopLayer from '../components/CreatorTopLayer';
import LatestTask from '../../components/LatestTask';
import TaskStatus from '../../components/TaskStatus';




const CreatorDashUI = () => {
  const stats = [
    { icon: <FaTasks size="2em" />, title: "Total Tasks", value: "4", color: "#edf0ff" },
    { icon: <FaSpinner size="2em" />, title: "Ongoing Tasks", value: "4", color: "#ffe8ef" },
    { icon: <FaRegClock size="2em" />, title: "Pending Approval", value: "0", color: "#fcd4c8" },
    { icon: <FaRupeeSign size="2em" />, title: "My Spending", value: "₹0", color: "#fff3d4" },
    { icon: <FaBan size="2em" />, title: "Rejected Tasks", value: "0", color: "#fbeaea" },
  ];
  const tasks = [
    { title: "Forward/share WhatsApp channel post WA9", price: 3.00, dueDate: "2025-03-31", status: "ongoing" },
    { title: "Forward/share WhatsApp channel post WA9", price: 3.00, dueDate: "2025-03-31", status: "completed" },
    { title: "Forward/share WhatsApp channel post WA9", price: 3.00, dueDate: "2025-03-31", status: "pending" },
    { title: "Forward/share WhatsApp channel post WA9", price: 3.00, dueDate: "2025-03-31", status: "ongoing" },
    { title: "Forward/share WhatsApp channel post WA9", price: 3.00, dueDate: "2025-03-31", status: "completed" },
    { title: "Forward/share WhatsApp channel post WA9", price: 3.00, dueDate: "2025-03-31", status: "pending" },
  ];

  return (
    <>
       <CreatorTopLayer name="Creator Dashboard" icon={FaTachometerAlt} />
      <div style={{ fontFamily: 'DMM, sans-serif', padding: '20px' }}>
      <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: '20px',
      }}
    >
      {stats.map((stat, index) => (
        <StatsBox
          key={index}
          icon={stat.icon}
          title={stat.title}
          value={stat.value}
          color={stat.color}
        />
      ))}
    </div>
        <div style={{ backgroundColor: '#E8F5E9', padding: '10px', borderRadius: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <FaBell style={{ marginRight: '10px',color:"#a30b4d" }} />
          <p style={{ margin: '0', flexGrow: '1' }}>Youre' Creator</p>
          <FaTimes style={{ cursor: 'pointer' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TaskStatus completed={0} inProgress={40} pendingApproval={0} role="creator" />
          <LatestTask tasks={tasks} role="creator" />
        </div>
      </div>
    </>
  );
};

export default CreatorDashUI;

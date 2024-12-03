import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const TaskStatus = ({ completed, inProgress, pendingApproval }) => {
  const data = {
    labels: ['Completed', 'In Progress', 'Pending Approval'],
    datasets: [
      {
        data: [completed, inProgress, pendingApproval],
        backgroundColor: ['#66BB6A', '#FFA726', '#cf1270'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '80%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{
      backgroundColor: '#f7f9fb',
      padding: '20px',
      borderRadius: '10px',
      width: '200px',
      boxShadow: '0 4px 2px rgba(0, 0, 0, 0.1)',
      margin: '10px',
      textAlign: 'center',border:'0.2px solid #f6f6f6'
    }}>
      <h3 style={{ marginBottom: '20px' }}>Task Status</h3>
      <Doughnut data={data} options={options} />
      <div style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px',fontSize:"0.8rem" }}>
          <span style={{ color: '#208b3e',fontSize:"0.8rem" }}>● Completed</span>
          <span>{completed}%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' ,fontSize:"0.8rem"}}>
          <span style={{ color: '#FFA726',fontSize:"0.8rem" }}>● In Progress</span>
          <span>{inProgress}%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between',fontSize:"0.8rem" }}>
          <span style={{ color: '#cf1270',fontSize:"0.8rem" }}>● Pending Approval</span>
          <span>{pendingApproval}%</span>
        </div>
      </div>
    </div>
  );
};

export default TaskStatus;

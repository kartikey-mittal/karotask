import React from 'react';

const StatBox = ({ icon, title, value }) => {
  return (
    <div style={{
      backgroundColor: '#e3f5ff',
      padding: '20px',
      borderRadius: '10px',
      width: '200px',
      boxShadow: '0 4px 2px rgba(0, 0, 0, 0.1)',
      margin: '10px',
      position: 'relative'
    }}>
      <div style={{ position: 'absolute', top: '20px', right: '15px', fontSize:"0.5rem" ,color:"#353739"}}>
        {icon}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ margin: '0', fontSize: '14px', color: '#333' }}>{title}</h3>
        <p style={{ fontSize: '2rem', margin: '0', color: '#333',top:'0.2rem' ,fontFamily:'DMB'}}>{value}</p>
      </div>
    </div>
  );
};

export default StatBox;

import React from 'react';

const StatsBox = ({ icon, title, value, color }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        padding: '20px',
        borderRadius: '10px',
        flexGrow: 1, // Allows the box to grow and shrink dynamically
        minWidth: '150px', // Minimum width to ensure proper readability
        margin: '10px',
        boxShadow: '0 4px 2px rgba(0, 0, 0, 0.1)',
        border: '0.2px solid #e5e5e5',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '15px',
          fontSize: '0.5rem',
          color: '#7a7a7a',
        }}
      >
        {icon}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ margin: '0', fontSize: '14px', color: '#333' }}>{title}</h3>
        <p
          style={{
            fontSize: '2rem',
            margin: '0',
            color: '#333',
            fontFamily: 'DMB',
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatsBox;

import React from 'react';

const LatestTasks = ({ tasks }) => {
  return (
    <div style={{
      backgroundColor: '#f7f9fb',
      padding: '20px',
      borderRadius: '10px',
      width: '73%',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      margin: '10px',
      position: 'relative'
    }}>
      <h3 style={{ margin: '0' }}>Latest Tasks</h3>
      <button style={{
        padding: '5px 10px',
        backgroundColor: '#d9418d',
        color: '#FFF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        position: 'absolute',
        top: '20px',
        right: '20px',fontFamily:"DMM"
      }}>Show All</button>
      <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '10px', overflow: 'hidden', marginTop: '40px' }}>
        <thead>
          <tr style={{ backgroundColor: '#2f2f2f', color: '#FFF', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Title</th>
            <th style={{ padding: '10px' }}>Price</th>
            <th style={{ padding: '10px' }}>Due Date</th>
            <th style={{ padding: '10px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} style={{
              backgroundColor: '#FFF',
              borderBottom: '1px solid #ddd',
            }}>
              <td style={{ padding: '10px' }}>{task.name}</td>
              <td style={{ padding: '10px' }}>₹{task.price}</td>
              <td style={{ padding: '10px' }}>{task.dueDate}</td>
              <td style={{ padding: '10px' }}>
                <button style={{
                  padding: '5px 10px',
                  backgroundColor: '#2f2f2f',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',fontFamily:'DMM'
                }}>Start Task</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LatestTasks;

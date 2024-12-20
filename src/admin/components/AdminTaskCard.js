import React from 'react';
import { FaUserCircle, FaClock, FaCheckCircle, FaEdit, FaTrashAlt, FaRupeeSign, FaCalendarAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';  // Import NavLink from react-router-dom
import DOMPurify from 'dompurify';
const AdminTaskCard = ({ id, title, date, status, price, dueDate, description, tags,maxSubmission }) => {
  const sanitizedDescription = DOMPurify.sanitize(description, {
    ALLOWED_TAGS: ['h1', 'h2', 'p', 'ol', 'li', 'br'],
    ALLOWED_ATTR: []
  });
  return (
    <div
      style={{
        width: '100%',
        border: '1px solid #e8e8e8',
        borderRadius: '8px',
        padding: '16px',
        margin: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box',
        backgroundColor: '#f7f9fb',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaUserCircle size={40} style={{ color: '#1890ff' }} />
          <div style={{ marginLeft: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: '#333' }}>
              {title}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666' }}>
              <span>{date}</span>
              <span
                style={{
                  backgroundColor: '#fff3cd',
                  padding: '4px 4px',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  color: '#555555',
                }}
              >
                {status}
              </span>
            </div>
          </div>
        </div>

        <button
  style={{
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#2f2f2f',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'DMM',
  }}
>
<NavLink 
  to={`/admin/dashboard/task/task-info/${id}`}  
  state={{
    id,
    title,
    date,
    status,
    price,
    dueDate,
    description,
    tags,
    maxSubmission,
  }}
    style={{
      display: 'flex',
      alignItems: 'center',
      color: 'inherit', // Ensures the text color from button is applied
      textDecoration: 'none', // Prevent default underline from NavLink
    }}
  >
    <FaEdit style={{ marginRight: '4px' }} /> Edit Details
  </NavLink>
</button>

      </div>
      <div style={{ marginTop: '16px', color: '#333', fontSize: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <p style={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem', color: '#621c1c' }}>
            <FaRupeeSign style={{ marginRight: '4px', color: '#afafaf' }} />
            Price Submission - ₹{price.toFixed(2)}
          </p>
          <p style={{ color: '#e5ecf6' }}>|</p>
          <p style={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem', color: '#621c1c' }}>
            <FaCalendarAlt style={{ marginRight: '4px', color: '#afafaf' }} />
            Due Date: {dueDate}
          </p>
        </div>
        <span style={{ padding: 0, fontFamily: 'DMB' }}>
  {DOMPurify.sanitize(description, { ALLOWED_TAGS: [] })}
</span>
        <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap' }}>
          {tags.map((tag, index) => (
            <span
              key={index}
              style={{
                backgroundColor: '#e5ecf6',
                padding: '2px 4px',
                borderRadius: '4px',
                marginRight: '8px',
                marginBottom: '8px',
                fontSize: '0.8rem',
              }}
            >
              {tag}
            </span>
            
          ))}
           <span
           
              style={{
                backgroundColor: '#c2dff0',
                padding: '2px 4px',
                borderRadius: '4px',
                marginRight: '8px',
                marginBottom: '8px',
                fontSize: '0.8rem',
              }}
            >
       {id}
            </span>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '5px',
          color: '#848586',
        }}
      >
        <div>
          <FaCheckCircle title="Unlimited Submissions" style={{ marginRight: '8px' }} />
          <FaClock title="Other Feature" />
        </div>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ff4d4f',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'DMM',
          }}
        >
          <FaTrashAlt style={{ marginRight: '4px' }} /> Delete
        </button>
      </div>
    </div>
  );
};

export default AdminTaskCard;

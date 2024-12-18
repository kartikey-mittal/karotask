import React, { useState } from 'react';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import UserTopLayer from '../components/UserTopLayer';
import PayoutHistoryTable from '../components/PayoutHistoryTable';

const TopLayer = () => {
  return <UserTopLayer name="Earnings" icon={FaMoneyCheckAlt} />;
};

const MyEarnings = ({ onRequestPayout }) => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          borderBottom: '1px solid #ddd',
          gap: '50px',
        }}
      >
        <div style={{ borderRight: '1px solid #ddd', paddingRight: '20px' }}>
          <h3 style={{ color: '#a9a9a9' }}>Net Earnings</h3>
          <h3 style={{ fontFamily: 'DMB' }}>₹0</h3>
        </div>
        <div style={{ borderRight: '1px solid #ddd', paddingRight: '20px', paddingLeft: '0px' }}>
          <h3 style={{ color: '#a9a9a9' }}>Withdrawn</h3>
          <h3>₹0</h3>
        </div>
        <div>
          <h3 style={{ color: '#a9a9a9' }}>Available</h3>
          <h3>₹0</h3>
        </div>
      </div>
      <div
        style={{
          padding: '15px',
          backgroundColor: '#eef2f8',
          border: '1px solid #ddd',
          margin: '16px',
          borderRadius: '1rem',
          position: 'relative',
        }}
      >
        <p style={{ marginBottom: '10px', fontFamily: 'DMB' }}>
          Withdraw Your Money to a Bank Account
        </p>
        <FaMoneyCheckAlt
          size="1.5em"
          style={{ position: 'absolute', top: '10px', right: '50px', color: '#2f2f2f' }}
        />
        <p style={{ marginTop: '10px', color: '#939699' }}>
          Withdraw money securely to your bank account. The minimum payout is Rs.100, and payments are
          released every Monday.
        </p>
        <button
          style={{
            backgroundColor: '#2f2f2f',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            fontFamily: 'DMM',
          }}
          onClick={onRequestPayout}
        >
          Request Payout
        </button>
      </div>
    </div>
  );
};

const PayoutHistory = () => {
  return <PayoutHistoryTable />;
};

const Modal = ({ onClose, onSubmit }) => {
  const [upiId, setUpiId] = useState('');

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          width: '300px',
          textAlign: 'center',
        }}
      >
        <h3>Request Payout</h3>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>UPI ID/Mobile No:</label>
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Amount:</label>
          <input
            type="text"
            value="₹20"
            readOnly
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <button
          style={{
            backgroundColor: '#2f2f2f',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            marginRight: '10px',
          }}
          onClick={() => {
            alert('Submitted Successfully');
            onSubmit();
          }}
        >
          Submit
        </button>
        <button
          style={{
            backgroundColor: '#ff4081',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
          }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const EarningsPage = () => {
  const [selectedTab, setSelectedTab] = useState('myEarnings');
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <div 
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
    }}
  >
    {/* Fixed Top Layer */}
    <div 
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          width: '100%',
        }}
      >
      <TopLayer />
      </div>
      {/* Scrollable Content */}
      <div 
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '20px',
          fontFamily: 'DMM, sans-serif',
          // Custom Scrollbar Styles
          scrollbarWidth: 'thin',
          scrollbarColor: '#d63384 #f1f1f1',
        }}
        // WebKit (Chrome, Safari, newer versions of Opera) scrollbar styling
        className="custom-scrollbar"
      >
      <div style={{ display: 'flex', borderBottom: '2px solid #ddd' }}>
        <div
          onClick={() => setSelectedTab('myEarnings')}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            fontWeight: selectedTab === 'myEarnings' ? 'bold' : 'normal',
            color: selectedTab === 'myEarnings' ? '#ff4081' : '#858585',
            borderBottom: selectedTab === 'myEarnings' ? '2px solid #ff4081' : 'none',
          }}
        >
          My Earnings
        </div>
        <div
          onClick={() => setSelectedTab('payoutHistory')}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            fontWeight: selectedTab === 'payoutHistory' ? 'bold' : 'normal',
            color: selectedTab === 'payoutHistory' ? '#ff4081' : '#858585',
            borderBottom: selectedTab === 'payoutHistory' ? '2px solid #ff4081' : 'none',
          }}
        >
          Payout History
        </div>
      </div>
      <div>
        {selectedTab === 'myEarnings' && <MyEarnings onRequestPayout={() => setModalVisible(true)} />}
        {selectedTab === 'payoutHistory' && <PayoutHistory />}
      </div>
      {isModalVisible && (
        <Modal
          onClose={() => setModalVisible(false)}
          onSubmit={() => setModalVisible(false)}
        />
      )}
    </div>
    </div>
  );
};

export default EarningsPage;
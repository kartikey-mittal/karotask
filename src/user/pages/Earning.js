
import React, { useState } from 'react';
import { FaUserCircle, FaTachometerAlt, FaLock, FaQuestionCircle, FaSignOutAlt, FaMoneyCheckAlt, } from 'react-icons/fa';
import UserTopLayer from '../components/UserTopLayer';
import PayoutHistoryTable from '../components/PayoutHistoryTable';

const TopLayer = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <UserTopLayer name="Earnings" icon={FaMoneyCheckAlt} />
  );
};

const MyEarnings = () => {
  return (
    <div>
      <div style={{ display: 'flex', padding: '20px', backgroundColor: '#f9f9f9', borderBottom: '1px solid #ddd', gap: '50px' }}>
        <div style={{ borderRight: '1px solid #ddd', paddingRight: '20px' }}>
        <h3 style={{color:'#a9a9a9'}}>Net Earnings</h3>
          <h3 style={{fontFamily:'DMB', }}>₹0</h3>
        </div>
        <div style={{ borderRight: '1px solid #ddd', paddingRight: '20px',paddingLeft:'0px' }}>
        <h3 style={{color:'#a9a9a9'}}>Withdrawn</h3>
          <h3>₹0</h3>
        </div>
        <div>
          <h3 style={{color:'#a9a9a9'}}>Available</h3>
          <h3>₹0</h3>
        </div>
      </div>
      <div style={{ padding: '15px', backgroundColor: '#eef2f8', border: '1px solid #ddd', margin: '16px', borderRadius: '1rem', position: 'relative' }}>
        <p style={{ marginBottom: '10px',fontFamily:'DMB' }}>Withdraw Your Money to a Bank Account</p>
        <FaMoneyCheckAlt size="1.5em" style={{ position: 'absolute', top: '10px', right: '50px', color: '#2f2f2f' }} />
        <p style={{ marginTop: '10px',color:"#939699" }}>Withdraw money securely to your bank account. The minimum payout is Rs.100, and payments are released every Monday.</p>
        <button style={{ backgroundColor: '#2f2f2f', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px' ,fontFamily:"DMM"}}>Request Payout</button>
      </div>
    </div>
  );
};

const PayoutHistory = () => {
  return <PayoutHistoryTable />;
};

const EarningsPage = () => {
  const [selectedTab, setSelectedTab] = useState('myEarnings');

  return (
    <div>
      <TopLayer />
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
        {selectedTab === 'myEarnings' && <MyEarnings />}
        {selectedTab === 'payoutHistory' && <PayoutHistory />}
      </div>
    </div>
  );
};

export default EarningsPage;

import React, { useState } from 'react';
import UserTopLayer from '../components/UserTopLayer';
import { FaUserCircle } from 'react-icons/fa';
import PersonalDetails from '../components/Account/PersonalDetails';
// import TaskPreference from '../components/TaskPreference';
// import PaymentMethods from '../components/PaymentMethods';
// import Notifications from '../components/Notifications';
import UserPassword from '../components/Account/UserPassword';

const UserAccount = () => {
  const tabs = {
    'Personal Details': <PersonalDetails />,
    'Task Preference': <PersonalDetails />,
    'Payment Methods': <PersonalDetails />,
    'Notifications': <PersonalDetails />,
    'Email & Phone Number': <div>Email & Phone Number content</div>,
    'Social': <div>Social content</div>,
    'Password': <UserPassword/>,
    'KYC': <div>KYC content</div>,
    'Security': <div>Security content</div>,
  };

  const [activeTab, setActiveTab] = useState('Personal Details');

  return (
    <>
      <UserTopLayer name="Account" icon={FaUserCircle} />
      <div className="tabs" style={{ display: 'flex', borderBottom: '2px solid #ddd' }}>
        {Object.keys(tabs).map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 20px',
              cursor: 'pointer',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
              color: activeTab === tab ? '#ff4081' : '#858585',
              borderBottom: activeTab === tab ? '2px solid #ff4081' : 'none',
              transition: 'color 0.3s, border-bottom 0.3s'
            }}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="tab-content" style={{ padding: '20px' }}>
        {tabs[activeTab]}
      </div>
    </>
  );
};

export default UserAccount;

import React, { useState ,useEffect} from 'react';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { db } from '../../firebase'; // Adjust the path based on your project structure
import { collection, addDoc, doc, setDoc,getDoc,updateDoc } from 'firebase/firestore';
import UserTopLayer from '../components/UserTopLayer'
import PayoutHistoryTable from '../components/PayoutHistoryTable'
import { useNavigate } from 'react-router-dom';

const TopLayer = () => {
  return <UserTopLayer name="Earnings" icon={FaMoneyCheckAlt} />;
};

const MyEarnings = ({ onRequestPayout }) => {
  const [earningsData, setEarningsData] = useState({
    netEarnings: '₹0',
    withdrawn: '₹0',
    available: '₹0',
  });
  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const userUID = localStorage.getItem('User-UID'); // Get UID from localStorage
        if (!userUID) {
          console.error('User-UID not found in localStorage');
          return;
        }
        
        const userDocRef = doc(db, 'users', userUID);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setEarningsData({
            netEarnings: `₹${data.netEarning || 0}`,
            withdrawn: `₹${data.withdrawnMoney || 0}`,
            available: `₹${data.availableMoney || 0}`,
          });
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user earnings:', error);
      }
    };

    fetchEarnings();
  }, []);
  return (
    <div>
      <div className="cards-container">
      {[
          { label: 'Net Earnings', value: earningsData.netEarnings },
          { label: 'Withdrawn', value: earningsData.withdrawn },
          { label: 'Available', value: earningsData.available },
        ].map((item, index) => (
          <div key={index} className="card">
            <h4 className="card-label">{item.label}</h4>
            <h3 className="card-value">{item.value}</h3>
          </div>
        ))}
      </div>

      <div className="withdraw-section">
        <p className="withdraw-title">Withdraw Your Money to a Bank Account</p>
        <FaMoneyCheckAlt className="withdraw-icon" />
        <p className="withdraw-description">
          Withdraw money securely to your bank account. The minimum payout is Rs.100, and payments
          are released every Monday.
        </p>
        <button className="withdraw-button" onClick={onRequestPayout}>
          Request Payout
        </button>
      </div>
    </div>
  );
};

const PayoutHistory = () => {
  return <PayoutHistoryTable />;
};



const EarningsPage = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('myEarnings');
  const [isModalVisible, setModalVisible] = useState(false);
  const [upi, setUpi] = useState('');
  const [amount, setAmount] = useState('');
  const [availableAmount, setAvailableAmount] = useState(0);
  const [withdrawnMoney, setWithdrawnMoney] = useState(0);
  const [netEarning, setNetEarning] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  // Fetch user earnings data from Firestore
  useEffect(() => {
    const fetchUserEarnings = async () => {
      try {
        const userUID = localStorage.getItem('User-UID');
        if (!userUID) {
          alert('User-UID not found in localStorage');
          return;
        }

        const userDocRef = doc(db, 'users', userUID);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const { availableMoney, withdrawnMoney, netEarning,email,name } = userDoc.data();
          setAvailableAmount(availableMoney || 0);
          setWithdrawnMoney(withdrawnMoney || 0);
          setNetEarning(netEarning || 0);
          setName(name || "");
          setEmail(email || "");
        } else {
          alert('User data not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserEarnings();
  }, []);

  const handleSubmit = async () => {
    if (amount > availableAmount) {
      alert('Amount exceeds available balance.');
      return;
    }
  
    try {
      const userUID = localStorage.getItem('User-UID');
      if (!userUID) {
        alert('User-UID not found in localStorage');
        return;
      }
  
      const payoutDocRef = await addDoc(collection(db, 'payments'), {
        userId: userUID,
        upiId: upi,
        amount: parseFloat(amount),
        requestDate: new Date().toISOString(),
        status: 'pending',
        name: name,
        email: email,
      });
  
      const paymentID = payoutDocRef.id;
      const userPaymentsRef = doc(db, `users/${userUID}/payments/${paymentID}`);
      const remainingBalance = parseFloat(availableAmount) - parseFloat(amount);
  
      await setDoc(userPaymentsRef, {
        createdAt: new Date().toISOString(),
        remainingBalance,
        requestMoney: parseFloat(amount),
        status: 'pending',
        paymentID,
      });
  
      // Update the availableMoney in the user's document
      const userDocRef = doc(db, `users/${userUID}`);
      await updateDoc(userDocRef, {
        availableMoney: remainingBalance,
      });
  
      alert(`Payout request submitted successfully. Reference ID: ${paymentID}`);
      setModalVisible(false);
      setUpi('');
      setAmount('');
  
      // Navigate to /user/dashboard/earning
      navigate('/user/dashboard/');
    } catch (error) {
      console.error('Error submitting payout request:', error);
      alert('Failed to submit payout request. Please try again later.');
    }
  };
  



  return (
    <div className="page-container">
      <div className="top-layer">
        <TopLayer />
      </div>
      <div className="content-container">
        <div className="content-wrapper">
          <div className="tabs-container">
            <div
              onClick={() => setSelectedTab('myEarnings')}
              className={`tab ${selectedTab === 'myEarnings' ? 'active' : ''}`}
            >
              My Earnings
            </div>
            <div
              onClick={() => setSelectedTab('payoutHistory')}
              className={`tab ${selectedTab === 'payoutHistory' ? 'active' : ''}`}
            >
              Payout History
            </div>
          </div>
          <div className="tab-content">
          {selectedTab === 'myEarnings' && <MyEarnings onRequestPayout={() => setModalVisible(true)} />}
            {selectedTab === 'payoutHistory' && <PayoutHistory />}
          </div>
         
        </div>
        {isModalVisible && (
  <div className="modal-overlay">
    <div className="modal-container">
      <h3 className="modal-header">Request Payout</h3>
      <label>
        UPI ID:
        <input
          type="text"
          value={upi}
          onChange={(e) => setUpi(e.target.value)}
          className="modal-input"
        />
      </label>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="modal-input"
        />
      </label>
      <button onClick={handleSubmit} className="submit-button">Submit</button>
      <button onClick={() => setModalVisible(false)} className="cancel-button">Cancel</button>
    </div>
  </div>
)}

      </div>
      <style jsx>{`
        .page-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: hidden;
          max-width: 100vw;
        }
        .top-layer {
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
        }
        .content-container {
          flex-grow: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 0.5rem;
          font-family: DMM, sans-serif;
          scrollbar-width: thin;
          scrollbar-color: #d63384 #f1f1f1;
        }
        .content-wrapper {
          display: flex;
          flex-direction: column;
          max-width: 100%;
        }
        .tabs-container {
          display: flex;
          justify-content: space-around;
          border-bottom: 2px solid #ddd;
          margin: 0 -20px;
          padding: 0 20px;
        }
        .tab {
          padding: 10px;
          cursor: pointer;
          color: #858585;
          position: relative;
          white-space: nowrap;
        }
        .tab.active {
          font-weight: bold;
          color: #ff4081;
          border-bottom: 2px solid #ff4081;
        }
        .tab-content {
          width: 100%;
          overflow-x: hidden;
        }
        .cards-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          padding: 20px 0;
          border-bottom: 1px solid #ddd;
          justify-content: space-between;
        }
        .card {
          flex: 1 1 calc(33% - 20px);
          min-width: 180px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 15px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .card-label {
          margin: 0;
          color: #a9a9a9;
          font-weight: normal;
          font-size: 14px;
        }
        .card-value {
          margin: 0;
          font-family: DMB;
          font-size: 20px;
          color: #333;
        }
        .withdraw-section {
          padding: 15px;
          background-color: #eef2f8;
          border: 1px solid #ddd;
          margin: 16px 0;
          border-radius: 1rem;
          position: relative;
        }
        .withdraw-title {
          margin-bottom: 10px;
          font-family: DMB;
        }
        .withdraw-icon {
          position: absolute;
          top: 10px;
          right: 20px;
          color: #2f2f2f;
        }
        .withdraw-description {
          margin-top: 10px;
          color: #939699;
        }
        .withdraw-button {
          background-color: #2f2f2f;
          color: #fff;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          font-family: DMM;
          width: 100%;
          cursor: pointer;
        }
           /* Modal Background Overlay */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  /* Modal Container */
  .modal-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    border-radius: 8px;
    padding: 20px;
    z-index: 1000;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: 'DMM', sans-serif;
  }

  /* Modal Header */
  .modal-header {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 15px;
    text-align: center;
  }

  /* Input Fields */
  .modal-input {
    display: block;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  /* Submit Button */
  .submit-button {
    width: 100%;
    padding: 12px;
    background-color: #2f2f2f;
    color: #ffffff;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-family: 'DMM', sans-serif;
  }

  .submit-button:hover {
    background-color: #454545;
  }

  /* Cancel Button */
  .cancel-button {
    width: 100%;
    padding: 12px;
    background-color: #ddd;
    color: #333;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    font-family: 'DMM', sans-serif;
  }

  .cancel-button:hover {
    background-color: #bbb;
  }

  /* Responsive Behavior */
  @media screen and (max-width: 480px) {
    .modal-container {
      width: 95%;
      padding: 15px;
    }

    .modal-header {
      font-size: 1.2rem;
    }

    .submit-button, .cancel-button {
      font-size: 0.9rem;
    }
  }
        
      `}</style>
    </div>
  );
};

export default EarningsPage;
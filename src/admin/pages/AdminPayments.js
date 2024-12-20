import React, { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../firebase'; // Importing Firestore instance
import AdminTopLayer from '../components/AdminTopLayer';
import { FaTasks, FaEnvelope, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';
import Loading from './../../components/Loading';

const AdminPayments = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('date');
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false); // New state for update loading

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const paymentsRef = collection(db, 'payments');
      let q = query(
        paymentsRef,
        where('status', '==', activeTab),
        orderBy(sortOption === 'date' ? 'requestDate' : 'amount')
      );
      const querySnapshot = await getDocs(q);
      const fetchedPayments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPayments(fetchedPayments);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, [activeTab, sortOption]);

  const filteredPayments = payments.filter((payment) =>
    payment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePaymentUpdate = async (id, userId, amount) => {
    setUpdating(true); // Set updating state to true
    try {
      // Update the payment status in the main payments collection
      const paymentDoc = doc(db, 'payments', id);
      await updateDoc(paymentDoc, { status: 'completed' });

      // Update the payment status in the user's subcollection
      const userPaymentDoc = doc(db, `users/${userId}/payments`, id);
      await updateDoc(userPaymentDoc, { status: 'completed' });

      // Get the current withdrawnMoney value
      const userDoc = doc(db, 'users', userId);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        const currentWithdrawnMoney = userSnapshot.data().withdrawnMoney || 0;

        // Decrement the withdrawnMoney value
        const newWithdrawnMoney = currentWithdrawnMoney + amount;
        await updateDoc(userDoc, { withdrawnMoney: newWithdrawnMoney });
      } else {
        console.error('User does not exist!');
      }

      fetchPayments();
      setSelectedPayment(null); // Close the popup
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
    setUpdating(false); // Set updating state to false
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('UPI ID copied to clipboard!');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        fontFamily: 'DMM, sans-serif',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: '#fff',
        }}
      >
        <AdminTopLayer name="Admin Payments" icon={FaTasks} />
      </div>

      <div
        className="tabs"
        style={{
          display: 'flex',
          borderBottom: '2px solid #ddd',
          marginBottom: '10px',
        }}
      >
        {['pending', 'completed'].map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              backgroundColor: '#f7f9fb',
              padding: '10px 20px',
              cursor: 'pointer',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
              color: activeTab === tab ? '#000' : '#858585',
              borderBottom: activeTab === tab ? '2px solid #ff4081' : 'none',
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      <div style={{ padding: '10px 20px', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginRight: '10px',
            width: '80%',
            fontFamily: 'DMM',
          }}
        />

        <button
          onClick={() => setSortOption(sortOption === 'date' ? 'amount' : 'date')}
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            cursor: 'pointer',
            fontFamily: 'DMM',
          }}
        >
          Sort by {sortOption === 'date' ? 'Amount' : 'Date'}
        </button>
      </div>

      <div
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          overflowY: 'auto',
        }}
      >
        {loading ? (
          <Loading />
        ) : filteredPayments.length > 0 ? (
          filteredPayments.map((payment) => (
            <div
              key={payment.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '10px',
                marginBottom: '10px',
                gap: '10px',
                backgroundColor: '#f7f9fb',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3>{payment.name}</h3>
                  <FaEnvelope style={{ color: '#555' }} />
                  <p style={{ margin: 0, fontSize: '14px', color: '#777' }}>{payment.email}</p>
                </div>
                <button
                  onClick={() => setSelectedPayment(payment)}
                  style={{
                    padding: '10px 10px',
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontFamily: 'DMB',
                  }}
                >
                  Submit Payment
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaMoneyBillWave style={{ color: '#555' }} />
                  <p style={{ margin: 0, fontSize: '14px' }}>UPI ID:</p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '1rem',
                      color: '#000',
                      backgroundColor: '#fff3cd',
                      padding: '0px 10px',
                      borderRadius: '5px',
                      fontFamily: 'DMB',
                    }}
                  >
                    {payment.upiId}
                  </p>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    padding: '0px 10px',
                    color: 'black',
                    borderRadius: '5px',
                    fontFamily: 'DMB',
                  }}
                >
                  ₹{payment.amount}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaCalendarAlt style={{ color: '#555' }} />
                <p
                  style={{
                    margin: 0,
                    fontSize: '12px',
                    backgroundColor: '#f0f0f0',
                    padding: '2px 5px',
                    borderRadius: '3px',
                  }}
                >
                  {new Date(payment.requestDate).toLocaleString()}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: '12px',
                    backgroundColor: '#c2dff0',
                    padding: '2px 5px',
                    borderRadius: '3px',
                  }}
                >
                  {payment.id}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', fontSize: '18px', color: '#777' }}>
            No payments available.
          </p>
        )}

        {selectedPayment && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '10px',
                width: '400px',
                color: '#333', // Grayish-black color
                position: 'relative', // To help position the buttons
                boxSizing: 'border-box', // Ensure padding is included in width/height
              }}
            >
              <h2 style={{ margin: '0 0 20px 0', textAlign: 'center' }}>Payment Details</h2>
              <p>
                <strong>Name:</strong> {selectedPayment.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedPayment.userId}
              </p>
              <p>
                <strong>UPI ID:</strong> {selectedPayment.upiId}{' '}
                <button
                  onClick={() => copyToClipboard(selectedPayment.upiId)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#fff',
                    color: '#007bff',
                    border: '1px solid #007bff',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginLeft: '10px',
                  }}
                >
                  Copy
                </button>
              </p>
              <div
                style={{
                  right: '10px', // Provide some padding on the sides
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <button
                  onClick={() => setSelectedPayment(null)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#6c757d',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontFamily: 'DMB',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handlePaymentUpdate(selectedPayment.id, selectedPayment.userId, selectedPayment.amount)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontFamily: 'DMB',
                  }}
                >
                  {updating ? <Loading /> : `Pay ₹${selectedPayment.amount}`}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPayments;
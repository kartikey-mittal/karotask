import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { db } from './../../firebase'; // Import your Firebase configuration
import { collection, getDocs, doc } from 'firebase/firestore';

const PayoutHistoryTable = () => {
  const [payouts, setPayouts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const payoutsPerPage = 10;
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = screenWidth <= 768;

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchPayouts = async () => {
      const userUID = localStorage.getItem('User-UID'); // Retrieve User-UID from local storage
      if (!userUID) return;

      try {
        const paymentsRef = collection(doc(db, 'users', userUID), 'payments');
        const querySnapshot = await getDocs(paymentsRef);

        const fetchedPayouts = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            description: `${data.paymentID || 0}`,
           date: new Date(data.createdAt).toLocaleDateString('en-GB'),

            payoutAmount: `₹${data.requestMoney || 0}`,
            remainingBalance: `₹${data.remainingBalance || 0}`,
            status: data.status || 'Pending',
          };
        });

        setPayouts(fetchedPayouts);
      } catch (error) {
        console.error('Error fetching payouts:', error);
      }
    };

    fetchPayouts();
  }, []);

  const safePayouts = payouts || [];

  // Pagination logic
  const indexOfLastPayout = currentPage * payoutsPerPage;
  const indexOfFirstPayout = indexOfLastPayout - payoutsPerPage;
  const currentPayouts = safePayouts.slice(indexOfFirstPayout, indexOfLastPayout);
  const totalPages = Math.ceil(safePayouts.length / payoutsPerPage);

  const renderPayouts = () => {
    return currentPayouts.map((payout, index) => (
      <tr key={payout.id} style={{ borderBottom: '1px solid #ddd', height: '40px' }}>
        <td>{(currentPage - 1) * payoutsPerPage + index + 1}</td>
        <td>{payout.description}</td>
        <td>{payout.date}</td>
        <td>{payout.payoutAmount}</td>
        <td>{payout.remainingBalance}</td>
        <td>{payout.status}</td>
      </tr>
    ));
  };

  return (
    <div className="table-wrapper" style={{ flexDirection: isMobile ? 'column' : 'row' }}>
      <div className="table-scroll">
        <table>
          <thead>
            <tr style={{ backgroundColor: '#f1f1f1', borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>S.N.</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Payment-ID</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Payout Amount</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Remaining Balance</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
            </tr>
          </thead>
          <tbody>{renderPayouts()}</tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      </div>
      <style jsx>{`
        .table-wrapper {
          width: 100%;
          margin: 0 auto;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .table-scroll {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        table {
          width: 100%;
          min-width: 800px;
          border-collapse: collapse;
        }
        th, td {
          padding: 10px;
          text-align: left;
          font-size: 14px;
          white-space: nowrap;
        }
        tr {
          border-bottom: 1px solid #ddd;
        }
        tr:last-child {
          border-bottom: none;
        }
        .pagination {
          width: 100%;
          text-align: center;
          padding: 10px 0;
          overflow-x: auto;
          white-space: nowrap;
        }
        .pagination button {
          background-color: #e0e0e0;
          border: none;
          padding: 5px 10px;
          margin: 0 5px;
          border-radius: 5px;
          cursor: pointer;
        }
        .pagination button.active {
          background-color: #ff4081;
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default PayoutHistoryTable;

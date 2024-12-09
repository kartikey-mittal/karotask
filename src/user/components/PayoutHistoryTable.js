import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const PayoutHistoryTable = ({ payouts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const payoutsPerPage = 10;

  // Ensure payouts is defined
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
        <td>{payout.paidStatus}</td>
        <td>
          <NavLink className="action-button" to={`payout-details/${payout.id}`}> View Details</NavLink>
        </td>
      </tr>
    ));
  };

  return (
    <div className="table-container" style={{ margin: '20px', width: 'auto' }}>
      <table>
        <thead>
          <tr style={{ backgroundColor: '#f1f1f1', borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>S.N.</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Description</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Payout Amount</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Remaining Balance</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Paid Status</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
          </tr>
        </thead>
        <tbody>{renderPayouts()}</tbody>
      </table>
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
        .table-container {
          width: 100%;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          margin-top: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 10px;
          text-align: left;
          font-size: 14px;
        }
        tr {
          border-bottom: 1px solid #ddd;
        }
        tr:last-child {
          border-bottom: none;
        }
        .action-button {
          background-color: #ff4081;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
          color: #fff;
          text-decoration: none;
        }
        .pagination {
          text-align: center;
          padding: 10px 0;
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

// Sample demo data
const demoPayouts = [
  {
    id: '1',
    description: 'Payout for Project A',
    date: '2024-12-01',
    payoutAmount: '₹500',
    remainingBalance: '₹1500',
    status: 'Completed',
    paidStatus: 'Paid',
  },
  {
    id: '2',
    description: 'Payout for Project B',
    date: '2024-12-02',
    payoutAmount: '₹200',
    remainingBalance: '₹1300',
    status: 'Pending',
    paidStatus: 'Unpaid',
  },
  {
    id: '3',
    description: 'Payout for Project C',
    date: '2024-12-03',
    payoutAmount: '₹300',
    remainingBalance: '₹1000',
    status: 'Completed',
    paidStatus: 'Paid',
  },
];

// App component
const App = () => {
  return <PayoutHistoryTable payouts={demoPayouts} />;
};

export default App;

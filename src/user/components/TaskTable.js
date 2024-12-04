import React, { useState } from 'react';
import { FaBookmark, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const TaskTable = ({ tasks }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const renderTasks = () => {
    return currentTasks.map((task) => (
      <tr key={task.id} style={{ borderBottom: '1px solid #ddd', height: '40px' }}>
        <td>{task.id}</td>
        <td style={{ display: 'flex', alignItems: 'center' }}>
          <img src={task.avatar} alt="Avatar" className="avatar" />
          <span>{task.creator}</span>
        </td>
        <td>{task.name}</td>
        <td>{task.price}</td>
        <td>{task.dueDate}</td>
        <td>
          <NavLink className="action-button" to={`task-details/${task.id}`}> Start Task</NavLink>
        </td>
        <td>
          <FaBookmark className="bookmark-icon" />
        </td>
      </tr>
    ));
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr style={{ backgroundColor: '#f1f1f1', borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Task ID</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Creator</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Task Name</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Price</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Due Date</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Bookmark</th>
          </tr>
        </thead>
        <tbody>{renderTasks()}</tbody>
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
        .avatar {
          border-radius: 50%;
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }
        .action-button {
          background-color: #ff4081;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
          color: #fff;
          text-decoration: none;
          font-family:"DMM"
          
        }
        .bookmark-icon {
          color: #ff4081;
          cursor: pointer;
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

export default TaskTable;

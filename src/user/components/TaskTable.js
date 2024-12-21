import React, { useState } from "react";
import { FaBookmark, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const TaskTable = ({ tasks, onStartTask ,page}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = page ? page : 10;

  const validTasks = Array.isArray(tasks) ? tasks : [];
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = validTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(validTasks.length / tasksPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderTasks = () => {
    return currentTasks.map((task) => (
      <tr key={task.id} className="task-row">
        <td className="task-cell">
          <div className="task-info">
            <img
              src="https://backend.dotasks.in/public/uploads/profile/user.png"
              alt="Avatar"
              className="avatar"
            />
            <span>{task.creator}</span>
          </div>
        </td>
        <td className="task-cell">{task.name}</td>
        <td className="task-cell">{task.price}</td>
        <td className="task-cell">{task.dueDate}</td>
        <td className="task-cell">
          <NavLink
            className="action-button"
            onClick={() => onStartTask(task.id)}
            to={`task-details/${task.id}`}
          >
            Start Task
          </NavLink>
        </td>
        <td className="task-cell">
          <FaBookmark className="bookmark-icon" />
        </td>
      </tr>
    ));
  };

  return (
    <div className="table-container">
      <table className="task-table">
        <thead>
          <tr className="task-header">
            <th>Creator</th>
            <th>Task Name</th>
            <th>Price</th>
            <th>Due Date</th>
            <th>Action</th>
            <th>Bookmark</th>
          </tr>
        </thead>
        <tbody>{renderTasks()}</tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          <FaChevronLeft />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <FaChevronRight />
        </button>
      </div>
      <style jsx>{`
        .table-container {
          width:100%;
          overflow-x: auto;
         
          margin-top: 10px;
          padding: .5rem;
          background: #FFF;
          border-radius: 10px;
        }
        .task-table {
          width: 100%;
          border-collapse: collapse;
        }
        .task-header {
          background-color: #f9f9f9;
          border-bottom: 1.5px solid #ccc;
        }
        th,
        td {
          padding: 12px;
          text-align: left;
          font-size: 14px;
          color: #333;
        }
        .task-row {
          background-color: #fff;
           border-bottom: 1px solid #ccc;
        }
        .avatar {
          border-radius: 50%;
          width: 35px;
          height: 35px;
          margin-right: 10px;
        }
        .action-button {
          background-color: #ff4081;
          border: none;
          padding: 8px 12px;
          border-radius: 5px;
          cursor: pointer;
          color: #fff;
          text-decoration: none;
          font-family: "DMM", sans-serif;
          transition: background-color 0.3s ease;
        }
        .action-button:hover {
          background-color: #e03570;
        }
        .bookmark-icon {
          color: #ff4081;
          cursor: pointer;
          font-size: 18px;
        }
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 0;
        }
        .pagination button {
          background-color: #e0e0e0;
          border: none;
          padding: 8px 12px;
          margin: 0 5px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .pagination button.active,
        .pagination button:hover:not(:disabled) {
          background-color: #ff4081;
          color: #fff;
        }
        .pagination button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Responsive styles */
@media (max-width: 768px) {
  .table-container {
    padding: 10px;
     width:85%;/* Make container full-width on small screens */
    margin: 0 0; /* Center the container */
  }

  .task-table {
    width: 100%; /* Ensure the table spans full width */
  }

  .task-header {
    display: none; /* Hide table headers for a cleaner mobile view */
  }

  .task-row {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 0px auto; /* Center each row and provide spacing between rows */
    max-width: 100%; /* Ensure rows span full width of the container */
    background-color: #fff;
  }

  .task-cell {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    width: 100%; /* Ensure full-width alignment of cells */
    font-size: 14px; /* Slightly smaller text for mobile */
    // font-family:DMB
  }

  .task-cell span {
    font-weight: bold;
    color: #333; /* Clear text for readability */
  }

  .task-cell .action-button {
    background-color: #ff4081;
    color: white;
    padding: 6px 12px;
    border-radius: 5px;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    font-size: 14px; /* Ensure buttons are appropriately sized for mobile */
  }

  .task-cell .action-button:hover {
    background-color: #e73474; /* Darker shade on hover */
  }

  .task-cell .bookmark-icon {
    color: #ff4081;
    cursor: pointer;
    font-size: 20px; /* Slightly larger icon for better tapability */
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
  }

  .pagination button {
    background-color: #e0e0e0;
    border: none;
    padding: 8px 12px;
    margin: 0 5px;
    border-radius: 5px;
    cursor: pointer;
  }

  .pagination button.active {
    background-color: #ff4081;
    color: white;
  }
}

      `}</style>
    </div>
  );
};

export default TaskTable;

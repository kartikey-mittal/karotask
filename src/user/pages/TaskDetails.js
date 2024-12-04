// TaskDetails.js
import React, { useState } from "react";
import "./TaskDetails.css";
import {
  FaLock,
  FaQuestionCircle,
  FaSearch,
  FaSignOutAlt,
  FaTasks,
  FaUserCircle,
} from "react-icons/fa";

const TaskDetails = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  return (
    <>
      <div className="container">
        <div className="main-container">
          <div className="about-task">
            <div className="topLayer">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 20px",
                  backgroundColor: "#f5f5f5",
                  borderBottom: "2px solid #ddd",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FaTasks
                    size="1.5em"
                    style={{ marginRight: "10px", color: "#858585" }}
                  />
                  <h2
                    style={{
                      margin: "0",
                      fontFamily: "DMM",
                      fontSize: "1rem",
                      color: "#858585",
                    }}
                  >
                    Task Details
                  </h2>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="search-bar">
                    <FaSearch />
                    <input type="text" placeholder="Search" />
                  </div>
                  <div style={{ position: "relative" }}>
                    <FaUserCircle
                      size="2em"
                      color="#858585"
                      onClick={toggleDropdown}
                      style={{ cursor: "pointer" }}
                    />
                    {dropdownVisible && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          right: 0,
                          width: "200px",
                          backgroundColor: "#fff",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                          borderRadius: "5px",
                          marginTop: "10px",
                          zIndex: 1,
                        }}
                      >
                        <div
                          style={{
                            padding: "10px",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <FaUserCircle
                            style={{ marginRight: "10px", color: "#bfbfbf" }}
                          />
                          <span>My account</span>
                        </div>
                        <div
                          style={{
                            padding: "10px",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <FaLock
                            style={{ marginRight: "10px", color: "#bfbfbf" }}
                          />
                          <span>Privacy</span>
                        </div>
                        <div
                          style={{
                            padding: "10px",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <FaQuestionCircle
                            style={{ marginRight: "10px", color: "#bfbfbf" }}
                          />
                          <span>Help & Support</span>
                        </div>
                        <div
                          style={{
                            padding: "10px",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <FaSignOutAlt
                            style={{ marginRight: "10px", color: "#bfbfbf" }}
                          />
                          <span>Logout</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom">
              <div className="status-bar">
                <div className="task-title">
                  Forward/share WhatsApp channel post (WA8)
                </div>
                <div className="task-details">
                  <div className="task-item">
                    <div className="task-label">Status</div>
                    <div className="status-badge in-progress">InProgress</div>
                  </div>
                  <div className="divider"></div>
                  <div className="task-item">
                    <div className="task-label">Due Date</div>
                    <div className="task-value">2025-03-31</div>
                  </div>
                  <div className="divider"></div>
                  <div className="task-item">
                    <div className="task-label">Price</div>
                    <div className="task-value">₹3.00</div>
                  </div>
                </div>
              </div>
              <div class="task-details-bottom">
                <h2>Tasks Overview</h2>
                <h3>
                  Forward/share WhatsApp channel post (WA8) ( #TSK000267 )
                </h3>
                <p>
                  <strong>Description:</strong> Join WhatsApp channel and
                  forward posts.
                </p>
                <ol>
                  <li>
                    Join WhatsApp channel here:
                    <a
                      href="https://www.whatsapp.com/channel/0029VatZvQA29756YXJsYl30"
                      target="_blank"
                    >
                      WhatsApp Channel Link
                    </a>
                  </li>
                  <li>
                    Forward any post to your family/friend/college group. Group
                    should have a minimum of 30 members.{" "}
                    <strong>
                      DO NOT forward the same post that you have forwarded
                      before.
                    </strong>
                  </li>
                  <li>
                    Take a screenshot of your post and group name and upload the
                    screenshot after clicking on ‘Complete task’.
                  </li>
                </ol>
                <p>
                  <strong>Note:</strong> Do not delete the post from the group
                  as we can re-verify the forwarded post.
                </p>
                <div class="task-url">
                  <strong>Url:</strong> null
                  <button class="copy-btn">📋</button>
                </div>
                <button class="submit-task">Submit Task</button>
              </div>
            </div>
          </div>
          <div class="about-client">
            <h2>About Client</h2>
            <div class="client-header">
              <div class="client-image">
                <img
                  src="https://via.placeholder.com/60x60"
                  alt="Client Profile"
                  class="profile-pic"
                />
              </div>
              <h3 class="client-name">Justin Durby</h3>
              <div class="client-rating">
                <span class="star">★</span>
                <span class="star">★</span>
                <span class="star">★</span>
                <span class="star">★</span>
                <span class="star-empty">☆</span>
              </div>
              <div class="identity-status">Identity Verified</div>
            </div>
            <div class="client-stats">
              <div class="stat-item">
                <span>Total Spend</span>
                <span class="stat-value">₹142000</span>
              </div>
              <div class="divider"></div>
              <div class="stat-item">
                <span>Tasks</span>
                <span class="stat-value">14</span>
              </div>
            </div>
            <h4>Other Tasks Of This Client</h4>
            <ul class="other-tasks">
              <li class="task-item">
                <img
                  src="https://via.placeholder.com/30"
                  alt="Task Icon"
                  class="task-icon"
                />
                Post a Tweet on Twitter
                <span class="task-time">164 days ago</span>
              </li>
              <li class="task-item">
                <img
                  src="https://via.placeholder.com/30"
                  alt="Task Icon"
                  class="task-icon"
                />
                Upload Reel on Your Instagram
                <span class="task-time">148 days ago</span>
              </li>
              <li class="task-item">
                <img
                  src="https://via.placeholder.com/30"
                  alt="Task Icon"
                  class="task-icon"
                />
                [Featured] Upload Reel on Your Instagram with HashTags
                <span class="task-time">132 days ago</span>
              </li>
              <li class="task-item">
                <img
                  src="https://via.placeholder.com/30"
                  alt="Task Icon"
                  class="task-icon"
                />
                [IG reel] Upload Hindi Reel in Your Instagram Account
                <span class="task-time">132 days ago</span>
              </li>
              <li class="task-item">
                <img
                  src="https://via.placeholder.com/30"
                  alt="Task Icon"
                  class="task-icon"
                />
                [IG reel] Upload Hindi Reel in Your Instagram Account
                <span class="task-time">132 days ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetails;
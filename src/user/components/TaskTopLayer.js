import React,{useState} from "react"
import { FaTasks, FaTimes, FaUserCircle, FaTachometerAlt, FaLock, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';

const TaskTopLayer = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
  
    const toggleDropdown = () => {
      setDropdownVisible(!dropdownVisible);
    };
  
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaTasks size="1.5em" style={{ marginRight: '10px', color: '#858585' }} />
          <h2 style={{ margin: '0', fontFamily: 'DMM', fontSize: '1rem', color: '#858585' }}>Tasks</h2>
        </div>
        <div style={{ position: 'relative' }}>
          <FaUserCircle size="2em" color='#858585' onClick={toggleDropdown} style={{ cursor: 'pointer' }} />
          {dropdownVisible && (
            <div style={{ position: 'absolute', top: '100%', right: 0, width: '200px', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderRadius: '5px', marginTop: '10px', zIndex: 1 }}>
              <div style={{ padding: '10px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <FaUserCircle style={{ marginRight: '10px', color: "#bfbfbf" }} />
                <span>My account</span>
              </div>
              <div style={{ padding: '10px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <FaLock style={{ marginRight: '10px', color: "#bfbfbf" }} />
                <span>Privacy</span>
              </div>
              <div style={{ padding: '10px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <FaQuestionCircle style={{ marginRight: '10px', color: "#bfbfbf" }} />
                <span>Help & Support</span>
              </div>
              <div style={{ padding: '10px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <FaSignOutAlt style={{ marginRight: '10px', color: "#bfbfbf" }} />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

export default TaskTopLayer
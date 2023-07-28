import React from 'react';
import NavBar from '../navbar/NavBar';
import './dashboard.css';
import { UserAddOutlined, SettingOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const info = (localStorage.getItem("Admin")) ? "" : "hide";
  if (localStorage.getItem("User") != "log") {
    window.location = "/login"
  }
  return (
    <div>
      <div className="navbar">
            <NavBar />
      </div>
      <div className="dash-container">
        <div className="dash-container-2">
          <button className="dash-button" onClick={() => window.location = '/student/register'}><UserAddOutlined style={{ fontSize: '20px', marginRight: '5px' }} />Register Student</button>
          <button className="dash-button" onClick={() => window.location = '/student/mark'}>Mark Student</button>
          <button className={`dash-button ${info}`} onClick={() => window.location = '/student/view'}>View Student</button>
          <button className={`dash-button ${info}`} onClick={() => window.location = '/student/payment'}>Payments</button>
          <button className="dash-button" onClick={() => window.location = '/student/getmark'}>Attendance</button>
          <button className={`dash-button ${info}`} onClick={() => window.location = '/student/absent'}>Send Absent SMS</button>
          <button className={`dash-button ${info}`} onClick={() => window.location = '/student/sendsms'}>Send SMS</button>
          <button className={`dash-button ${info}`} onClick={() => window.location = '/users'}>View Users</button>
          <button className={`dash-button ${info}`} onClick={() => window.location = '/register'}><UserAddOutlined style={{ fontSize: '20px', marginRight: '5px' }}/>Register User</button>
          <button className="dash-button" onClick={() => window.location = '/update'}>Update Profile</button>
          <button className="dash-button" onClick={() => window.location = '/settings'}><SettingOutlined style={{ fontSize: '20px', marginRight: '5px' }}/>Settings</button> 
        </div>
      </div>
    </div>
  )
}

export default Dashboard
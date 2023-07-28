import React from 'react';
import './home.css';
import NavBar from '../navbar/NavBar';
import { UserOutlined } from '@ant-design/icons';

const Home = () => {
  return (
    <div className="container">
        <div className="navbar">
            <NavBar />
        </div>
        <div className="bg" />
        <div className="copy">
            Developed By <br/>
            J a N u d a
        </div>
        <div className="button" onClick={()=>window.location="/login"}>
            <UserOutlined style={{ fontSize: '30px' }}/>
            <p>Login</p>
        </div>
    </div>
  )
}

export default Home
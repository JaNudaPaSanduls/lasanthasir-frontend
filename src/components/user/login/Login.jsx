import React , { useState }from 'react';
import NavBar from '../../navbar/NavBar';
import { Form, message } from 'antd';
import axios from 'axios';
import './login.css';

const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onFormSubmit = async (e) => {
        messageApi.open({
            type: 'loading',
            content: 'Loading...',
            duration: 0,
        });
        const user = {
            email: email,
            password: password
        };

        await axios.post('https://lasanthasir-api.vercel.app/user/login', user)
            .then((res) => {
                messageApi.destroy();
                messageApi.open({
                    type: 'success',
                    content: 'Login Successfully',
                    duration: 1000,
                });
                console.log(res.data.admin)
                localStorage.setItem("Authorization", res.data.token);
                localStorage.setItem("Admin", res.data.user.admin);
                localStorage.setItem("User", "log");
                setTimeout(window.location = '/', 1000);
            })
            .catch((err) => {
                messageApi.destroy();
                messageApi.open({
                    type: 'error',
                    content: err.response.data
                });
                setTimeout(messageApi.destroy, 3000);
            });
    }

    return (
    <div className="login">
        {contextHolder}
        <div className="navbar">
            <NavBar />
        </div>
        <div className="login-container">
            <Form className="login-container-form" onFinish={onFormSubmit}>
                <p className="login-txt">Login</p>
                <div className="input">
                    <p className="in-txt">Email</p>
                    <input 
                    onChange={(e) => setEmail(e.target.value)}
                    required type="email" placeholder="Enter Your Email" />
                </div>
                <div className="input">
                    <p className="in-txt">Password</p>
                    <input  
                    onChange={(e) => setPassword(e.target.value)}
                    required type="password" placeholder="Enter Your Password" />
                </div>
                <button className="btn" type="submit">Login</button>
            </Form>
        </div>
        <div className="copy">
            Developed By <br/>
            J a N u d a
        </div>
    </div>
  )
}

export default Login;
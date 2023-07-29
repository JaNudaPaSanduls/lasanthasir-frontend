import React , { useState }from 'react';
import NavBar from '../../navbar/NavBar';
import { Form, message } from 'antd';
import axios from 'axios';
import './register.css';

const Register = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    const onFormSubmit = async (e) => {
        messageApi.open({
            type: 'loading',
            content: 'Loading...',
            duration: 0,
        });
        const user = {
            email: email,
            password: password,
            fname: fname,
            lname: lname
        };

        const config = {
            headers: {
                Authorization: await localStorage.getItem("Authorization")
        }};

        await axios.post('https://lasanthasir-api.vercel.app/user/create', user, config)
            .then((res) => {
                messageApi.destroy();
                messageApi.open({
                    type: 'success',
                    content: 'User Added',
                    duration: 1000,
                });
                setTimeout(messageApi.destroy, 2000);
                window.location = "/users"
            })
            .catch((err) => {
                console.log(err);
                messageApi.destroy();
                messageApi.open({
                    type: 'error',
                    content: err.response.data
                });
                setTimeout(messageApi.destroy, 3000);
            });
    }

    return (
    <div className="register">
        {contextHolder}
        <div className="navbar">
            <NavBar />
        </div>
        <div className="register-container">
            <div className="acc-type">
                Admin
            </div>
            <Form autoComplete="off" className="register-container-form" onFinish={onFormSubmit}>
                <div className="scroll">
                <p className="register-txt">Add User</p>
                <div className="input">
                    <p className="in-txt">First Name</p>
                    <input 
                    onChange={(e) => setFname(e.target.value)}
                    required type="text" placeholder="Enter First Name" />
                </div>
                <div className="input">
                    <p className="in-txt">Last Name</p>
                    <input 
                    onChange={(e) => setLname(e.target.value)}
                    required type="text" placeholder="Enter Last Name" />
                </div>
                <div className="input">
                    <p className="in-txt">Email</p>
                    <input 
                    onChange={(e) => setEmail(e.target.value)}
                    required type="email" placeholder="Enter Email" />
                </div>
                <div className="input">
                    <p className="in-txt">Password</p>
                    <input 
                    onChange={(e) => setPassword(e.target.value)}
                    required type="password" placeholder="Enter Password" />
                </div>
                <button className="btn" type="submit">Register</button>
                </div>
            </Form>
        </div>
    </div>
  )
}

export default Register;
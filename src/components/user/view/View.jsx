import React from 'react';
import axios from 'axios';
import { message, Form } from "antd";
import './view.css'
import NavBar from '../../navbar/NavBar';
import User from './User';

export default class ViewUsers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [{fname: "Fetching...", email: "Fetching...", _id: "Fetching..."}]
        };
    }

    async componentDidMount() {
        message.open({
            type: "loading",
            content: "Loading...",
            duration: 0,
            key: "abc",
          });
        if (localStorage.getItem("Authorization") === null) {
            // window.location = '/login'
        }

        const config = {
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        };

        await axios.get('https://class-management-api-9hnm.vercel.app/user/getall', config)
            .then((res) => {
                message.destroy();
                message.open({
                  type: "success",
                  content: "Users Fetched",
                  duration: 0,
                  key: "abc1",
                });
                console.log(res.data.users);
                this.setState({
                    users: res.data.users
                });
                setTimeout(message.destroy, 2000);
            })
            .catch((err) => {
                message.destroy();
                message.open({
                    type: "error",
                    content: err.response.data,
                    duration: 0,
                    key: "abc1",
                });
                setTimeout(message.destroy, 3000);
            });
    }

    render() {
        return (
            <div className="users">
                <div className="navbar">
                    <NavBar />
                </div>
                <div className="users-container">
                    <div className="acc-type">Admin</div>
                    <Form className="users-container-form" >
                        <div className="view-scroll">
                            <p className="users-txt">Users</p>
                            <ul>
                                {this.state.users.map((user) => (
                                    <User key={user._id} id={user._id} fname={user.fname} email={user.email} />
                                ))}
                            </ul>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}
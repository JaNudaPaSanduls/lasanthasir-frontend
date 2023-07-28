import React from 'react';
import axios from 'axios';
import { message } from 'antd';
import { DeleteFilled } from '@ant-design/icons'; 
import './user.css';

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.deleteUser = this.deleteUser.bind(this);
        this.state = {
            id: props.id,
            fname: props.fname,
            email: props.email,
            hide: (localStorage.getItem("email") == props.email) ? "none" : ""
        };
    }

    async deleteUser() {
        message.open({
            type: "loading",
            content: "Deleting...",
            duration: 0,
            key: "abc",
          });
        const config = {
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        };

        await axios.delete(`https://lasanthasir-api.vercel.app/user/delete/${this.state.id}`, config)
            .then((res) => {
                message.destroy();
                this.setState({
                    hide: 'none'
                });
                message.open({
                    type: "success",
                    content: "User Deleted",
                    duration: 0,
                    key: "abc1"
                });
                setTimeout(message.destroy, 2000);
            })
            .catch((err) => {
                console.log(err.response.data)
                message.destroy();
                message.open({
                    type: "error",
                    content: err.response.data,
                    duration: 0,
                    key: "abc2"
                });
                setTimeout(message.destroy, 3000);
            })
    }

    render () {
        return (
            <div className="user-card" style={{display: `${this.state.hide}`}}>
                <div className="user-name">{this.state.fname}</div>
                <div className="user-email">{this.state.email}</div>
                <DeleteFilled className="user-delete" onClick={this.deleteUser}/>
            </div>
        )
    }
}
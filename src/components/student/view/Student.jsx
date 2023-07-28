import React from 'react';
import axios from 'axios';
import { message } from 'antd';
import { EditFilled } from '@ant-design/icons'; 
import './student.css';

export default class Student extends React.Component {
    constructor(props) {
        super(props);
        this.Update = this.Update.bind(this);
        this.state = {
            id: props.id,
            classId: props.classId,
            fname: props.fname,
            phone: props.phone,
            status: (props.status != "Active") ? "Deactivated" : "",
        };
    }

    async Update() {
        await localStorage.setItem('id', this.state.id);
        window.location = '/student/update'
    }

    render () {
        return (
            <div className={`user-card ${this.state.status}`}>
                <div className="user-id">{this.state.classId}</div>
                <div className="user-name2">{this.state.fname}</div>
                <div className="user-phone">{this.state.phone}</div>
                <EditFilled className="user-update" onClick={this.Update}/>
            </div>
        )
    }
}
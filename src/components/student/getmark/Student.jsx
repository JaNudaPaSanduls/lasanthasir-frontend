import React from 'react';
import './student.css';

export default class GetMarkStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            classId: props.classId,
            fname: props.fname,
            status: (props.status == "PRESENT") ? "PRES" : (props.status == "ABSENT") ? "ABSE" : "NULL",
            newD: props.Date
        };
        console.log(props)
    }

    render () {
        return (
            <div className={`user-card`}>
                <div className="user-id">{this.state.classId}</div>
                <div className="user-name2">{this.state.fname}</div>
                <div className="user-phone">{this.state.newD}</div>
                <div className={`user-phone ${this.state.status}`}>{this.state.status}</div>
            </div>
        )
    }
}
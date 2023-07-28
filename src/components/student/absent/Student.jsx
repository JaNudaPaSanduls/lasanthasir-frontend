import React from 'react';
export default class GetMarkStudent extends React.Component {
    constructor(props) {
        super(props);
        this.Click = this.Click.bind(this);
        this.state = {
            classId: props.classId,
            fname: props.fname,
            lname: props.lname,
            id: props.id,
            status: props.status
        };
        console.log(this.state.status)
    }

    async Click() {
        await localStorage.setItem('id', this.state.id);
        window.location = '/student/update';
    }

    render () {
        return (
            <div className={`user-card ${(this.state.status == "Active") ? "" : "Deactivated"}`} onClick={this.Click}>
                <div className="user-id">{this.state.classId}</div>
                <div className="user-name2">{this.state.fname} {this.state.lname}</div>
            </div>
        )
    }
}
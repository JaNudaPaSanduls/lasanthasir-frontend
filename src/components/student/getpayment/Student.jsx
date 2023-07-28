import React from 'react';

export default class PaymentStudent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            classId: props.classId,
            fname: props.fname,
            Date: props.Date,
        };
    }

    render () {
        return (
            <div className={`user-card`}>
                <div className="user-id">{this.state.classId}</div>
                <div className="user-name2">{this.state.fname}</div>
                <div className="user-phone">{this.state.Date}</div>
            </div>
        )
    }
}
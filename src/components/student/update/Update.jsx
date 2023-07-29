import React from "react";
import axios from "axios";
import { message, Form } from "antd";
import NavBar from "../../navbar/NavBar";
import "./update.css";

export default class StudentUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this);
    this.studentDelete = this.studentDelete.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.next = this.next.bind(this);
    this.state = {
      fname: "Loading...",
      lname: "Loading...",
      classId: "Loading...",
      Class: "Loading...",
      phone: "Loading...",
      nic: "Loading...",
      grade: "Loading...",
      status: "Loading...",
      profilePic: "Loading...",
      status: "Active",
      u_fname: "",
      u_lname: "",
      u_nic: "",
      u_phone: "",
      FinalImage: "Main",
      image: [],
      b_img: ""
    };

    const token = localStorage.getItem("Authorization");
    axios.interceptors.request.use(
      (config) => {
        config.headers.authorization = `${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async componentDidMount() {
    message.open({
      type: "loading",
      content: "Loading...",
      duration: 0,
      key: "abc",
    });
    if (localStorage.getItem("Authorization") === null) {
      window.location = '/login';
    }

    const id = localStorage.getItem("id");

    await axios
      .get(`https://lasanthasir-api.vercel.app/student/get/${id}`)
      .then((res) => {
        message.destroy();
        message.open({
          type: "success",
          content: "Data Fetched",
          duration: 0,
          key: "abc1",
        });
        setTimeout(message.destroy, 2000);
        console.log(res.data.student);
        this.setState({
          classId: res.data.student.classId,
          fname: res.data.student.fname,
          lname: res.data.student.lname,
          grade: res.data.student.grade,
          email: res.data.student.email,
          nic: res.data.student.nic,
          phone: res.data.student.tel_number,
          Class: res.data.student.class,
          status: res.data.student.status,
          image: res.data.student.profilePic,
          b_img: res.data.student.profilePic
        });
      })
      .catch((err) => {
        console.log(err);
        message.destroy();
        message.open({
          type: "error",
          content: err.message,
          duration: 0,
          key: "abc1",
        });
        setTimeout(message.destroy, 3000);
      });
  }

  async onFinish() {
    message.open({
      type: "loading",
      content: "Updating...",
      duration: 0,
      key: "abc",
    });
    if (this.state .image == this.state.b_img) {
      this.next("No Img");
    } else {
      const formdata = new FormData();
    formdata.append("image", this.state.image);
    await fetch("https://api.imgbb.com/1/upload?key=3582c513a851d3ccf005f7188e08e475", {
        method: "POST",
        body: formdata
    }).then(data=>data.json()).then(data=>this.next(data.data.url)).catch(err=>console.log(err));
    }
  }

  async next(img) {
    if (img == "") {
    } else {
      const data = {
        fname: (this.state.u_fname == "") ? this.state.fname : this.state.u_fname,
        lname: (this.state.u_lname == "") ? this.state.lname : this.state.u_lname,
        nic: (this.state.u_nic == "") ? this.state.nic : this.state.u_nic,
        tel_number: (this.state.u_phone == "") ? this.state.phone : this.state.u_phone,
        profilePic: (this.state.b_img == this.state.image) ? this.state.b_img : img
      }
      if (this.state.u_fname == "") {this.setState({u_fname: this.state.fname})}
      if (this.state.u_lname == "") {this.setState({u_lname: this.state.lname})}
      if (this.state.u_phone == "") {this.setState({u_phone: this.state.phone})}
      if (this.state.u_nic == "") {this.setState({u_nic: this.state.nic})}
      const id = localStorage.getItem("id");
      await axios
        .patch(`https://lasanthasir-api.vercel.app/student/update/${id}`, data)
        .then((res) => {
          message.destroy();
          message.open({
            type: "success",
            content: "Updated",
            duration: 0,
            key: "abc1",
          });
          setTimeout(message.destroy, 2000);
          this.setState({
            fname: this.state.u_fname,
            lname: this.state.lname,
            nic: this.state.nic,
            tel_number: this.state.tel_number
          })
        })
        .catch((err) => {
          console.log(err);
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
  }

  async studentDelete() {
    message.open({
      type: "loading",
      content: "Deleting...",
      duration: 0,
      key: "abc",
    });
    const id = localStorage.getItem("id");
    await axios
      .delete(`https://lasanthasir-api.vercel.app/student/delete/${id}`)
      .then((res) => {
        message.destroy();
        message.open({
          type: "success",
          content: "Deleted",
          duration: 0,
          key: "abc1",
        });
        setTimeout(message.destroy, 2000);
        window.location = '/student/view'
      })
      .catch((err) => {
        console.log(err);
        message.destroy();
        message.open({
          type: "error",
          content: err.message,
          duration: 0,
          key: "abc1",
        });
        setTimeout(message.destroy, 3000);
      });
  }

  async changeStatus() {
    message.open({
      type: "loading",
      content: (this.state.status == "Active") ? "Deactivating..." : "Activating...",
      duration: 0,
      key: "abc"
    });
    const id = localStorage.getItem('id');
    await axios
      .patch(`https://lasanthasir-api.vercel.app/student/changestatus/${id}`)
      .then((res) => {
        message.destroy();
        message.open({
          type: 'success',
          content: `Student was ${res.data.message}`,
          duration: 0,
          key: "abc1"
        });
        setTimeout(message.destroy, 2000);
        this.setState({
          status: (res.data.message == "Active") ? "Active" : ""
        })
      })
      .catch((err) => {
        message.destroy();
        message.open({
          type: 'error',
          content: err.message,
          duration: 0,
          key: 'abc1'
        });
        setTimeout(message.destroy, 3000);
      })
  }

  render() {
    return (
      <div className="update">
        <div className="navbar">
          <NavBar />
        </div>
        <div className="update-container">
          <div className="acc-type">Admin</div>
          <Form className="update-container-form" onFinish={this.onFinish}>
            <div className="scroll">
              <p className="update-txt">Update</p>
              <div className="input">
                <p className="in-txt">Class ID</p>
                <input disabled value={this.state.classId} />
              </div>
              <div className="input">
                <p className="in-txt">First Name</p>
                <input
                  type="text"
                  placeholder={this.state.fname}
                  onChange={(e) => this.setState({ u_fname: e.target.value })}
                />
              </div>
              <div className="input">
                <p className="in-txt">Last Name</p>
                <input
                  type="text"
                  placeholder={this.state.lname}
                  onChange={(e) => this.setState({ u_lname: e.target.value })}
                />
              </div>
              <div className="input">
                    <p className="in-txt">Profile Pic</p>
                    <input 
                    onChange={(e) => this.setState({ image: e.target.files[0] })}
                    type="file" placeholder="Select Profile Picture" />
              </div>
              <div className="input">
                <p className="in-txt">Phone Number</p>
                <input
                  minLength="10"
                  maxLength="10"
                  type="text"
                  onChange={(e) => this.setState({ u_phone: e.target.value })}
                  placeholder={this.state.phone}
                />
              </div>
              <div className="input">
                <p className="in-txt">NIC</p>
                <input
                  type="text"
                  minLength="9"
                  maxLength="12"
                  onChange={(e) => this.setState({ u_nic: e.target.value })}
                  placeholder={this.state.nic}
                />
              </div>
              <div className="input">
                <p className="in-txt">Grade</p>
                <input disabled type="number" value={this.state.grade} />
              </div>
              <div className="select">
                <p className="in-txt">Class</p>
                <select disabled>
                  <option value={this.state.Class} disabled selected hidden>
                    {this.state.Class}
                  </option>
                </select>
              </div>
              <button className="btn" style={{backgroundColor: "rgb(8, 126, 106)"}} type="submit">
                Update
              </button>
              <button className="btn3" type="button" onClick={this.studentDelete}>
                Delete
              </button>
              <button className={`btn4 ${this.state.status}`} onClick={this.changeStatus} type="button">
                {(this.state.status == "Active") ? "Deactivate" : "Activate"}
              </button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

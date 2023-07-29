import React from "react";
import axios from "axios";
import { message, Form } from "antd";
import NavBar from "../../navbar/NavBar";
import "./update.css";

export default class Update extends React.Component {
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.state = {
      fname: "Loading...",
      lname: "Loading...",
      email: "Loading...",
      password: "",
      admin: "Loading...",
    };
    const token = localStorage.getItem("Authorization");
    axios.interceptors.request.use(
      config=> {
          config.headers.authorization = `${token}`;
          return config;
      },
      error => {
          return Promise.reject(error)
      }
  )
  }

  async componentDidMount() {
    message.open({
      type: "loading",
      content: "Loading...",
      duration: 0,
      key: "abc",
    });
    if (localStorage.getItem("Authorization") === null) {
      // window.location = '/login';
    }

    await axios
      .get("https://lasanthasir-api.vercel.app/user/get")
      .then((res) => {
        message.destroy();
        message.open({
          type: "success",
          content: "Data Fetched",
          duration: 0,
          key: "abc1",
        });
        this.setState({
          fname: res.data.user.fname,
          lname: res.data.user.lname,
          email: res.data.user.email,
        });
        if (res.data.user.admin) {
          this.setState({
            admin: "Admin",
          });
        } else {
          this.setState({
            admin: "User",
          });
        }
        setTimeout(message.destroy, 2000);
      })
      .catch((err) => {
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

  async deleteUser() {
    message.open({
      type: "loading",
      content: "Deleting...",
      duration: 0,
      key: "abc",
    });

    await axios
      .delete(`https://lasanthasir-api.vercel.app/user/delete`)
      .then((res) => {
        message.destroy();
        this.setState({
          hide: "none",
        });
        localStorage.removeItem("Authorization");
        localStorage.removeItem("Admin");
        localStorage.removeItem("User");
        localStorage.removeItem("email");
        message.open({
          type: "success",
          content: "User Deleted",
          duration: 0,
          key: "abc1",
        });
        setTimeout(message.destroy, 2000);

        window.location = "/";
      })
      .catch((err) => {
        console.log(err.response.data);
        message.destroy();
        message.open({
          type: "error",
          content: err.response.data,
          duration: 0,
          key: "abc2",
        });
        setTimeout(message.destroy, 3000);
      });
  }

  async updateUser() {
    message.open({
      type: "loading",
      content: "Updating...",
      duration: 0,
      key: "abc1"
    });
    const data = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password
    };

    await axios
      .patch(`https://lasanthasir-api.vercel.app/user/update`, data)
      .then((res) => {
        console.log(res)
        message.destroy();
        message.open({
          type: "success",
          content: "User Updated",
          duration: 0,
          key: "abc1",
        });
        setTimeout(message.destroy, 2000);
      })
      .catch((err) => {
        message.destroy();
        message.open({
          type: "error",
          content: err.response.data,
          duration: 0,
          key: "abc2",
        });
        setTimeout(message.destroy, 3000);
      });
  }

  render() {
    return (
      <div className="update">
        <div className="navbar">
          <NavBar />
        </div>
        <div className="update-container">
          <div className="acc-type">{this.state.admin}</div>
          <Form className="update-container-form" onFinish={this.updateUser}>
            <div className="scroll">
              <p className="update-txt">Update</p>
              <div className="input">
                <p className="in-txt">First Name</p>
                <input
                  type="text"
                  placeholder={this.state.fname}
                  onChange={(e) => this.setState({ fname: e.target.value })}
                />
              </div>
              <div className="input">
                <p className="in-txt">Last Name</p>
                <input
                  type="text"
                  placeholder={this.state.lname}
                  onChange={(e) => this.setState({ lname: e.target.value })}
                />
              </div>
              <div className="input">
                <p className="in-txt">Email</p>
                <input
                  type="email"
                  placeholder={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </div>
              <div className="input">
                <p className="in-txt">Password</p>
                <input
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
              <button className="btn2" type="button" onClick={this.deleteUser}>
                Delete
              </button>
              <button className="btn" type="submit">
                Update
              </button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

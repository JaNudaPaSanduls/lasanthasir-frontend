import React, { useState } from 'react';
import NavBar from '../navbar/NavBar';
import axios from 'axios';
import { message, Popconfirm } from 'antd';

const Settings = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState();
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
  const Logout = async() => {
    messageApi.open({
      type: "loading",
      content: "Loading...",
      duration: 0,
      key: "abc1"
    });
    await axios
        .post("https://lasanthasir-api.vercel.app/student/get")
        .then((res) => {
          messageApi.destroy();
          messageApi.open({
            type: "success",
            content: "Logout Successfully",
            duration: 0,
            key: "abc1"
          });
          setTimeout(messageApi.destroy, 3000);
          localStorage.removeItem("Authorization");
          localStorage.removeItem("id");
          localStorage.removeItem("User");
          localStorage.removeItem("Admin");
          setTimeout(window.location = '/', 3000);
        })
        .catch((err) => {
          console.log(err.message);
          messageApi.destroy();
          messageApi.open({
            type: "error",
            content: err.response.data,
            duration: 0,
            key: "abc1"
          });
          setTimeout(messageApi.destroy, 3000);
        });
  }

  const upgrade = async() => {
    messageApi.open({
      type: "loading",
      content: "Loading...",
      duration: 0,
      key: "abc1"
    });
    await axios
        .patch("https://lasanthasir-api.vercel.app/student/upgrade")
        .then((res) => {
          messageApi.destroy();
          messageApi.open({
            type: "success",
            content: "Students Are Upgraded",
            duration: 0,
            key: "abc1"
          });
          setOpen(false);
          setTimeout(messageApi.destroy, 3000);
        })
        .catch((err) => {
          console.log(err.message);
          messageApi.destroy();
          messageApi.open({
            type: "error",
            content: err.response.data,
            duration: 0,
            key: "abc1"
          });
          setTimeout(messageApi.destroy, 3000);
        });
  }

  const onConfirm = async() => {
    await upgrade();
  }

  const Click = async() => {
    setOpen(true);
  }

  return (
    <div className="container">
      {contextHolder}
        <div className="navbar">
            <NavBar />
        </div>
        <div className="bg" />
        <p className="button" style={{ backdropFilter: "none", background: "none", border: "0px", marginTop: "-100px", fontFamily: "poppins", fontSize: "35px" }}>Settings</p>
        <div className="copy">
            Developed By <br/>
            J a N u d a
        </div>
        <Popconfirm
              title="Upgrade"
              description="Are you want upgrade"
              okText="Yes"
              onCancel={() => setOpen(false)}
              onConfirm={onConfirm}
              open={open}
              cancelText="No"
              >
        <button className={`${(localStorage.getItem("Admin")) ? "" : "hide"} button`} style={{ backgroundColor: "#800000", marginTop: "-20px"}} onClick={() => Click()}>Upgrade Students</button>
        </Popconfirm>
        <button className='button' style={{ backgroundColor: "rgba(0, 10, 0, 0.5)", marginTop: "50px", padding: "10px" }}
        onClick={() => Logout()}>Logout</button>
    </div>
  )
}

export default Settings;
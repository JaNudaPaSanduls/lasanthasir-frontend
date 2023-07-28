import React, { useState } from 'react';
import axios from "axios";
import { message, Form, Popconfirm } from "antd";
import NavBar from '../../navbar/NavBar';
import "./mark.css";
import logo from '../../../images/bg.jpg';

const StudentMark = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [fname, setFname] = useState("Not Fetched");
  const [lname, setLname] = useState("");
  const [Class, setClass] = useState("Not Fetched");
  const [grade, setGrade] = useState("Not Fetched");
  const [checked, setChecked] = useState(false);
  const [id, setId] = useState("");
  const [classId, setClassId] = useState("");
  const [g_Class, setG_Class] = useState("Disaapa");
  const [open, setOpen] = useState(false);

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

  const onFormSubmit = async () => {
    if ((classId != "" && grade != "") && checked) {
      setOpen(true);

    } else {
      if (!checked) {
        message.open({
          type: 'warning',
          content: 'Please check student before mark',
          duration: 0,
          key: 'new'
        });
        setTimeout(message.destroy, 3000);
      }
    }
  }

  const markAttendance = async(paid) => {
    message.open({
      type: 'loading',
      content: 'Marking...',
      duration: 0,
      key: 'abc0'
    });
    const date = new Date();
    const g_date = await `${date.getFullYear()}-${(date.getMonth()<=8) ? "0" : ""}${date.getMonth()+1}-${(date.getDate()<=9) ? "0" : ""}${date.getDate()}`;
    const data = {
      paid: paid,
      date: g_date
    }
    console.log(data)
    await axios
        .patch(`https://lasanthasir-api.vercel.app/student/mark/${id}`, data)
        .then((res) => {
          message.destroy();
          message.open({
            type: 'success',
            content: 'Marked',
            duration: 0,
            key: 'abc3'
          });
          setTimeout(message.destroy, 2000);
          setFname("Not Fetched");
          setLname("");
          setClass("Not Fetched");
          setChecked(false);
          const phone = res.data.phone;
          // eslint-disable-next-line no-undef
          JavaScriptInterface.SendSMS(phone, paid ? "true" : "false", "");
        })
        .catch((err) => {
          message.destroy();
          console.log(err)
          message.open({
            type: 'error',
            content: err.response.data,
            duration: 0,
            key: 'abc3'
          });
          setChecked(false);
          setTimeout(message.destroy, 3000);
        })
  }

  const onConfirm = () => {
    setOpen(false);
    markAttendance(true);
  }

  const onCancel = () => {
    setOpen(false);
    markAttendance(false);
  }

  const handleOpenChange = (newOpen) => {
    if (!newOpen) {
      setOpen(newOpen);
      return;
    }
  }

  
  const checkStudent = async() => {
    message.open({
      type: 'loading',
      content: "Checking...",
      duration: 0,
      key: "abc"
    });
    const data = {
      grade: grade,
      Class: g_Class,
      ClassId: classId
    }
    await axios
    .post('https://lasanthasir-api.vercel.app/student/get', data)
    .then((res) => {
      console.log(res)
      console.log(data)
      message.destroy();
      if (res.data.student.length == 0) {
        message.open({
          type: 'error',
          content: "Student not found",
          duration: 0,
          key: "abc1"
        });
        setTimeout(message.destroy, 3000);
      } else {
        message.open({
        type: 'success',
        content: "Checked",
        duration: 0,
        key: "abc1"
        });
        setFname(res.data.student[0].fname);
        setLname(res.data.student[0].lname);
        setClass(res.data.student[0].class);
        setId(res.data.student[0]._id);
        setChecked(true);
        setTimeout(message.destroy, 2000);
      }
    })
    .catch((err) => {
      message.destroy();
      message.open({
        type: 'error',
        content: err.response.data,
        duration: 0,
        key: "abc1"
      });
      setTimeout(message.destroy, 2000);
    })
  }

  return (
    <div className="update">
        {contextHolder}
        <div className="navbar">
          <NavBar />
        </div>
        <div className="update-container">
          <Form className="update-container-form" onFinish={onFormSubmit}>
            <div className="scroll">
              <p className="register-txt">Mark Student</p>
              <div className="student-card">
                <img src={logo} />
                <div className="student-card-de">
                  <div>Name : {fname} {lname}</div>
                  <div className="card-top">Class : {Class}</div>
                  <div className="card-top">Grade : {grade}</div>
                </div>
              </div>
              <div className="input">
                <p className="in-txt">Class Id</p>
                <input
                  required
                  type="number"
                  onChange={(e) => setClassId(e.target.value)}
                  placeholder="Enter Class Id"
                />
              </div>
              <div className="input">
                <p className="in-txt">Grade</p>
                <input
                  required
                  type="number"
                  min="6"
                  max="11"
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="Enter Grade"
                />
              </div>
              <div className="select">
                  <p className="in-txt">Class</p>
                  <select onChange={(e) => setG_Class(e.target.value)}>
                    <option className="op" value="Disaapa">Disaapa</option>
                    <option className="op" value="HighStudy">HighStudy</option>
                  </select>
              </div>
              <button className="btn6" style={{ marginTop: "25px", maxWidth: "250px", marginLeft: "-120px", backgroundColor: "rgba(230, 103, 29, 0.692)" }}
               type="button" onClick={checkStudent}>
                Check Student
              </button>
              <Popconfirm
              title="Payment Information"
              description="Is student pay the class fees?"
              okText="Yes"
              onCancel={onCancel}
              onConfirm={onConfirm}
              open={open}
              handleOpenChange={handleOpenChange}
              cancelText="No"
              >
              <button style={{ marginTop: "85px" }} className="btn6" type="submit">
                Mark Present
              </button></Popconfirm>
            </div>
          </Form>
        </div>
      </div>
  )
}

export default StudentMark;
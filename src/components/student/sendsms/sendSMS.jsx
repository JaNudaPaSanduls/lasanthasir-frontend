/* eslint-disable no-undef */
import React, { useState } from "react";
import NavBar from "../../navbar/NavBar";
import { Form, message } from "antd";
import axios from "axios";

const SendSMS = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [grade, setGrade] = useState("");
  const [Class, setClass] = useState("Disaapa");
  const [Message, setMessage] = useState("");
  let numbers = [];

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

  const setNums = async(students) => {
    function setNum() {
      for(let i = 0;i<students.length;i++) {
        numbers.push(students[i].tel_number);
      }
    }
    await setNum();
    JavaScriptInterface.sendSMS(numbers, false, Message);
  }

  const onFormSubmit = async (e) => {
    messageApi.open({
      type: "loading",
      content: "Requesting...",
      duration: 0,
      key: "abc"
    });

    if (Class == "" || grade == "") {
      messageApi.destroy();
      messageApi.open({
        type: "error",
        content: "Fill data again",
        duration: 0,
        key: "abc"
      });
      setTimeout(messageApi.destroy, 3000);
    } else {
      const data = {
        Class: Class,
        grade: grade
      }
  
      await axios
        .post("https://lasanthasir-api.vercel.app/student/get", data)
        .then((res) => {
          messageApi.destroy();
          if (res.data.student.length == 0) {
            messageApi.open({
              type: "error",
              content: "Students Not Found",
              duration: 0,
              key: "abc1"
            });
          } else {
            setNums(res.data.student);
            messageApi.open({
              type: "success",
              content: "Students Fetched",
              duration: 0,
              key: "abc1"
            });
            setTimeout(messageApi.destroy, 3000);
            messageApi.open({
              type: "loading",
              content: "Sending Message....",
              duration: 0,
              key: "abc2"
            });
            setTimeout(messageApi.destroy, 5000);
          }

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
  };

  return (
    <div className="users">
      {contextHolder}
      <div className="navbar">
        <NavBar />
      </div>
      <div className="users-container">
        <Form className="users-container-form" onFinish={onFormSubmit}>
          <div className={`scroll`}>
            <p className="users-txt" style={{marginLeft: "-80px"}}>Send SMS</p>
            <div className="input">
              <p className="in-txt">Grade</p>
              <input type="number" min="6" max="11"
              onChange={(e) => setGrade(e.target.value)}
              required placeholder="Enter Grade" />
            </div>
            <div className="select">
              <p className="in-txt">Class</p>
              <select required onChange={(e) => setClass(e.target.value)}>
                <option value="Disaapa">Disaapa</option>
                <option value="HighStudy">HighStudy</option>
              </select>
            </div>
            <div className="input">
              <p className="in-txt">Message</p>
              <input type="text" onChange={(e) => setMessage(e.target.value)}
              required placeholder="Enter Your Message" />
            </div>
            <button className="btn" type="submit">
              Send
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SendSMS;
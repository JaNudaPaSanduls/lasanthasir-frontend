import React, { useState } from "react";
import NavBar from "../../navbar/NavBar";
import { Form, message } from "antd";
import axios from "axios";
import Student from "./Student";
import "./view.css";

const StudentView = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [classId, setClassId] = useState("");
  const [grade, setGrade] = useState("");
  const [Class, setClass] = useState("Disaapa");
  const [hide, setHide] = useState("hide");
  const [students, setStudents] = useState([{}]);
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

  const onFormSubmit = async (e) => {
    messageApi.open({
      type: "loading",
      content: "Loading...",
      duration: 0,
    });
    const data = {
      ClassId: classId,
      grade: grade,
      Class: Class
    };
    await axios
      .post("https://lasanthasir-api.vercel.app/student/get", data)
      .then((res) => {
        messageApi.destroy();
        if (res.data.student.length == 0) {
          messageApi.open({
            type: "error",
            content: "No Students",
          });
        } else {
          console.log(res.data.student)
          messageApi.open({
            type: "success",
            content: "Students Fetched",
          });
        }
        setStudents(res.data.student);
        setTimeout(message.destroy, 2000);
        setHide("");
      })
      .catch((err) => {
        console.log(err.message);
        messageApi.destroy();
        messageApi.open({
          type: "error",
          content: err.response.data,
        });
        setTimeout(messageApi.destroy, 3000);
      });
  };

  return (
    <div className="users">
      {contextHolder}
      <div className="navbar">
        <NavBar />
      </div>
      <div className="users-container">
        <div className="acc-type">Admin</div>
        <Form className="users-container-form" onFinish={onFormSubmit}>
          <div className={`scroll ${hide == "hide" ? "" : "hide"}`}>
            <p className="users-txt">Students</p>
            <div className="input">
              <p className="in-txt">Class Id</p>
              <input
                type="number"
                placeholder="Enter Class Id"
                onChange={(e) => setClassId(e.target.value)}
              />
            </div>
            <div className="input">
              <p className="in-txt">Grade</p>
              <input
                required
                type="number"
                min="6"
                max="11"
                placeholder="Enter Grade"
                onChange={(e) => setGrade(e.target.value)}
              />
            </div>
            <div className="select">
              <p className="in-txt">Class</p>
              <select required onChange={(e) => setClass(e.target.value)}>
                <option className="op" value="Disaapa">
                  Disaapa
                </option>
                <option className="op" value="HighStudy">
                  HighStudy
                </option>
              </select>
            </div>
            <button id="btn1" className="btn" type="submit">
              Get
            </button>
          </div>
          <div className={`view-scroll ${hide}`}>
            <p className="users-txt">Students</p>
            <p className="in-txt">Students : {students.length}</p>
            <ul>
              {students.map((student) => (
                <Student
                key={student._id}
                id={student._id}
                status={student.status}
                classId={student.classId}
                fname={student.fname}
                phone={student.tel_number}
              />
              ))}
            </ul>
            <div className="comp">
              <button
                className="btn5 up-btn"
                type="button"
                onClick={() => setHide("hide")}
              >
                Back
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default StudentView;

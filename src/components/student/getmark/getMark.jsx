import React, { useState } from "react";
import NavBar from "../../navbar/NavBar";
import { Form, message } from "antd";
import axios from "axios";
import GetMarkStudent from "./Student";

const GetMark = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [classId, setClassId] = useState("");
  const [grade, setGrade] = useState("");
  const [Class, setClass] = useState("Disaapa");
  const [GDate, setDate] = useState("");
  const [hide, setHide] = useState("hide");
  const [type, setType] = useState("PRESENT");
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
      key: "abc",
    });
    const data = {
      ClassId: classId,
      Class: Class,
      Date: GDate,
      grade: grade,
      type: type,
    };
    console.log(data);
    await axios
      .post("https://lasanthasir-api.vercel.app/student/get/attendance", data)
      .then((res) => {
        if (res.data.attendance.length == 0) {
          messageApi.destroy();
          messageApi.open({
            type: "error",
            content: "Students not found",
            duration: 0,
            key: "abc1",
          });
          setTimeout(messageApi.destroy, 3000);
        } else {
          setStudents(res.data.attendance);
          messageApi.destroy();
          messageApi.open({
            type: "success",
            content: "Data Fetched",
            duration: 0,
            key: "abc1",
          });
          console.log(students);
          setTimeout(messageApi.destroy, 2000);
          setHide("");
        }
      })
      .catch((err) => {
        console.log(err.message);
        messageApi.destroy();
        messageApi.open({
          type: "error",
          content: err.response.data,
          duration: 0,
          key: "abc1",
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
        <Form className="users-container-form" onFinish={onFormSubmit}>
          <div className={`scroll ${hide == "hide" ? "" : "hide"}`}>
            <p className="users-txt" style={{ marginLeft: "-80px" }}>
              Attendance
            </p>
            <div className="input">
              <p className="in-txt">Class Id</p>
              <input
                type="number"
                min="0"
                onChange={(e) => setClassId(e.target.value)}
                placeholder="Enter Class Id"
              />
            </div>
            <div className="input"> 
              <p className="in-txt">Date</p>
              <input
                type="date"
                placeholder="Enter Date"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="input">
              <p className="in-txt">Grade</p>
              <input
                type="number"
                min="6"
                max="11"
                onChange={(e) => setGrade(e.target.value)}
                required
                placeholder="Enter Grade"
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
            <div className="select">
              <p className="in-txt">Type</p>
              <select required onChange={(e) => setType(e.target.value)}>
                <option className="op" value="PRESENT">
                  Present
                </option>
                <option className="op" value="ABSENT">
                  Absent
                </option>
                <option className="op" value="ALL">
                  ALL
                </option>
              </select>
            </div>
            <button className="btn" type="submit">
              Check
            </button>
          </div>
          <div className={`view-scroll ${hide}`}>
            <p className="users-txt" style={{ marginLeft: "-80px" }}>
              Attendance
            </p>
            <p className="in-txt">Students : {students.length}</p>
            <ul>
              {students.map((student) => (
                <GetMarkStudent
                  key={student._id}
                  id={student._id}
                  classId={student.classId}
                  status={student.attendance}
                  fname={student.fname}
                  Date={student.date}
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

export default GetMark;

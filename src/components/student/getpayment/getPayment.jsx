import React, { useState } from "react";
import NavBar from "../../navbar/NavBar";
import { Form, message } from "antd";
import axios from "axios";
import PaymentStudent from "./Student";
import "./payment.css";

const GetPayment = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [classId, setClassId] = useState("");
  const [grade, setGrade] = useState("");
  const [Class, setClass] = useState("Disaapa");
  const [GDate, setDate] = useState("");
  const [hide, setHide] = useState("hide");
  const [students, setStudents] = useState([{ _id: "3294", classId: 12, fname: "M.K.Januda", phone: "2023-10-05" }])

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
      grade: grade,
      Class: Class,
      ClassId: classId,
      Date: GDate
    }
    await axios
      .post("https://lasanthasir-api.vercel.app/student/get/payment", data)
      .then((res) => {
        messageApi.destroy();
        if (res.data.payments.length == 0) {
          messageApi.open({
            type: "error",
            content: "Payments are not found",
            duration: 0,
            key: "abc1"
          });
          setTimeout(messageApi.destroy, 3000);
        } else {
          messageApi.open({
            type: "success",
            content: "Payments Fetched",
            duration: 0,
            key: "abc1"
          });
          setStudents(res.data.payments);
          setHide("");
          setTimeout(messageApi.destroy, 2000);
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
          <div className={`scroll ${(hide == "hide") ? "" : "hide"}`}>
            <p className="users-txt">Payments</p>
            <div className="input">
              <p className="in-txt">Class Id</p>
              <input type="number" onChange={(e) => setClassId(e.target.value)}
              placeholder="Enter Class Id" />
            </div>
            <div className="input">
              <p className="in-txt">Date</p>
              <input type="date" onChange={(e) => setDate(e.target.value)}
              placeholder="Enter Date" />
            </div>
            <div className="input">
              <p className="in-txt">Grade</p>
              <input type="number" min="6" max="11" onChange={(e) => setGrade(e.target.value)}
              required placeholder="Enter Grade" />
            </div>
            <div className="select">
              <p className="in-txt">Class</p>
              <select required onChange={(e) => setClass(e.target.value)}>
                <option value="Disaapa">Disaapa</option>
                <option value="HighStudy">HighStudy</option>
              </select>
            </div>
            <button className="btn" type="submit">
              Get
            </button>
          </div>
          <div className={`view-scroll ${hide}`}>
            <p className="users-txt">Payments</p>
            <p className="in-txt">Students : {students.length}</p>
            <ul>
              {students.map((student) => (
                <PaymentStudent
                  key={student._id}
                  id={student._id}
                  classId={student.classId}
                  fname={student.fname}
                  Date={student.date}
                />
              ))}
            </ul>
            <div className="comp">
              <button className="btn5 up-btn" type="button" onClick={() => setHide("hide")}>
                Back
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default GetPayment;

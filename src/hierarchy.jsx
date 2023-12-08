import React, { useState } from "react";

import "./hierarchy.css";
import metlonelogo from "./assets/metlonelogo.png";
import Dashboard from "./dashboard";
import CreateUser from "./createUser";
import ListUser from "./listUser";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Tree() {
  const [show, setShow] = useState("dashboard");

  const navigate = useNavigate();
  const userCookie = JSON.parse(Cookies.get("user"));
  console.log(userCookie);

  const logoutHandler= ()=>{
    Cookies.remove('user');
    navigate('/')
  }
  return (
    <div className="main">
      <div className="headerLayout">
        <div className="Logo"><img src={metlonelogo} alt="logo" /></div>
        <div className="header-details">
          <span className="headerspan">Name : {userCookie.firstname+""+userCookie.lastname}</span>
          <span className="headerspan">Company : {userCookie.company}</span>
          <button className="logout-button" onClick={logoutHandler}>Logout</button>
        </div>
      </div>
      <div className="content">
        <div className="left-layout h-screen p-5" >
          <button
            className="Dash-board-button"
            onClick={() => setShow("dashboard")}
          >
            Dashboard
          </button>
          <button
            className="Create-user-button"
            onClick={() => setShow("listUser")}
          >
            User
          </button>
        </div>
        <div className="right-layout">
          {show == "dashboard" ? (
            <div className="level-0">
              <Dashboard />
            </div>
          ) : show == "listUser" ? (
            <ListUser show={setShow} />
          ) : (
            <CreateUser show={setShow} />
          )}
        </div>
      </div>
    </div>
  );
}

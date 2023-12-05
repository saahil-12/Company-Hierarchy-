import React, { useState } from "react";
import "./hierarchy.css";
import metlonelogo from "./assets/metlonelogo.png";
import Dashboard from "./dashboard";
import CreateUser from "./createUser";
import ListUser from "./listUser";

export default function Tree() {
  const [show, setShow] = useState("dashboard");

  // const navigate = useNavigate();

  return (
    <div className="main">
      <div className="headerLayout">
        <img src={metlonelogo} alt="logo" />
      </div>
      <div className="content">
        <div className="left-layout">
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

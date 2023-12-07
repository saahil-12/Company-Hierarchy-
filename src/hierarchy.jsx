import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";


import "./hierarchy.css";
// import metlonelogo from "./assets/metlonelogo.png";
import Dashboard from "./dashboard";
import CreateUser from "./createUser";
import ListUser from "./listUser";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Tree() {
  const[open,setOpen] =useState(true)
  const [show, setShow] = useState("dashboard");

  const navigate = useNavigate();
  const userCookie = JSON.parse(Cookies.get("user"));
  console.log(userCookie);

  const logoutHandler= ()=>{
    Cookies.remove('user');
    navigate('/')
  }
  return (
    <div className="main ">
      <div className="headerLayout ">
        <div className="Logo">COMPANY HIERARCHY</div>
        <div className="header-details">
          <span className="headerspan">Name : {userCookie.firstname+""+userCookie.lastname}</span>
          <span className="headerspan">Company : {userCookie.company}</span>
          <button className="logout-button" onClick={logoutHandler}>Logout</button>
        </div>
      </div>
      <div className="content flex ">
        <div className={`bg-dark-purple pt-8 ${open?"w-72":"w-20"} 
        relative duration-100`} >
        <BsArrowLeftShort  className={`bg-white
         text-dark-purple text-3xl rounded-full
          absolute -right-3 top-7 border border-dark-purple 
          cursor-pointer ${!open && "rotate-180"}`} 
          onClick={()=>setOpen(!open)} />
          
          {open?(
            <button
              className={`Dash-board-button ${!open &&"scale-0"}`}
              onClick={() => setShow("dashboard")}> Dashboard
              </button>
          ):(
            <MdDashboard className="bg-aliceblue text-4xl
             rounded cursor-pointer block float-left m-5"
             onClick={()=>setOpen(!open)}
            />
          )}
          {open?(
            <button
            className={`Create-user-button ${!open && "scale-0"}`}
            onClick={() => setShow("listUser")}>User
          </button>
          ):(
            <FaUserPlus className="bg-aliceblue text-4xl
             rounded cursor-pointer block float-left m-5 mt-5"
             onClick={()=>setOpen(!open)} />
          )}
          
          
          
        </div>
        <div className="right-layout relative">
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

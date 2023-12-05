import React, { useState, useEffect } from "react";
import "./signup.css";
import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

export default function CreateUser({ show }) {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    id: 0,
    role: "",
    branch: "",
    status: false,
    children: [],
  });

  useEffect(() => {
    let storedData = localStorage.getItem("formData");
    storedData = storedData ? JSON.parse(storedData) : [];
    const userCookie = Cookies.get("user");
    let formatted = JSON.parse(userCookie);
    const userId = formatted ? formatted.id : 0;

    function getAllBranches(data) {
      let branches = [];

      function traverse(node) {
        if (node.role) {
          branches.push(node.role);
        }

        if (node.children && node.children.length > 0) {
          node.children.forEach(traverse);
        }
      }

      if (data) {
        data.forEach(traverse);
      }

      return branches;
    }

    let temp = storedData.filter((item) => {
      return item.id == userId;
    });

    if (temp.length > 0) {
      const allBranches = getAllBranches(temp[0].children);
      setSelectedBranches(allBranches);
    }
  }, []);


  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userData.name?.length) {
      newErrors.name = "Please enter your name";
    }
    if (!userData.branch) {
      newErrors.branch = "Please select a branch";
    }
    if (!userData.role) {
      newErrors.role = "Please select a role";
    }
    if (!userData.password?.length) {
      newErrors.password = "Please enter a password";
    }
    if (
      !userData.confirmPassword?.length ||
      userData.confirmPassword !== userData.password
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const userCookie = Cookies.get("user");
    let formatted = JSON.parse(userCookie);
    const userId = formatted ? formatted.id : 0;
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      let storedData = localStorage.getItem("formData");
      storedData = storedData ? JSON.parse(storedData) : [];
      const userCookie = Cookies.get("user");
      let formatted = JSON.parse(userCookie);
      const userId = formatted ? formatted.id : 0;
      
      function addChildByBranch(data, newChild) {
        function traverse(node) {
          if (node.role.toLowerCase() == newChild.branch.toLowerCase()) {
            node.children.push(newChild);
            return true;
          }
          if (node.children && node.children.length > 0) {
            for (const child of node.children) {
              if (traverse(child)) {
                return true;
              }
            }
          }
          return false;
        }
        data.forEach(traverse);
        return data;
      }
      let index = null;
      let temp = storedData.filter((item,idx) => {
         if(item.id == userId){
          index = idx;
          return item;
         }
      });
      if(temp[0].children.length){
        let data = addChildByBranch(temp[0].children, userData);
        console.log(data)
      }else {
        storedData[index].children.push(userData);
      }
      localStorage.setItem("formData", JSON.stringify(storedData));
      alert(`Submitted successfully`);
      show("listUser");
    }
  };
  return (
    <div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-sec">
            <label className="input-text">Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="input-sec">
            <label className="input-text">Branch</label>
            <select
              name="branch"
              value={userData.branch}
              onChange={handleChange}
            >
              <option value="select branch">Select Branch</option>
              {selectedBranches.map((branch, index) => (
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))}
              {!selectedBranches?.length && (
                <>
                  <option value="CEO">CEO</option>
                  <option value="CTO">CTO</option>
                  <option value="Manager">Manager</option>
                  <option value="HR">HR</option>
                  <option value="Developer">Developer</option>
                  <option value="QA">QA</option>
                  <option value="Designer">Designer</option>
                  <option value="SRE">SRE</option>
                  <option value="Sales and marcketing">
                    Sales and marcketing
                  </option>
                  <option value="Support">Support</option>
                  <option value="Devops">Devops</option>
                </>
              )}
            </select>
            {errors.branch && <span className="error">{errors.branch}</span>}
          </div>
          <div className="input-sec">
            <label className="input-text">Role</label>
            <select
              name="role"
              value={userData.role}
              onChange={handleChange}
              placeholder="select role"
            >
              <option value="">Select Role</option>
              <option value="CEO" disabled={selectedRoles.includes("ceo")}>
                CEO
              </option>
              <option value="CTO" disabled={selectedRoles.includes("cto")}>
                CTO
              </option>
              <option value="Front-end-Developer">Front-end-Developer</option>
              <option value="Back-end-Developer">Back-end-Developer</option>
              <option value="UI UX designer">UI UX</option>
              <option value="Product Designer">Product Designer</option>
              <option value="Digital marcketing">Digital marcketing</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
              <option value="Automation Architect">Automation Architect</option>
              <option value="Security Engineer">Security Engineer</option>
              <option value="Cloud Engineer">Cloud Engineer</option>
              <option value="Security Engineer">Security Engineer</option>
              <option value="Systems Engineer">Systems Engineer</option>
              <option value="Performance Engineer">Performance Engineer</option>
              <option value="Release Engineer">Release Engineer</option>
              <option value="Security Engineer">Security Engineer</option>
            </select>
            {errors.role && <span className="error">{errors.role}</span>}
          </div>
          <div className="input-sec">
            <label className="input-text">Password</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          <div className="input-sec">
            <label className="input-text">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>
          <div>
            <button type="submit" className="registration">
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

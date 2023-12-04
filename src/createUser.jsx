import "./signup.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function CreateUser() {
  const [userData, setuserData] = useState({
    name: "",
    id: 0,
    role: "",
    branch: "",
    status:false,
    children: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserData({ ...userData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userData.name?.length) {
      newErrors.name = "please enter your name";
    }
    if (!userData.branch) {
      newErrors.branch = "Please select a branch";
    }
    if (!userData.role) {
      newErrors.role = "Please select a role";
    }
    if (!userData.password?.length) {
      newErrors.password = "please enter a password";
    }
    if (
      !userData.confirmPassword?.length ||
      userData.confirmPassword !== userData.password
    ) {
      newErrors.confirmPassword = "passwords donot match";
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
      storedData.map((item) => {
        if (item.id == userId) {
          userData.id = item.children.length + 1;
          item.children.push(userData);
        }
      });
      localStorage.setItem("formData", JSON.stringify(storedData));
      alert("submitted successfully ", userData);
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
              <option value="ceo">CEO</option>
              <option value="cto">CTO</option>
              <option value="Manager">Manager</option>
              <option value="HR">HR</option>
              <option value="Developer">Developer</option>
              <option value="QA">QA</option>
              <option value="Designer">Designer</option>
              <option value="SRE">SRE</option>
              <option value="Sales and marcketing">Sales and marcketing</option>
              <option value="Support">Support</option>
              <option value="Devops">Devops</option>
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
              <option value="Select Role">Select Role</option>
              <option value="ceo">CEO</option>
              <option value="cto">CTO</option>
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

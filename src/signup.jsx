import { useNavigate } from "react-router-dom";
import metlonelogo from "./assets/metlonelogo.png";
import "./signup.css";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setformData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    company:"",
    password: "",
    confirmPassword: "",
    gender: "",
    id: 0,
    children: [],
  });

  // const history =useHistory();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname?.length) {
      newErrors.firstname = "please enter your first name";
    }
    if (!formData.lastname?.length) {
      newErrors.lastname = "please enter your last name";
    }
    if (!formData.email?.length) {
      newErrors.email = "please enter your email";
    }
    if (!formData.password?.length) {
      newErrors.password = "please enter a password";
    }
    if (
      !formData.confirmPassword?.length ||
      formData.confirmPassword !== formData.password
    ) {
      newErrors.confirmPassword = "passwords donot match";
    }
    // if (!formData.gender) {
    //   newErrors.gender = "Please select a gender";
    // }
    if (!formData.company) {
      newErrors.company = "Please select a company";
    }
    // if (!formData.branch) {
    //     newErrors.branch = "Please select a branch";
    // }
    // if (!formData.role) {
    //     newErrors.role = "Please select a role";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      let storedData = localStorage.getItem("formData");
      storedData = storedData ? JSON.parse(storedData) : [];
      const updatedData = storedData
        ? Array.isArray(storedData)
          ? [...storedData, formData]
          : [formData]
        : [formData];
      if (updatedData.length) {
        updatedData.map((data) => {
          if (formData.id == data.id) {
            data.id = updatedData.length;
          }
        });
      }
      console.log(updatedData);
      localStorage.setItem("formData", JSON.stringify(updatedData));

      alert("submitted successfully ", formData);
      navigate("/");
    }
  };

  return (
    <div>
      <div className="headerLayout">
        <img src={metlonelogo} alt="logo" />
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-sec">
            <label className="input-text">First Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
            {errors.firstname && (
              <span className="error">{errors.firstname}</span>
            )}
          </div>
          <div className="input-sec">
            <label className="input-text">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
            {errors.lastname && (
              <span className="error">{errors.lastname}</span>
            )}
          </div>
          <div className="input-sec">
            <label className="input-text">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          {/* <div className="input-sec">
            <label className="input-text">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div> */}
          <div className="input-sec">
            <label className="input-text">Company</label>
            <input type="text" name="company" value={formData.company}  onChange={handleChange}/>
            {errors.company && <span className="error">{errors.company}</span>}
          </div>

          {/* <div className='input-sec'>
                        <label className='input-text'>Branch</label>
                            <select name="branch" value={formData.branch} onChange={handleChange}>
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
                            {errors.branch && <span className='error'>{errors.branch}</span>}
                    </div>
                    <div className='input-sec'>
                        <label className='input-text'>Role</label>
                            <select name="role" value={formData.role} onChange={handleChange} placeholder='select role'>
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
                            {errors.role && <span className='error'>{errors.role}</span>}
                    </div> */}
          <div className="input-sec">
            <label className="input-text">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
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
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>
          <div>
            <button className="registration">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

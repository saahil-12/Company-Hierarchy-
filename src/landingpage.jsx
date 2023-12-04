import "./landingpage.css";
import metlonelogo from "./assets/metlonelogo.png";
import { useNavigate } from "react-router-dom";
// import Signup from "./signup"
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Landing() {
  const navigate = useNavigate();

  const [selectedCompany, setSelectedCompany] = useState("");
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    let storedData = localStorage.getItem("formData");
    storedData = storedData ? JSON.parse(storedData) : [];
    let temp = [];
    storedData.map((data) => {
      temp.push(data.company);
    });
    setCompanies([...temp]);
    console.log(companies);
  }, []);

  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    
    const user = storedData.find(
      (data) =>
        data.email === loginData.email && data.password === loginData.password &&  data.company === selectedCompany
    );

    if (user) {
      alert(`Welcome back, ${user.firstname} ${user.lastname}!`);
      let userData = {
        username: user?.firstname + user?.lastname,
        id: user.id,
      };
      Cookies.set("user", JSON.stringify(userData));
      navigate("/hierarchy");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };
  let storedData = localStorage.getItem("formData");
  storedData = storedData ? JSON.parse(storedData) : [];


  return (
    <div>
      <div className="headerLayout">
        <img src={metlonelogo} alt="logo" />
      </div>
      <div>
        <div>
          <h1>Login</h1>
        </div>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) =>
                  setloginData({ ...loginData, email: e.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={loginData.password}
                onChange={(e) =>
                  setloginData({ ...loginData, password: e.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label>
              <select
                name="company"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
              >
                <option value="">Select Company</option>
                {companies.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
            </label>
          </div>
          <div>
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
          <p>Don't have an account?</p>
          <div>
            <button
              className="login-button"
              onClick={() => navigate("/signup")}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

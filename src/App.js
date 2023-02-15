import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import ResetPassword from "./components/reset.password.component";

const checkForInactivity = () => {
  const expireTime = localStorage.getItem("expireTime");

  if (expireTime < Date.now()) {
    alert("Are you still there?");
  }
};

const updateExpireTime = () => {
  const expireTime = Date.now() + 30000;
  localStorage.setItem("expireTime", expireTime);
};

function App() {  
  useEffect(() => {
    const interval = setInterval(() => {
      checkForInactivity();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateExpireTime();

    window.addEventListener("click", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    window.addEventListener("scroll", updateExpireTime);
    window.addEventListener("mousemove  ", updateExpireTime);

    return () => {
      window.removeEventListener("click", updateExpireTime);
      window.removeEventListener("keypress", updateExpireTime);
      window.removeEventListener("scroll", updateExpireTime);
      window.removeEventListener("mousemove  ", updateExpireTime);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand navbar-dark fixed-top">      
          <div className="collapse navbar-collapse" id="myNavbar">
            <Link className="navbar-brand" to={"/sign-in"}>
              Toko123
            </Link>
            <ul className="nav navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>
                  Sign up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/reset-password"}>
                  Reset Password
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/reset-password" element={<ResetPassword />} />              
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  
  const enableBtn = () => {
    document.getElementById("submitBtn").disabled = false;
  };

  var loginFailedCounter = 0;

  const handleLogin = (e) => {
    e.preventDefault();
    const loggeduser = JSON.parse(localStorage.getItem("user"));
    if (
      input.username === loggeduser.username &&
      input.password === loggeduser.password
    ) {
      toast.success("Login Success!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.warn("Wrong Username or Password", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      loginFailedCounter++;

      if (loginFailedCounter >= 3) {
        toast.error("Wait 30 Seconds Before Trying Again", {
          position: "bottom-center",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        document.getElementById("usernameField").disabled = "disabled";
        document.getElementById("passwordField").disabled = "disabled";
        document.getElementById("submitBtn").disabled = "disabled";

        setTimeout(function () {
          document.getElementById("usernameField").disabled = false;
          document.getElementById("passwordField").disabled = false;
          document.getElementById("submitBtn").disabled = false;
        }, 30000);
      }
    }
  };
  return (
    <form
      onSubmit={handleLogin}
      data-netlify-recaptcha="true"
      data-netlify="true"
      className="needs-validation"
    >
      <h3>Sign In</h3>
      <div className="picture-padding">
      <picture>
        <img
          src={require("../img/profile_picture_placeholder.png")}
          class="rounded mx-auto d-block"
          alt="profile"
          width="150px"
        />
      </picture>
      </div>
      
      <div className="form-group was-validated mb-3">
        <input
          type="text"
          name="username"
          id="usernameField"
          value={input.username}
          onChange={(e) =>
            setInput({ ...input, [e.target.name]: e.target.value })
          }
          className="form-control"
          required
          placeholder="Username"
        />
        <div class="invalid-feedback">Please enter your username</div>
      </div>

      <div className="form-group was-validated mb-3">
        <input
          type="password"
          name="password"
          id="passwordField"
          value={input.password}
          onChange={(e) =>
            setInput({ ...input, [e.target.name]: e.target.value })
          }
          className="form-control"
          required
          placeholder="Password"
        />
        <div class="invalid-feedback">Please enter your password</div>
      </div>

      <div class="row mb-4">
        <div class="col d-flex justify-content-center">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="rememberMe"
            />
            <label class="form-check-label" for="rememberMe">
              Remember me
            </label>
          </div>
        </div>

        <div class="col">
          <a href="#!">Forgot password?</a>
        </div>
      </div>
      <div className="col d-flex justify-content-center captcha-padding">
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_SITE_KEY}
          onChange={enableBtn}
          size="normal"
        />
      </div>
      <div class="container">
        <div class="row">
          <div class="col text-center">
            <button class="btn btn-dark w-50" type="submit" value="Login">
              Login
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
}

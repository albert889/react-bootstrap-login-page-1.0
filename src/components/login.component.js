import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {  
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const enableBtn = () => {
    document.getElementById("submitBtn").disabled = false;
  };

  var loginFailedCounter = 0;

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, input.email, input.password)
      .then((userCredential) => {
        console.log(userCredential);
        toast.success("Login Success!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });                
        document.getElementById("emailField").value = "";
        document.getElementById("passwordField").value = "";
      })
      .catch((error) => {
        console.log(error);
        toast.warn("Wrong Email or Password", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });        
        loginFailedCounter++;

        if (loginFailedCounter >= 3) {
          toast.error("Wait 30 Seconds Before Trying Again", {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });          
          document.getElementById("emailField").disabled = "disabled";
          document.getElementById("passwordField").disabled = "disabled";
          document.getElementById("submitBtn").disabled = "disabled";

          setTimeout(() => {
            document.getElementById("emailField").disabled = false;
            document.getElementById("passwordField").disabled = false;            
          }, 30000);
        }        
      });    
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
            className="rounded mx-auto d-block"
            alt="profile"
            width="150px"
          />
        </picture>
      </div>

      <div className="form-group was-validated mb-3">
        <input
          type="email"
          name="email"
          id="emailField"
          value={input.email}
          onChange={(e) =>
            setInput({ ...input, [e.target.name]: e.target.value })
          }
          className="form-control"
          required
          placeholder="Email"
        />
        <div className="invalid-feedback">Please enter your email</div>
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
        <div className="invalid-feedback">Please enter your password</div>
      </div>

      <div className="row mb-4">
        <div className="col d-flex justify-content-center">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
        </div>

        <div className="col">
          <a href="/reset-password">Forgot password?</a>
        </div>
      </div>
      <div className="col d-flex justify-content-center captcha-padding">
        <ReCAPTCHA          
          sitekey={process.env.REACT_APP_SITE_KEY}
          onChange={enableBtn}
          size="normal"
        />
      </div>
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <button
              className="btn btn-dark w-50"
              type="submit"
              value="Login"
              id="submitBtn"
              disabled
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
}

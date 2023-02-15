import React, { useState } from "react";
import { auth } from "../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";

function ResetPassword() {
  const [input, setInput] = useState({
    email: "",
  });

  const enableBtn = () => {
    document.getElementById("requestBtn").disabled = false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, input.email)
      .then(() => {
        console.log("Password Reset Link Sent!");
        toast.success("Password Reset Link Sent!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log(error);
        toast.warn("Email invalid!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      });
    setInput({ email: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-netlify-recaptcha="true"
      data-netlify="true"
    >
      <h3>Reset Password</h3>
      <div className="mb-3">
        <input
          type="email"
          name="email"
          id="emailField"
          value={input.email}
          onChange={(e) =>
            setInput({ ...input, [e.target.name]: e.target.value })
          }          
          className="form-control"
          placeholder="Enter Email"
        />
      </div>
      <div className="col d-flex justify-content-center captcha-padding">
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_SITE_KEY}
          onChange={enableBtn}
        />
      </div>
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <button
              className="btn btn-dark w-50"
              type="submit"
              id="requestBtn"
              disabled
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
}

export default ResetPassword;

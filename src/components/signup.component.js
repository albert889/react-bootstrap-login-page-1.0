import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {  
  const [input, setInput] = useState({
    email: "",    
    password: "",
  });

  const enableBtn = () => {
    document.getElementById("signUpBtn").disabled = false;
  };
  const handleSubmit = (e) => {    
    e.preventDefault();        
    createUserWithEmailAndPassword(auth, input.email, input.password)
      .then((userCredential) => {
        console.log(userCredential);
        toast.success("Sign Up Success!", {
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
        toast.warn("Email alredy used or invalid!", {
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
    document.getElementById("emailField").value = "";    
    document.getElementById("passwordField").value = "";    
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-netlify-recaptcha="true"
      data-netlify="true"
    >
      <h3>Sign Up</h3>
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
          placeholder="Enter email"
        />
      </div>      

      <div className="mb-3">
        <input
          type="password"
          name="password"
          id="passwordField"
          pattern="(?=.*\d)(?=.*?[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}"
          required
          title="Password harus menggunakan kombinasi huruf besar, huruf kecil, angka, symbol, dan minimal sebanyak 8 karakter."
          value={input.password}
          onChange={(e) =>
            setInput({ ...input, [e.target.name]: e.target.value })
          }
          className="form-control"
          placeholder="Enter password"
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
              id="signUpBtn"
              disabled
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <div className="already-registered-padding">
        <p className="text-right col text-center">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </div>
      <ToastContainer />
    </form>
  );
}

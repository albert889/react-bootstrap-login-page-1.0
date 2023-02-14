import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function SignUp() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const enableBtn = () => {
    document.getElementById("signUpBtn").disabled = false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(input));
    alert("Sign Up Success!");
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
          type="text"
          name="username"
          value={input.username}
          onChange={(e) =>
            setInput({ ...input, [e.target.name]: e.target.value })
          }
          className="form-control"
          placeholder="Enter username"
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          name="password"
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
      <div class="container">
        <div class="row">
          <div class="col text-center">
            <button class="btn btn-dark w-50" type="submit">
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
    </form>
  );
}

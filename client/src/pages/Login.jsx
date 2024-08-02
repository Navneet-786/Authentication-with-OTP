import React, { useState } from "react";
import "../styles/Combine.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { sentOtpFunction } from "../services/Apis";
import Spinner from "react-bootstrap/Spinner";
const Login = () => {
  const [email, setEmail] = useState("");
  const [spinner, setSpinner] = useState(false);
  const Navigate = useNavigate();
  const clickHandler = async (e) => {
    setSpinner(true);
    e.preventDefault();
    if (email === "" || !email.includes("@")) {
      toast.error("Enter Your Email !");
    } else {
      let data = { email: email };
      let response = await sentOtpFunction(data);
      if (response.status == 200) {
        Navigate("/user/otp", { state: email });
      } else {
        toast.error(response.response.data.error);
      }
    }
    setSpinner(false);
  };
  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back ,Log In</h1>
            <p>Hii, we are glad you are back. Please Login</p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="btn" onClick={clickHandler}>
              {spinner ? (
                <Spinner animation="border" variant="light" />
              ) : (
                "Login"
              )}
            </button>
            <p>
              Don't have an account ? <NavLink to="/register">Sign up</NavLink>
            </p>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Login;

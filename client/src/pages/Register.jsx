import React, { useState } from "react";
import "../styles/Combine.css";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { registerFunction } from "../services/Apis";
import Spinner from "react-bootstrap/Spinner";
const Register = () => {
  const [spinner, setSpinner] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const Navigate = useNavigate();
  const [inputData, setInputData] = useState({
    fname: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };
  const handleSubmit = async (e) => {
    setSpinner(true);
    e.preventDefault();
    const { fname, email, password } = inputData;
    if (!fname || !email || !password) {
      toast.error(" all fields are required !");
    } else if (!email.includes("@")) {
      toast.error("Enter valid Email!");
    } else if (password.length < 6) {
      toast.error("Password Must be more than 6 character long !");
    } else {
      const response = await registerFunction(inputData);
      if (response.status === 200) {
        toast.success("successful");
        setInputData({ ...inputData, fname: "", email: "", password: "" });
        Navigate("/");
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
            <h1>Sign Up</h1>
            <p className="text-center w-[80%]">
              we are glad that you will be using Project OTPAuth to manage your
              task! we will hope that you will get Like it
            </p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                name="fname"
                id="fname"
                placeholder="Enter Your Name"
                onChange={handleChange}
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                onChange={handleChange}
              />
            </div>
            <div className="form_input">
              <label htmlFor="pass">Password</label>
              <div className="two">
                <input
                  type={!showPass ? "password" : "text"}
                  name="password"
                  id="pass"
                  placeholder="Enter Your Password"
                  onChange={handleChange}
                />
                <div
                  className="showpass"
                  onClick={() => setShowPass(!showPass)}
                >
                  Show
                </div>
              </div>
            </div>
            <button className="btn" onClick={(e) => handleSubmit(e)}>
              {spinner ? (
                <Spinner animation="border" variant="light" />
              ) : (
                "Register"
              )}
            </button>
            <p>
              already have an account?<NavLink to="/">Login</NavLink>
            </p>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Register;

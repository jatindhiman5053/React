import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../Validation/Signupvalidation";
import axios from "axios";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));
    if (errors.name === "" && errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8081/signup", values)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-3 rounded w-25 border border-1">
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Name">
              {" "}
              <strong>Name</strong>{" "}
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              className="form-control rounded-0"
              autoComplete="on"
              onChange={handleInput}
            ></input>
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              className="form-control rounded-0"
              autoComplete="on"
              onChange={handleInput}
            ></input>
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              autoComplete="on"
              onChange={handleInput}
            ></input>
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>

          <button type="Submit" className="btn btn-success w-100">
            Sign Up{" "}
          </button>

          <p className="mb-0 mt-2">Already have Account</p>
          <Link to="/" className="btn border border-1 w-100">
            {" "}
            Login{" "}
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;

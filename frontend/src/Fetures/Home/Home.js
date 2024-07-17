import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../Reducer/reducer";
import { useNavigate } from "react-router-dom";
import Validation from "../../Validation/Signupvalidation";
import axios from "axios";

function Home() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const AdduserHandler = (e) => {
    e.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (
      !validationErrors.name &&
      !validationErrors.email &&
      !validationErrors.password
    ) {
      axios
        .post("http://localhost:8081/signup", values)
        .then((res) => {
          dispatch(addUser(values));
          setValues({ name: "", email: "", password: "" });
          navigate("/AddUser");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-3 rounded w-25 border border-1">
        <form onSubmit={AdduserHandler}>
          <div className="mb-3">
            <label htmlFor="Name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              className="form-control rounded-0"
              autoComplete="on"
              value={values.name}
              onChange={handleInput}
            />
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
              value={values.email}
              onChange={handleInput}
            />
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
              value={values.password}
              onChange={handleInput}
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="btn btn-success w-100">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;

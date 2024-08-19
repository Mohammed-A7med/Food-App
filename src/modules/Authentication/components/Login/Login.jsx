import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { USERS_URLs } from "../../../../constans/END_POINTS";
import {
  PasswordValidation,
  emailValidation,
} from "../../../../constans/VALIDATIONS";
import { AuthContext } from "../../../../context/AuthContext";

export default function Login() {
  const { saveUserData } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(USERS_URLs.login, data);
      localStorage.setItem("userToken", response.data.token);
      saveUserData();
      navigate("/dashboard");
      toast.success("Login successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <h4 className="fw-bold">Log In</h4>
      <p className="text-muted">Welcome Back! Please enter your details</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputGroup mb-3">
          <div className="input-group my-1">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa-solid fa-mobile-screen"></i>
            </span>
            <input
              type="text"
              className="form-control rounded-1"
              placeholder="Enter your E-mail"
              aria-label="email"
              aria-describedby="basic-addon1"
              {...register("email", emailValidation)}
            />
          </div>
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
        </div>

        <div className="inputGroup mb-3">
          <div className="input-group my-1">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control rounded-1 border-end-0"
              placeholder="password"
              aria-label="password"
              aria-describedby="basic-addon1"
              {...register("password", PasswordValidation)}
            />
            <button
              type="button"
              className="input-group-text bg-transparent "
              onClick={togglePasswordVisibility}
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
            >
              <span className="sr-only">
                {showPassword ? "hide password" : "show password"}
              </span>
              <i
                className={
                  showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
                }
              ></i>
            </button>
          </div>
          {errors.password && (
            <span className="text-danger">{errors.password.message}</span>
          )}
        </div>

        <div className="login-links d-flex justify-content-between my-2">
          <Link
            to="/register"
            className="text-decoration-none text-dark register-link"
          >
            Register Now?
          </Link>
          <Link
            to="/forget-password"
            className="text-decoration-none text-success forget-link"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          className="btn btn-success w-100 mt-3"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span>
              please wait...{" "}
              <i className="fa-solid fa-spinner fa-spin mx-1"></i>
            </span>
          ) : (
            "login"
          )}
        </button>
      </form>
    </>
  );
}

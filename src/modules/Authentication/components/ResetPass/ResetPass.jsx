import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { USERS_URLs } from "../../../../constans/END_POINTS";
import {
  PasswordValidation,
  emailValidation,
} from "../../../../constans/VALIDATIONS";

export default function ResetPass() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(USERS_URLs.reset, data);
      navigate("/login");
      toast.success("Password has been updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <h4 className="fw-bold">Reset Password</h4>
      <p className="text-muted">Please Enter Your OTP or Check Your Inbox</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputGroup mb-3">
          <div className="input-group mb-1">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa-regular fa-envelope"></i>
            </span>
            <input
              type="text"
              className="form-control rounded-1"
              placeholder="Email"
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
          <div className="input-group mb-1">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type="text"
              className="form-control rounded-1"
              placeholder="OTP"
              aria-label="seed"
              aria-describedby="basic-addon1"
              {...register("seed", { required: "OTP is required" })}
            />
          </div>
          {errors.seed && (
            <span className="text-danger">{errors.seed.message}</span>
          )}
        </div>

        <div className="inputGroup mb-3">
          <div className="input-group mb-1">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control rounded-1 border-end-0"
              placeholder="New Password"
              aria-label="password"
              aria-describedby="basic-addon1"
              {...register("password", PasswordValidation)}
            />
            <button
              type="button"
              className="input-group-text bg-transparent"
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

        <div className="inputGroup mb-3">
          <div className="input-group mb-1">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-control rounded-1 border-end-0"
              placeholder="Confirm New Password"
              aria-label="confirmPassword"
              aria-describedby="basic-addon1"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === getValues("password") || "password dont match",
              })}
            />
            <button
              type="button"
              className="input-group-text bg-transparent"
              onClick={toggleConfirmPasswordVisibility}
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
            >
              <span className="sr-only">
                {showPassword ? "hide password" : "show password"}
              </span>
              <i
                className={
                  showConfirmPassword
                    ? "fa-solid fa-eye"
                    : "fa-solid fa-eye-slash"
                }
              ></i>
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-danger">
              {errors.confirmPassword.message}
            </span>
          )}
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
            "Reset Password"
          )}
        </button>
      </form>
    </>
  );
}

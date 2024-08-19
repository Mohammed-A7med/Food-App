import React, { useState } from "react";
import logo from "../../../../assets/Imges/img-logo.png";
import { useForm } from "react-hook-form";
import { PasswordValidation } from "../../../../constans/VALIDATIONS";
import axios from "axios";
import { USERS_URLs } from "../../../../constans/END_POINTS";
import { toast } from "react-toastify";
import Home from "../../../Home/components/Home/Home";

export default function ChangePass() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(USERS_URLs.ChangePassword, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      toast.success(response.data.message || "Password updated successfully.");
      setIsHidden(true);
    } catch (error) {
      toast.error(error.message || "Password change failed. Please try again.");
    }
  };

  return (
    <div className="position-relative">
      <Home />

      <div
        className={`container-fluid position-absolute top-50 start-50 translate-middle mt-5 container-changePass ${
          isHidden ? "d-none" : ""
        }`}
      >
        <div className="row justify-content-center align-items-center mt-5">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 contaent-changPass shadow-sm">
            <div className="bg-changPass rounded rounded-4 p-4 p-md-5">
              <div className="img-logo text-center my-3">
                <img className="w-50" src={logo} alt="logo" />
              </div>
              <h4 className="fw-bold text-center">Change Your Password</h4>
              <p className="text-muted text-center">Enter your details below</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="inputGroup mb-3">
                  <div className="input-group mb-1">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      type={showOldPassword ? "text" : "password"}
                      className="form-control rounded-1 border-end-0"
                      placeholder="Old Password"
                      aria-label="oldPassword"
                      aria-describedby="basic-addon1"
                      {...register("oldPassword", PasswordValidation)}
                    />
                    <button
                      type="button"
                      className="input-group-text bg-transparent"
                      onClick={toggleOldPasswordVisibility}
                      onMouseDown={(e) => e.preventDefault()}
                      onMouseUp={(e) => e.preventDefault()}
                    >
                      <span className="sr-only">
                        {showOldPassword ? "hide password" : "show password"}
                      </span>
                      <i
                        className={
                          showOldPassword
                            ? "fa-solid fa-eye"
                            : "fa-solid fa-eye-slash"
                        }
                      ></i>
                    </button>
                  </div>
                  {errors.oldPassword && (
                    <span className="text-danger">
                      {errors.oldPassword.message}
                    </span>
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
                      aria-label="newPassword"
                      aria-describedby="basic-addon1"
                      {...register("newPassword", PasswordValidation)}
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
                          showPassword
                            ? "fa-solid fa-eye"
                            : "fa-solid fa-eye-slash"
                        }
                      ></i>
                    </button>
                  </div>
                  {errors.newPassword && (
                    <span className="text-danger">
                      {errors.newPassword.message}
                    </span>
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
                      aria-label="confirmNewPassword"
                      aria-describedby="basic-addon1"
                      {...register("confirmNewPassword", {
                        required: "Confirm New Password is required",
                        pattern: {
                          value: RegExp,
                          message:
                            "Password must be at least 4 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
                        },
                        validate: (value) =>
                          value === getValues("newPassword") ||
                          "Passwords don't match",
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
                        {showConfirmPassword
                          ? "hide password"
                          : "show password"}
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
                  {errors.confirmNewPassword && (
                    <span className="text-danger">
                      {errors.confirmNewPassword.message}
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
                      Please wait...{" "}
                      <i className="fa-solid fa-spinner fa-spin mx-1"></i>
                    </span>
                  ) : (
                    "Change Password"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  PasswordValidation,
  RequiredField,
  emailValidation,
} from "../../../../constans/VALIDATIONS";
import { USERS_URLs } from "../../../../constans/END_POINTS";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileTypes = ["JPG", "PNG", "GIF"];
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data) => {
    const userData = appendToFormData(data);
    try {
      const response = await axios.post(USERS_URLs.register, userData);
      toast.success(
        response.data.message ||
          "Your account has been successfully created! You can now log in with your new credentials"
      );
      navigate("/account-verify");
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Registration failed. Please check your details and try again"
      );
    }
  };

  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", data.profileImage);

    return formData;
  };

  const handleFileChange = (file) => {
    setValue("recipeImage", file, { shouldValidate: true });
  };

  return (
    <>
      <h4 className="fw-bold">Register</h4>
      <p className="text-muted">Welcome Back! Please enter your details</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="inputGroup mb-3">
              <div className="input-group my-1">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-regular fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control rounded-1"
                  placeholder="UserName"
                  aria-label="User-name"
                  aria-describedby="basic-addon1"
                  {...register("userName", RequiredField("user Name"))}
                />
              </div>
              {errors.userName && (
                <span className="text-danger">{errors.userName.message}</span>
              )}
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="inputGroup mb-3">
              <div className="input-group my-1">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-regular fa-envelope"></i>
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
          </div>

          <div className="col-12 col-md-6">
            <div className="inputGroup mb-3">
              <div className="input-group my-1">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-earth-americas"></i>
                </span>
                <input
                  type="text"
                  className="form-control rounded-1"
                  placeholder="Country"
                  aria-label="Country"
                  aria-describedby="basic-addon1"
                  {...register("country", RequiredField("country"))}
                />
              </div>
              {errors.country && (
                <span className="text-danger">{errors.country.message}</span>
              )}
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="inputGroup mb-3">
              <div className="input-group my-1">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-mobile-screen"></i>
                </span>
                <input
                  type="text"
                  className="form-control rounded-1"
                  placeholder="PhoneNumber"
                  aria-label="Phone-number"
                  aria-describedby="basic-addon1"
                  {...register("phoneNumber", RequiredField("phone Number"))}
                />
              </div>
              {errors.phoneNumber && (
                <span className="text-danger">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-12 col-md-6">
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
          </div>

          <div className="col-12 col-md-6">
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
                    required: "confirm Password is required",
                    pattern: {
                      value: RegExp,
                      message:
                        "Password must be at least 4 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
                    },
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
          </div>

          <div className="col-12 text-center overflow-x-hidden">
            <div className="inputGroup mb-3 Upload-img">
              <input
                type="file"
                accept={fileTypes.join(",")}
                className="d-none"
              />
              <FileUploader
                multiple={false}
                handleChange={handleFileChange}
                name="file"
                className="w-100 py-3"
                label={"Drag & Drop or Choose an Item Image to Upload"}
                types={fileTypes}
              />
              {errors.recipeImage && (
                <span className="text-danger">
                  {errors.recipeImage.message}
                </span>
              )}
            </div>
          </div>

          <div className="login-links d-flex justify-content-end mt-1">
            <Link
              to="/login"
              className="text-decoration-none text-success forget-link"
            >
              Login Now?
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
              "Register"
            )}
          </button>
        </div>
      </form>
    </>
  );
}

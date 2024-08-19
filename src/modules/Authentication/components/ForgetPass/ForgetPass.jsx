import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { USERS_URLs } from "../../../../constans/END_POINTS";
import { emailValidation } from "../../../../constans/VALIDATIONS";

export default function ForgetPass() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(USERS_URLs.resetRequest, data);
      navigate("/reset-password");
      toast.success("Please check your email");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <h4 className="fw-bold">Forgot Your Password?</h4>
      <p className="text-muted">
        No worries! Please enter your email and we will send a password reset
        link{" "}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputGroup mb-3">
          <div className="input-group mb-1">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa-solid fa-mobile-screen"></i>
            </span>
            <input
              type="text"
              className="form-control rounded-1"
              placeholder="Enter your email"
              aria-label="email"
              aria-describedby="basic-addon1"
              {...register("email", emailValidation)}
            />
          </div>
          {errors.email && (
            <span className="text-danger"> {errors.email.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-success w-100 mt-5"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span>
              please wait...{" "}
              <i className="fa-solid fa-spinner fa-spin mx-1"></i>
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </>
  );
}

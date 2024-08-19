import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  RequiredField,
  emailValidation,
} from "../../../../constans/VALIDATIONS";
import axios from "axios";
import { USERS_URLs } from "../../../../constans/END_POINTS";
import { toast } from "react-toastify";

export default function AccountVerify() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(USERS_URLs.verify, data);
      navigate("/login");
      toast.success(response.data.message||" Account Verification Successful!");
      console.log(response);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <h4 className="fw-bold">Verify</h4>
      <p className="text-muted">Welcome Back! Please enter your details</p>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <div className="inputGroup mb-3">
          <div className="input-group my-1">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa-regular fa-paper-plane"></i>
            </span>
            <input
              type="text"
              className="form-control rounded-1"
              placeholder="Enter code"
              aria-label="code"
              aria-describedby="basic-addon1"
              {...register("code", RequiredField("code"))}
            />
          </div>
          {errors.code && (
            <span className="text-danger">{errors.code.message}</span>
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
            "Verify Account"
          )}
        </button>
      </form>
    </>
  );
}

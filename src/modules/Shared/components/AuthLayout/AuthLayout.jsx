import React from "react";
import logo from "../../../../assets/Imges/img-logo.png";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  
  return (
    <>
      <div className="auth-container">
        <div className="container-fluid overLayer">
          <div className="row justify-content-center align-items-center vh-100">
            <div className="col-md-5">
              <div className="auth-item bg-white rounded rounded-4  p-5 pt-3">
                <div className="img-logo text-center my-3">
                  <img className="w-50" src={logo} alt="" />
                </div>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

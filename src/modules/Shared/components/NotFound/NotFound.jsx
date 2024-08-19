import React from "react";
import notFoundLogo from "../../../../assets/Imges/error.png";
import logo from "../../../../assets/Imges/img-logo.png";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className="container-fluid bg-notFound vh-100">
        <div className="row h-100">
          <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand navbar-img-notFound" to="/">
              <img className="w-75" src={logo} alt="food-Logo" />
            </Link>
          </nav>
          <div className="col-12 col-md-6 d-flex justify-content-center">
            <div className="content w-50 m-auto text-center text-md-start my-5">
              <h2>Oops.</h2>
              <h3>Page not found</h3>
              <p>
                This page doesn’t exist or was removed! We suggest you go back
                to home.
              </p>
              <button className="btn btn-success px-4 py-2 my-md-4">
                <Link
                  to="/dashboard"
                  className="text-decoration-none text-white fw-bold"
                >
                  <i className="fa-solid fa-arrow-left me-2"></i>
                  Back To Home
                </Link>
              </button>
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex align-items-end">
            <div className="img-not-found">
              <img
                className="img-fluid"
                src={notFoundLogo}
                alt="404 Not Found"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

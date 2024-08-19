import React, { useContext } from "react";
import personLogo from "../../../../assets/Imges/nav-img.png";
import { AuthContext } from "../../../../context/AuthContext";

export default function Navbar() {
  const {userData} = useContext(AuthContext);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid px-4">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <input
              className="form-control rounded-5"
              type="search"
              placeholder="Search Here"
              aria-label="Search"
            />
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item nav-logo-img d-flex justify-content-end">
                <img
                  className="img-fluid rounded-5"
                  src={personLogo}
                  alt="person-Logo"
                />
                <a className="nav-link" href="#">
                  {userData?.userName}
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></a>
                {/* <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul> */}
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link" href="#">
                  <i className="fa-solid fa-bell"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

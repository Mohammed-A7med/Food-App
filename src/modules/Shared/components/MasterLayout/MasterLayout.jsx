import React, { useEffect } from "react";
import SideBar from "../SideBar/SideBar";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function MasterLayout() {
  return (
    <>
      <div className="d-flex">
        <div>
          <SideBar />
        </div>
        <div className="w-100 ">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}

import React from "react";

export default function Header({ title, description, imgUrl, secandTitle }) {
  return (
    <div className="container-fluid px-4">
      <div className="row rounded-4 bg-header text-white align-items-center py-2">
        <div className="col-12 col-md-6 d-flex justify-content-center mb-2 mb-md-0">
          <div className="content text-center text-md-start w-100 px-md-5">
            <h2 className="py-2">
              {title}
              <span className="secandTitle">{secandTitle}</span>
            </h2>
            <p>{description}</p>
          </div>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end">
          <div className="header-img">
            <img className="img-fluid" src={imgUrl} alt="header-img" />
          </div>
        </div>
      </div>
    </div>
  );
}

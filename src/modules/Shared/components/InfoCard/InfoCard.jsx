import React from "react";
import { useNavigate } from "react-router-dom";

export default function InfoCard({ title  , buttonCaption}) {
  const navigate = useNavigate();
  
  function goToRecipes() {
    navigate('/dashboard/recipes-List')
  }

  return (
    <div className="container-fluid px-4 my-2">
      <div className="row bg-component-title align-items-center py-4">
        <div className="col-12 col-md-6 d-flex justify-content-center">
          <div className="item w-100 px-md-5 text-center text-md-start">
            <h4 className="fw-bolder">
              Fill the <span className="text-success">{title}</span> !
            </h4>
            <p>
              you can now fill the meals easily using the table and form ,<br />{" "}
              click here and sill it with the table !
            </p>
          </div>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end">
          <button onClick={goToRecipes} className="btn btn-success px-4">
           {buttonCaption} <i className="m-2 fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

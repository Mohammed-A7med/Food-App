import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { RequiredField } from "../../../../constans/VALIDATIONS";
import axios from "axios";
import { CATEGORIES_URLs } from "../../../../constans/END_POINTS";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CategoryAdd({
  showModalAdd,
  handleCloseModalAdd,
  getCategoriesList,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const addNewCategory = async (data) => {
    try {
      const response = await axios.post(CATEGORIES_URLs.create, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      handleCloseModalAdd()
      getCategoriesList();
      toast.success('New category created successfully!')
    } catch (error) {
        toast.error(error.data.message);
    }
  };

  return (
    <>
      <Modal show={showModalAdd} onHide={handleCloseModalAdd}>
        <Modal.Header closeButton>
          <h5 className="my-auto">Add Category</h5>
        </Modal.Header>
        <Modal.Body>
          <form className="mt-5" onSubmit={handleSubmit(addNewCategory)}>
            <div className="inputGroup mb-3">
              <div className="input-group my-1">
                <input
                  type="text"
                  className="form-control rounded-1"
                  placeholder="Category Name"
                  aria-label="category-Name "
                  aria-describedby="basic-addon1"
                  {...register("name", RequiredField("Category Name"))}
                />
              </div>
              {errors.name && (
                <span className="text-danger">{errors.name.message}</span>
              )}
            </div>
            <div className="d-flex justify-content-end">
              {" "}
              <Button className="py-2 px-4" variant="success" type="submit">
                Save
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

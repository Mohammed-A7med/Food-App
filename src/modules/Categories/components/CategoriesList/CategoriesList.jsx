import React, { useEffect, useState } from "react";
import Header from "../../../Shared/components/Header/Header";
import imgUrl from "../../../../assets/Imges/Recipes-header.png";
import axios from "axios";
import {
  Authorization,
  CATEGORIES_URLs,
} from "../../../../constans/END_POINTS";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoData from "../../../Shared/components/NoData/NoData";
import DeleteConfirmationModal from "../../../Shared/components/DeleteConfirmationModal/DeleteConfirmationModal";
import { useNavigate } from "react-router-dom";
import PageNavigator from "../../../Shared/components/PageNavigator/PageNavigator";
import CategoryAdd from "../CategoryAdd/CategoryAdd";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { RequiredField } from "../../../../constans/VALIDATIONS";

export default function CategoriesList() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [categoriesList, setCategoriesList] = useState([]);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [categoryItem, setCategoryItem] = useState(null);
  const [categoryId, setCategoryId] = useState(0);
  const [nameInput, setNameInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModel = (categoryId) => {
    setCategoryId(categoryId);
    setShowModal(true);
  };
  const [showModalAdd, setShowModalAdd] = useState(false);
  const handleCloseModalAdd = () => setShowModalAdd(false);
  const handleShowModelAdd = () => setShowModalAdd(true);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const handleCloseModalUpdate = () => setShowModalUpdate(false);
  const handleShowModelUpdate = (categoryItem) => {
    setCategoryItem(categoryItem);
    setValue("name", categoryItem.name);
    setShowModalUpdate(true);
  };

  const getCategoriesList = async (pgNum, pgSize, nameInput) => {
    try {
      const respone = await axios.get(CATEGORIES_URLs.getList, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        params: { pageNumber: pgNum, pageSize: pgSize, name: nameInput },
      });
      setArrayOfPages(
        Array(respone.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setCategoriesList(respone.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async () => {
    try {
      const response = await axios.delete(CATEGORIES_URLs.delete(categoryId), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      getCategoriesList();
      handleCloseModal();
      toast.success("Deleted succefully");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const getNameInput = (input) => {
    setNameInput(input.target.value);
    getCategoriesList(1, 4, input.target.value);
  };

  const updateNewCategory = async (data) => {
    try {
      const response = await axios.put(
        CATEGORIES_URLs.update(categoryItem.id),
        data,
        Authorization
      );
      handleCloseModalUpdate();
      getCategoriesList();
      toast.success("Category updated successfully!");
    } catch (error) {
      toast.error("Failed to update the category. Please try again.");
    }
  };

  useEffect(() => {
    getCategoriesList(1, 4);
  }, []);
  return (
    <>
      <Header
        title={"Categories "}
        secandTitle={"Itmes!"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={imgUrl}
      />

      <DeleteConfirmationModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleDeleteModal={deleteCategory}
        itemName={"Category"}
      />

      <CategoryAdd
        getCategoriesList={getCategoriesList}
        showModalAdd={showModalAdd}
        handleCloseModalAdd={handleCloseModalAdd}
      />

      <Modal show={showModalUpdate} onHide={handleCloseModalUpdate}>
        <Modal.Header closeButton>
          <h5 className="my-auto">Update Category</h5>
        </Modal.Header>
        <Modal.Body>
          <form className="mt-5" onSubmit={handleSubmit(updateNewCategory)}>
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
                update
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* <CategoryUpdate
        getCategoriesList={getCategoriesList}
        showModalUpdate={showModalUpdate}
        handleCloseModalUpdate={handleCloseModalUpdate}
        categoryItem={categoryItem}
      /> */}

      <div className="container-fluid px-4 my-2">
        <div className="row align-items-center py-4">
          <div className="col-12 col-md-6 d-flex justify-content-center">
            <div className="item w-100 px-md-5 text-center text-md-start">
              <h4>Categories Table Details</h4>
              <p className="text-muted">You can check all details</p>
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end">
            <button
              onClick={() => {
                handleShowModelAdd();
              }}
              className="btn btn-success"
            >
              Add New Category
            </button>
          </div>
        </div>
      </div>

      <div className="container-fluid px-4">
        <input
          onChange={getNameInput}
          type="text"
          className="form-control rounded-1 mb-3"
          placeholder="Search by name..."
          aria-label="name-Input"
          aria-describedby="basic-addon1"
        />
      </div>

      <div className="container-fluid table-container px-4 d-flex justify-content-center">
        {categoriesList.length > 0 ? (
          <table className="table-striped overflow-x-hidden">
            <thead className="custom-rounded-header text-center">
              <tr className="">
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th className="table-creationDate" scope="col">Creation Date</th>
                <th scope="col">Modification Date</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="text-center">
              {categoriesList.map((category) => (
                <tr key={category.id}>
                  <th scope="row">{category.id}</th>
                  <td>{category.name}</td>
                  <td className="table-creationDate">{category.creationDate.slice(0, 10)}</td>
                  <td>{category.modificationDate.slice(0, 10)}</td>
                  <td>
                    <button
                      className="border-0 bg-transparent dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-ellipsis"></i>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        <a className="dropdown-item">
                          <i className="mx-2 text-success fa-regular fa-eye"></i>
                          View
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            handleShowModelUpdate(category);
                          }}
                          className="dropdown-item"
                        >
                          <i className="mx-2 text-success fa-regular fa-pen-to-square"></i>
                          Edit
                        </a>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleShowModel(category.id);
                          }}
                          className="dropdown-item"
                        >
                          <i className="mx-2 text-success fa-solid fa-trash-can"></i>
                          Delete
                        </button>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>

      <PageNavigator arrayOfPages={arrayOfPages} getList={getCategoriesList} />
    </>
  );
}

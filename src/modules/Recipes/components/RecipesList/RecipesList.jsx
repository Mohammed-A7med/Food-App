import React, { useContext, useEffect, useState } from "react";
import Header from "../../../Shared/components/Header/Header";
import imgUrl from "../../../../assets/Imges/Recipes-header.png";
import NoData from "../../../Shared/components/NoData/NoData";
import {
  BASE_IMG_URL,
  CATEGORIES_URLs,
  RECIPES_URLs,
  TAG_Api,
  USER_RECIPES_URLs,
} from "../../../../constans/END_POINTS";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteConfirmationModal from "../../../Shared/components/DeleteConfirmationModal/DeleteConfirmationModal";
import { Link, json, useNavigate } from "react-router-dom";
import PageNavigator from "../../../Shared/components/PageNavigator/PageNavigator";
import { AuthContext } from "../../../../context/AuthContext";

export default function RecipesList() {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [recipesList, setRecipesList] = useState([]);
  const [favList, setFavList] = useState([]);
  const [recipeId, setRecipeId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [hearts, setHearts] = useState({});
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const handleCloseModal = () => setShowModal(false);
  const handleShowModel = (recipeId) => {
    setRecipeId(recipeId);
    setShowModal(true);
  };

  const getRecipesList = async (
    pgNum,
    pgSize,
    nameInput,
    tagInput,
    categoryInput
  ) => {
    try {
      const respone = await axios.get(RECIPES_URLs.getList, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        params: {
          pageNumber: pgNum,
          pageSize: pgSize,
          name: nameInput,
          tagId: tagInput,
          categoryId: categoryInput,
        },
      });
      setRecipesList(respone.data.data);
      setArrayOfPages(
        Array(respone.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecipe = async () => {
    try {
      const response = await axios.delete(RECIPES_URLs.delete(recipeId), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      getRecipesList();
      handleCloseModal();
      toast.success("Deleted succefully");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const goToRecipesData = () => {
    navigate("/dashboard/recipes-data");
  };

  const getTagList = async () => {
    try {
      const response = await axios.get(TAG_Api, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      setTagList(response.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const getCategoriesList = async () => {
    try {
      const respone = await axios.get(CATEGORIES_URLs.getList, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      setCategoriesList(respone.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getNameInput = (input) => {
    setNameInput(input.target.value);
    getRecipesList(1, 4, input.target.value, tagInput, categoryInput);
  };

  const getTagInput = (input) => {
    setTagInput(input.target.value);
    getRecipesList(1, 4, nameInput, input.target.value, categoryInput);
  };

  const getCategoryInput = (input) => {
    setCategoryInput(input.target.value);
    getRecipesList(1, 4, nameInput, tagInput, input.target.value);
  };

  const toggleHeart = (recipeId) => {
    setHearts((prevHearts) => ({
      ...prevHearts,
      [recipeId]: !prevHearts[recipeId],
    }));
  };

  const addToFav = async (id) => {
    try {
      const response = await axios.post(
        USER_RECIPES_URLs.addToFav,
        {
          recipeId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      toggleHeart(id);
      setFavList(response.data);
      toast.success("Recipe added to your favorites!");
    } catch (error) {
      toast.error(error.response.data.message) ||
        "Oops! We couldn’t save the recipe to your favorites";
    }
  };


  useEffect(() => {
    getRecipesList(1, 4);
    getCategoriesList();
    getTagList();
  }, []);

  return (
    <>
      <Header
        title={"Recipes "}
        secandTitle={"Itmes!"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={imgUrl}
      />

      <DeleteConfirmationModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleDeleteModal={deleteRecipe}
        itemName={"Recipe"}
      />

      <div className="container-fluid px-4 my-2">
        <div className="row align-items-center py-4">
          <div className="col-12 col-md-6 d-flex justify-content-center">
            <div className="item w-100 px-md-5 text-center text-md-start">
              <h4>Recipe Table Details</h4>
              <p className="text-muted">You can check all details</p>
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end">
            {userData?.userGroup == "SuperAdmin" ? (
              <button
                onClick={goToRecipesData}
                className="btn btn-success px-4"
              >
                Add New Item
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className="container-fluid px-4">
        <div className="row">
          <div className="col-md-7">
            <input
              onChange={getNameInput}
              type="text"
              className="form-control rounded-1 mb-3"
              placeholder="Search by name..."
              aria-label="name-Input"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="col-md-2">
            <select onChange={getTagInput} className="form-control rounded-1">
              <option value="" className="text-muted border-0 ">
                Tag
              </option>
              {tagList.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <select
              onChange={getCategoryInput}
              className="form-control rounded-1 "
            >
              <option value="" className="text-muted border-0 ">
                category
              </option>
              {categoriesList.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="container-fluid table-container px-4 d-flex justify-content-center">
        {recipesList.length > 0 ? (
          <table className="table-striped overflow-x-hidden">
            <thead className="custom-rounded-header text-center">
              <tr>
                <th scope="col">Name</th>
                <th className="table-img" scope="col">
                  Image
                </th>
                <th scope="col">Price</th>
                <th className="table-Description" scope="col">
                  Description
                </th>
                <th className="table-creationDate" scope="col">
                  Discount
                </th>
                <th scope="col">Category</th>
                <th scope="col"></th>
              </tr>
            </thead>

            <tbody className="text-center overflow-x-hidden">
              {recipesList.map((recipe) => (
                <tr key={recipe.id}>
                  <th scope="row">{recipe.name}</th>
                  <td className="table-img">
                    <img
                      className="img-list"
                      src={`${BASE_IMG_URL}/${recipe.imagePath}`}
                      alt=""
                    />
                  </td>
                  <td>{recipe.price}</td>
                  <td className="table-Description">{recipe.description}</td>
                  <td className="table-creationDate">
                    {recipe.creationDate.slice(0, 10)}
                  </td>
                  <td>{recipe.tag.name}</td>
                  {userData?.userGroup == "SuperAdmin" ? (
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
                          <Link
                            to={`/dashboard/recipes-edit/${recipe.id}`}
                            state={{ recipeData: recipe, type: "edit" }}
                            className="dropdown-item"
                          >
                            <i className="mx-2 text-success fa-regular fa-pen-to-square"></i>
                            Edit
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              handleShowModel(recipe.id);
                            }}
                            className="dropdown-item"
                          >
                            <i className="mx-2 text-success fa-solid fa-trash-can"></i>
                            Delete
                          </button>
                        </li>
                      </ul>
                    </td>
                  ) : (
                    <td>
                      <button
                        onClick={() => addToFav(recipe.id)}
                        className={`border-0 bg-transparent`}
                      >
                        <i
                          className={`fa-regular fa-heart ${
                            hearts[recipe.id] ? "fa-solid text-success" : ""
                          }`}
                        ></i>
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>

      <PageNavigator arrayOfPages={arrayOfPages} getList={getRecipesList} />
    </>
  );
}

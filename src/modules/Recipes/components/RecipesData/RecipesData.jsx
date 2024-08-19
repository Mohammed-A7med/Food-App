import React, { useEffect, useState } from "react";
import InfoCard from "../../../Shared/components/InfoCard/InfoCard";
import axios from "axios";
import {
  CATEGORIES_URLs,
  RECIPES_URLs,
  TAG_Api,
} from "../../../../constans/END_POINTS";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { RequiredField } from "../../../../constans/VALIDATIONS";
import { useLocation, useNavigate } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
export default function RecipesData() {
  const [tagList, setTagList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const navigate = useNavigate();
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [tagId, setTagId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const location = useLocation();
  const status = location.state?.type === "edit";
  const resipeData = location.state?.recipeData;
  const [recipeId, setRecipeId] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

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

  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("tagId", data.tagId);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("recipeImage", data.recipeImage);

    return formData;
  };

  const addNewRecipe = async (data) => {
    const resipeData = appendToFormData(data);
    try {
      const response = await axios({
        method: status ? "put" : "post",
        url: status
          ? `https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`
          : ` ${RECIPES_URLs.create}`,
        data: resipeData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      toast.success(
        response.data.message || "New recipe created successfully!"
      );
      goToRecipesList();
      getCategoriesList();
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const goToRecipesList = () => {
    navigate("/dashboard/recipes-List");
  };

  const handleFileChange = (file) => {
    setValue("recipeImage", file, { shouldValidate: true });
  };

  useEffect(() => {
    setRecipeId(resipeData?.id);
    getTagList();
    getCategoriesList();
    if (status && resipeData) {
      setTagId(resipeData.tag.id);
      setCategoryId(resipeData.category[0]?.id);
    }
  }, []);
  return (
    <div className="container-fluid">
      <InfoCard title={"Recipes"} buttonCaption={"All Recipes"} />
      <div className="form-container my-5">
        <form onSubmit={handleSubmit(addNewRecipe)}>
          <div className="row d-flex justify-content-center">
            <div className="col-8">
              <div className="inputGroup mb-3">
                <div className="input-group my-1">
                  <input
                    type="text"
                    className="form-control rounded-1 border-0 bg-recipse-input"
                    placeholder="Recipe Name"
                    aria-label="Recipe-Name"
                    aria-describedby="basic-addon1"
                    {...register("name", RequiredField("Recipe Name"))}
                    defaultValue={status ? resipeData.name : ""}
                  />
                </div>
                {errors.name && (
                  <span className="text-danger">{errors.name.message}</span>
                )}
              </div>
            </div>

            <div className="col-8">
              <div className="inputGroup mb-3">
                <div className="input-group my-1">
                  <select
                    {...register("tagId", RequiredField("tag Id"))}
                    className="form-control rounded-1 border-0 bg-recipse-input"
                    value={tagId}
                    onChange={(e) => setTagId(e.target.value)}
                  >
                    <option disabled>Tag</option>
                    {tagList.map((tag) => (
                      <option key={tag.id} value={tag.id}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                  <i className="input-group-text border-0 bg-recipse-input fa-solid fa-caret-down"></i>
                </div>
                {errors.tagId && (
                  <span className="text-danger">{errors.tagId.message}</span>
                )}
              </div>
            </div>

            <div className="col-8">
              <div className="inputGroup mb-3">
                <div className="input-group my-1">
                  <input
                    type="text"
                    className="form-control rounded-1 border-0 bg-recipse-input"
                    placeholder="350.99"
                    aria-label="price"
                    aria-describedby="basic-addon1"
                    {...register("price", RequiredField("price"))}
                    defaultValue={status ? resipeData.price : ""}
                  />
                  <span className="input-group-text border-0 bg-recipse-input">
                    EGP
                  </span>
                </div>
                {errors.price && (
                  <span className="text-danger">{errors.price.message}</span>
                )}
              </div>
            </div>

            <div className="col-8">
              <div className="inputGroup mb-3">
                <div className="input-group my-1">
                  <select
                    {...register("categoriesIds", RequiredField("category "))}
                    className="form-control rounded-1 border-0 bg-recipse-input"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option disabled>Categ</option>
                    {categoriesList.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.categoriesIds && (
                  <span className="text-danger">
                    {errors.categoriesIds.message}
                  </span>
                )}
              </div>
            </div>

            <div className="col-8">
              <div className="inputGroup mb-3">
                <div className="input-group my-1">
                  <textarea
                    type="text"
                    className="form-control rounded-1 border-0 bg-recipse-input"
                    placeholder="description"
                    aria-label=""
                    aria-describedby="basic-addon1"
                    {...register("description", RequiredField("description"))}
                    defaultValue={status ? resipeData.description : ""}
                  />
                </div>
                {errors.description && (
                  <span className="text-danger">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>

            <div className="col-8 text-center overflow-x-hidden">
              <div className="inputGroup mb-3 Upload-img ">
                <input
                  type="file"
                  accept={fileTypes.join(",")}
                  className="d-none"
                />
                <FileUploader
                  multiple={false}
                  handleChange={handleFileChange}
                  name="file"
                  className="w-100 py-3"
                  label={"Drag & Drop or Choose an Item Image to Upload"}
                  types={fileTypes}
                />
                {errors.recipeImage && (
                  <span className="text-danger">
                    {errors.recipeImage.message}
                  </span>
                )}
              </div>
            </div>

            <div className="btn-submit d-flex justify-content-end align-items-center mt-4">
              <button className="btn btn-outline-success px-4">Cancel</button>
              <button type="submit" className="btn btn-success mx-3 px-4">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

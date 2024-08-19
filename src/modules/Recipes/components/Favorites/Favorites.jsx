import React, { useEffect, useState } from "react";
import Header from "../../../Shared/components/Header/Header";
import imgUrl from "../../../../assets/Imges/Recipes-header.png";
import axios from "axios";
import {
  Authorization,
  BASE_IMG_URL,
  USER_RECIPES_URLs,
} from "../../../../constans/END_POINTS";
import NoData from "../../../Shared/components/NoData/NoData";
import { toast } from "react-toastify";
import PageNavigator from "../../../Shared/components/PageNavigator/PageNavigator";

export default function Favorites() {
  const [favList, setFavList] = useState([]);
  const [arrayOfPages, setArrayOfPages] = useState([]); 
  const [hearts, setHearts] = useState({});
  const getFavList = async () => {
    try {
      const response = await axios.get(
        USER_RECIPES_URLs.getList,
        Authorization
      );
      setFavList(response.data.data);
      setArrayOfPages(
        Array(response.data.totalNumberOfPages).fill.map((_, i) => i + 1)
      );
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const RemoveFromFav = async (favId) => {
    try {
      const response = await axios.delete(
        USER_RECIPES_URLs.removeFromFav(favId),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      getFavList();
      toast.success("Item removed from your favorites successfully!");
    } catch (error) {
      console.log(
        error?.response?.data?.message ||
          "Failed to remove the item from your favorites. Please try again."
      );
    }
  };
  const toggleHeart = (recipeId) => {
    setHearts((prevHearts) => ({
      ...prevHearts,
      [recipeId]: !prevHearts[recipeId],
    }));
  };

  useEffect(() => {
    getFavList();
  }, []);

  return (
    <>
      <Header
        title={"Favorite "}
        secandTitle={"Itmes!"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={imgUrl}
      />

      {favList.length > 0 ? (
        <div className="container-fluid pt-4 px-4">
          <div className="row gy-4">
            {favList.map((fav) => (
              <div key={fav.id} className="col-md-4">
                <div className="card rounded-4 border-0 shadow-sm">
                  <div className="img-fav position-relative">
                    <img
                      src={`${BASE_IMG_URL}/${fav.recipe.imagePath}`}
                      className="card-img-top rounded-4"
                      alt="fav-img"
                    />
                    <div className="icon-layer bg-white position-absolute top-0 end-0 m-3 py-1 px-2 rounded-2 ">
                      <i
                        onClick={() => RemoveFromFav(fav.id)}
                        className={`fa-solid fa-heart text-success  ${
                          hearts[fav.id] ? "fa-regular" : ""
                        }`}
                      ></i>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{fav.recipe.name}</h5>
                    <p className="card-text">{fav.recipe.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <NoData />
      )}

      <PageNavigator arrayOfPages={arrayOfPages} getList={getFavList} />
    </>
  );
}

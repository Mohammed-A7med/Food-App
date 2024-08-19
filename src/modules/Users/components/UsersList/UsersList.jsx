import React, { useEffect, useState } from "react";
import Header from "../../../Shared/components/Header/Header";
import imgUrl from "../../../../assets/Imges/Recipes-header.png";
import NoData from "../../../Shared/components/NoData/NoData";
import { USERS_LIST_URLs } from "../../../../constans/END_POINTS";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteConfirmationModal from "../../../Shared/components/DeleteConfirmationModal/DeleteConfirmationModal";
import PageNavigator from "../../../Shared/components/PageNavigator/PageNavigator";

export default function UsersList() {
  const [usersList, setUsersList] = useState([]);
  const [userId, setUserId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [countryInput, setCountryInput] = useState("");
  const [userRoles, setUserRoles] = useState(["admin", "user"]);
  const [selectedRole, setSelectedRole] = useState("user Role");

  const handleShowModel = (UserId) => {
    setUserId(UserId);
    setShowModal(true);
  };

  const getUsersList = async (
    pgNum,
    pgSize,
    nameInput,
    emailInput,
    countryInput,
    userRoles
  ) => {
    try {
      const response = await axios.get(USERS_LIST_URLs.getList, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        params: {
          pageNumber: pgNum,
          pageSize: pgSize,
          userName: nameInput,
          email: emailInput,
          country: countryInput,
          groups: userRoles,
        },
      });
      const totalNumberOfPages = response.data.totalNumberOfPages;
      let pages = Array(totalNumberOfPages)
        .fill()
        .map((_, i) => i + 1);
      if (totalNumberOfPages > 26) {
        pages = pages.slice(0, 5);
      }
      setArrayOfPages(pages);
      setUsersList(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getUsersList(1, 4);
  }, []);

  

  const deleteUser = async () => {
    try {
      const response = await axios.delete(USERS_LIST_URLs.delete(userId), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      getUsersList();
      handleCloseModal();
      toast.success(response.data.message || "Deleted succefully");
    } catch (error) {
      toast.error(error.message || "Cannot delete admin account");
    }
  };

  const getNameInput = (input) => {
    setNameInput(input.target.value);
    getUsersList(1, 4, input.target.value);
  };

  const getEmailInput = (input) => {
    setEmailInput(input.target.value);
    getUsersList(1, 4, nameInput, input.target.value);
  };

  const getCountryInput = (input) => {
    setCountryInput(input.target.value);
    getUsersList(1, 4, nameInput, emailInput, input.target.value);
  };

  const handleRoleChange = (event) => {
    const role = event.target.value;
    setSelectedRole(role);
    if (role === "admin") {
      getUsersList(1, 4, nameInput, emailInput, countryInput, 1);
    } else if (role === "user") {
      getUsersList(1, 4, nameInput, emailInput, countryInput, 2);
    }
  };


  return (
    <>
      <Header
        title={"Users "}
        secandTitle={"List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={imgUrl}
      />

      <DeleteConfirmationModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleDeleteModal={deleteUser}
        itemName={"User"}
      />

      <div className="container-fluid px-4 my-2">
        <div className="row align-items-center py-4">
          <div className="col-12 col-md-6 d-flex justify-content-center">
            <div className="item w-100 px-md-5 text-center text-md-start">
              <h4>Users Table Details</h4>
              <p className="text-muted">You can check all details</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid px-4">
        <div className="row">
          <div className="col-md-6">
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
            <input
              onBlur={getEmailInput}
              type="text"
              className="form-control rounded-1 mb-3"
              placeholder="Search by email..."
              aria-label="email-Input"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="col-md-2">
            <input
              onChange={getCountryInput}
              type="text"
              className="form-control rounded-1 mb-3"
              placeholder="Search by country"
              aria-label="Country-Input"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-control rounded-1 mb-3"
              value={selectedRole}
              onChange={handleRoleChange}
            >
              <option disabled>user Role</option>
              {userRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="container-fluid table-container px-4 d-flex justify-content-center">
        {usersList.length > 0 ? (
          <table className="table-striped overflow-x-hidden">
            <thead className="custom-rounded-header text-center">
              <tr>
                <th scope="col">User Name</th>
                <th className="table-email" scope="col">Email</th>
                <th scope="col">country</th>
                <th scope="col">Creation Date</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="text-center overflow-x-hidden">
              {usersList.map((user) => (
                <tr key={user.id}>
                  <th scope="row">{user.userName}</th>
                  <td className="table-email">{user.email}</td>
                  <td>{user.country}</td>
                  <td>{user.creationDate.slice(0, 10)}</td>
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
                        <a className="dropdown-item" href="#">
                          <i className="mx-2 text-success fa-regular fa-eye"></i>
                          View
                        </a>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleShowModel(user.id);
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

      <PageNavigator arrayOfPages={arrayOfPages} getList={getUsersList} />
    </>
  );
}

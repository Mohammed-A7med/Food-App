import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Login from "./modules/Authentication/components/Login/Login";
import Register from "./modules/Authentication/components/Register/Register";
import ResetPass from "./modules/Authentication/components/ResetPass/ResetPass";
import ForgetPass from "./modules/Authentication/components/ForgetPass/ForgetPass";
import AuthLayout from "./modules/Shared/components/AuthLayout/AuthLayout";
import MasterLayout from "./modules/Shared/components/MasterLayout/MasterLayout";
import NotFound from "./modules/Shared/components/NotFound/NotFound";
import Home from "./modules/Home/components/Home/Home";
import Header from "./modules/Shared/components/Header/Header";
import SideBar from "./modules/Shared/components/SideBar/SideBar";
import Navbar from "./modules/Shared/components/Navbar/Navbar";
import CategoriesList from "./modules/Categories/components/CategoriesList/CategoriesList";
import RecipesList from "./modules/Recipes/components/RecipesList/RecipesList";
import UsersList from "./modules/Users/components/UsersList/UsersList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./modules/Shared/components/ProtectedRoute/ProtectedRoute";
import "./App.css";
import RecipesData from "./modules/Recipes/components/RecipesData/RecipesData";
import AccountVerify from "./modules/Authentication/components/AccountVerify/AccountVerify";
import ChangePass from "./modules/Shared/components/ChangePass/ChangePass";
import Favorites from "./modules/Recipes/components/Favorites/Favorites";

function App() {
  const routes = createHashRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "forget-password", element: <ForgetPass /> },
        { path: "register", element: <Register /> },
        { path: "reset-password", element: <ResetPass /> },
        { path: "account-verify", element: <AccountVerify /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "header", element: <Header /> },
        { path: "navbar", element: <Navbar /> },
        { path: "sideBar", element: <SideBar /> },
        { path: "categories-List", element: <CategoriesList /> },
        { path: "recipes-List", element: <RecipesList /> },
        { path: "recipes-data", element: <RecipesData /> },
        { path: "recipes-edit/:id", element: <RecipesData /> },
        { path: "users-List", element: <UsersList /> },
        { path: "favorites", element: <Favorites /> },
        { path: "change-password", element: <ChangePass /> },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;

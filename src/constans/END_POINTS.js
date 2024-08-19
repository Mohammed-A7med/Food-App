const BASE_URLS = "https://upskilling-egypt.com:3006/api/v1";

export const BASE_IMG_URL = "https://upskilling-egypt.com:3006";

//USERS urls
const BASE_USERS = `${BASE_URLS}/Users`;

export const USERS_URLs = {
  login: `${BASE_USERS}/Login`,
  resetRequest: `${BASE_USERS}/Reset/Request`,
  reset: `${BASE_USERS}/Reset`,
  register: `${BASE_USERS}/Register`,
  verify: `${BASE_USERS}/verify`,
  ChangePassword: `${BASE_USERS}/ChangePassword`,
};

//CATEGORIES urls
const BASE_CATEGORIES = `${BASE_URLS}/Category`;

export const CATEGORIES_URLs = {
  getList: `${BASE_CATEGORIES}`,
  delete: (id) => `${BASE_CATEGORIES}/${id}`,
  create: `${BASE_CATEGORIES}`,
  update: (id) => `${BASE_CATEGORIES}/${id}`,
};

//RECIPES urls
const BASE_RECIPES = `${BASE_URLS}/Recipe`;

export const RECIPES_URLs = {
  getList: `${BASE_RECIPES}`,
  delete: (id) => `${BASE_RECIPES}/${id}`,
  create: `${BASE_RECIPES}`,
};

//USERSLIST urls
const BASE_USERS_LIST = `${BASE_URLS}/Users`;

export const USERS_LIST_URLs = {
  getList: `${BASE_USERS_LIST}`,
  delete: (id) => `${BASE_USERS_LIST}/${id}`,
};

// USER RECIPES
const BASE_USER_RECIPES = `${BASE_URLS}/userRecipe`;

export const USER_RECIPES_URLs = {
  getList: `${BASE_USER_RECIPES}`,
  addToFav: `${BASE_USER_RECIPES}`,
  removeFromFav: (id) => `${BASE_USER_RECIPES}/${id}`,
};

export const TAG_Api = `${BASE_URLS}/tag`;

export const Authorization = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  },
};

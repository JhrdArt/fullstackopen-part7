import axios from "axios";
const URL = "http://localhost:3001/api/users";

let token = null;

const setUser = (user) => {
  window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
  token = user.token;
};

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    console.log("user parse: ", user);
    token = user.token;
    return user;
  }

  return null;
};

const clearUser = () => {
  localStorage.clear();
  token = null;
};

const getToken = () => token;

const getAll = async () => {
  const response = await axios.get(URL);
  return response.data;
};

export default { getUser, getAll, setUser, clearUser, getToken };

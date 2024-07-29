import axios from "axios";
import userServices from "./user.services";
const URL = "http://localhost:3001/api/blogs";

const config = () => {
  return {
    headers: {
      Authorization: `bearer ${userServices.getToken()}`,
    },
  };
};

const getAll = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error(`Error to connect to MongoDB ${error}`);
  }
};

// let token = null;

// const setToken = (newToken) => {
//   token = `bearer ${newToken}`;
// };

const create = async (newObject) => {
  const response = await axios.post(URL, newObject, config());
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${URL}/${id}`, newObject);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${URL}/${id}`, config());
  return response.data;
};

const addComment = async (id, comment) => {
  const response = await axios.post(`${URL}/${id}/comments`, { comment });
  return response.data;
};

export default { getAll, create, remove, update, addComment };

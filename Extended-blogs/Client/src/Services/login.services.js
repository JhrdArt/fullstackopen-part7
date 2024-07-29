import axios from "axios";
const URL = "http://localhost:3001/api/login";

const login = async (credentials) => {
  const response = await axios.post(URL, credentials);
  console.log("response", response);
  return response.data;
};

export default { login };

import { createSlice } from "@reduxjs/toolkit";

import loginServices from "../Services/login.services";
import userServices from "../Services/user.services";
import { createNotification } from "./notificationReducer";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return action.payload;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const { username, password } = credentials;
    try {
      const user = await loginServices.login({
        username,
        password,
      });

      userServices.setUser(user);
      dispatch(login(user));
      dispatch(
        createNotification(
          {
            message: `Welcome ${user.name}! 😊`,
            type: "success",
          },
          5
        )
      );
    } catch (error) {
      dispatch(
        createNotification(
          {
            message: error.response && error.response.data.error,
            type: "error",
          },
          5
        )
      );
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    userServices.clearUser();
    dispatch(logout(null));
  };
};

export default loginSlice.reducer;

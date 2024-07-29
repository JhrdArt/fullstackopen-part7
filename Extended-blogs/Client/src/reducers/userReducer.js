import { createSlice } from "@reduxjs/toolkit";
import userServices from "../Services/user.services";

const userSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;

export const initializeUser = () => {
  return async (dispatch) => {
    const user = await userServices.getAll();
    dispatch(setUsers(user));
  };
};

export default userSlice.reducer;

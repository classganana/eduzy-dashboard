import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    firstName: null,
    lastName: null,
    email: null,
  },
  reducers: {
    addUser() {},
    updateUser() {},
    removeUser() {},
  },
});

export const { addUser, removeUser, updateUser } = userSlice.actions;

export default userSlice.reducer;

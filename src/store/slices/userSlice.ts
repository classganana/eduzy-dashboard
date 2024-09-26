import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    firstName: "Eduzy",
    lastName: "User",
    email: "eduzy.user@eduzy.in",
    schoolId: "2",
  },
  reducers: {
    addUser() {},
    updateUser() {},
    removeUser() {},
  },
});

export const { addUser, removeUser, updateUser } = userSlice.actions;

export default userSlice.reducer;

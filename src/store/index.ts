import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

export const applicationStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default applicationStore;

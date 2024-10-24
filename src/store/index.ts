import { configureStore } from "@reduxjs/toolkit";

import assessmentReducer from "./slices/assessmentSlice";
import chaptersReducer from "./slices/chaptersSlice";
import userReducer from "./slices/userSlice";

export const applicationStore = configureStore({
  reducer: {
    user: userReducer,
    assessments: assessmentReducer,
    chapters: chaptersReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof applicationStore;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type
export type AppDispatch = AppStore["dispatch"];

export default applicationStore;

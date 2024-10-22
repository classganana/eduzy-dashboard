import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  userId: string;
  role: string;
  schoolId: string;
}

const initialState: UserInfo = {
  userId: "",
  role: "",
  schoolId: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      const { userId, role, schoolId } = action.payload;

      state.userId = userId;
      state.role = role;
      state.schoolId = schoolId;
    },
    resetUserInfo(state) {
      state.userId = "";
      state.role = "";
      state.schoolId = "";
    },
  },
  selectors: {},
});

export const { setUserInfo, resetUserInfo } = userSlice.actions;

export default userSlice.reducer;

import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { RootState } from "..";

import { ApiService } from "@/lib/services/api-service";

interface UserInfo {
  loading: boolean;
  data: {
    userId: string;
    accountStatus: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
    email: string;
    role: string;
    classes: {
      board: string;
      class: string;
      subject: string;
      sections: string[];
    }[];
    schoolId: string;
    userName: string;
  };
}

const initialState: UserInfo = {
  loading: false,
  data: {
    userId: "",
    accountStatus: "pending",
    role: "",
    schoolId: "",
    firstName: "",
    lastName: "",
    phoneNumber: 0,
    email: "",
    classes: [],
    userName: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: JSON.parse(JSON.stringify(initialState)),
  reducers: {
    setUserInfo(state, action: PayloadAction<UserInfo["data"]>) {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    resetUserInfo(state) {
      state.data = initialState.data;
    },
  },
  selectors: {},
  extraReducers: (builder: ActionReducerMapBuilder<UserInfo>) => {
    /* Fetch Assessments */
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUserDetails.rejected, (state, _action) => {
      state.loading = false;
      state.data = initialState.data;
    });
  },
});

export const fetchUserDetails = createAsyncThunk(
  "assessments/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const apiService = ApiService.getInstance();
      const userInfo = await apiService.getUserDetails();

      return userInfo || {}; // Return empty array if null
    } catch (error: any) {
      console.error(error);

      return rejectWithValue(error.message); // Reject with error message
    }
  },
);

export const { setUserInfo, resetUserInfo } = userSlice.actions;
export const selectUserDetails = (state: RootState) => state.user.data;

export default userSlice.reducer;

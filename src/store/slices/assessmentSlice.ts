import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { ApiService } from "@/lib/services/api-service";
import { Assessment } from "@/types";

interface AssessmentState {
  data: Assessment[];
  loading: boolean;
}

const assessments: AssessmentState = {
  data: [],
  loading: false,
};

const assessmentSlice = createSlice({
  name: "assessments",
  initialState: assessments,
  reducers: {
    createAssessment() {},
    updateAssessment() {},
    removeAssessment() {},
  },
  extraReducers: (builder: ActionReducerMapBuilder<AssessmentState>) => {
    /* Fetch Assessments */
    builder.addCase(fetchAssessments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAssessments.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAssessments.rejected, (state, _action) => {
      state.loading = false;
      state.data = [];
    });
  },
});

export const fetchAssessments = createAsyncThunk(
  "assessments/fetchAssessments",
  async (_, { rejectWithValue }) => {
    try {
      const apiService = ApiService.getInstance();
      const assessments = await apiService.getAssessments();

      return assessments || []; // Return empty array if null
    } catch (error: any) {
      return rejectWithValue(error.message); // Reject with error message
    }
  },
);

export const { createAssessment, removeAssessment, updateAssessment } =
  assessmentSlice.actions;

export default assessmentSlice.reducer;

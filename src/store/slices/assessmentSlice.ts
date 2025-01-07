import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
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
    addAssessment(state, action: PayloadAction<Assessment>) {
      state.data.push(action.payload);
    },
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

      console.log(assessments);

      return assessments || []; // Return empty array if null
    } catch (error: any) {
      console.error(error);

      return rejectWithValue(error.message); // Reject with error message
    }
  },
  // {
  //   condition: (_arg, { getState }) => {
  //     const state = getState() as any;

  //     // Prevent API call if list is already populated
  //     return state.assessments.data.length === 0;
  //   },
  // },
);

export const { removeAssessment, updateAssessment, addAssessment } =
  assessmentSlice.actions;

export default assessmentSlice.reducer;

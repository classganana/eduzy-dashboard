import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch, RootState } from "..";

import { ApiService } from "@/lib/services/api-service";
import { Assessment, AssessmentFilter } from "@/types";

interface AssessmentState {
  data: Assessment[];
  loading: boolean;
  currentFilter: AssessmentFilter;
}

const initialState: AssessmentState = {
  data: [],
  loading: false,
  currentFilter: {
    board: "",
    class: "",
    section: "",
    subject: "",
  },
};

export const fetchAssessments = createAsyncThunk<
  Assessment[],
  void,
  { state: RootState }
>("assessments/fetchAssessments", async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const apiService = ApiService.getInstance();
    const assessments = await apiService.getAssessments(
      state.assessments.currentFilter,
    );

    return assessments || [];
  } catch (error: any) {
    console.error(error);

    return rejectWithValue(error.message);
  }
});

export const updateFilterAndFetch = createAsyncThunk<
  void,
  AssessmentFilter,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("assessments/updateFilterAndFetch", async (filter, { dispatch }) => {
  dispatch(setFilter(filter));
  dispatch(fetchAssessments());
});

const assessmentSlice = createSlice({
  name: "assessments",
  initialState,
  reducers: {
    addAssessment(state, action: PayloadAction<Assessment>) {
      state.data.push(action.payload);
    },
    updateAssessment() {},
    removeAssessment() {},
    setFilter(state, action: PayloadAction<AssessmentFilter>) {
      state.currentFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAssessments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAssessments.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAssessments.rejected, (state) => {
      state.loading = false;
      state.data = [];
    });
  },
});

export const { removeAssessment, updateAssessment, addAssessment, setFilter } =
  assessmentSlice.actions;

export const selectFilter = (state: RootState) =>
  state.assessments.currentFilter;

export default assessmentSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "..";

import { ApiService } from "@/lib/services/api-service";
import { Report } from "@/types";

interface ReportState {
  data: Record<string, Report>;
  loading: boolean;
  error: string;
}

const initialState: ReportState = {
  data: {},
  loading: false,
  error: "",
};

export const fetchAssessmentReport = createAsyncThunk<
  { report: Omit<Report, "students">; assessmentId: string },
  string,
  { state: RootState }
>(
  "reports/fetchAssessmentReport",
  async (assessmentId, { rejectWithValue }) => {
    try {
      const apiService = ApiService.getInstance();
      const report = await apiService.getReportByAssessmentId(assessmentId);

      return { report, assessmentId };
    } catch (error: any) {
      console.error(error);

      return rejectWithValue(error.message);
    }
  },
);

export const fetchAssessmentReportStudents = createAsyncThunk<
  { reportStudents: Report["students"]; assessmentId: string },
  string,
  { state: RootState }
>(
  "reports/fetchAssessmentReportStudents",
  async (assessmentId, { rejectWithValue }) => {
    try {
      const apiService = ApiService.getInstance();
      const reports =
        await apiService.getReportStudentsByAssessmentId(assessmentId);

      return { reportStudents: reports || [], assessmentId };
    } catch (error: any) {
      console.error(error);

      return rejectWithValue(error.message);
    }
  },
);

const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    addReport(state, action: PayloadAction<Report>) {},
    updateReport() {},
    removeReport() {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAssessmentReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAssessmentReport.fulfilled, (state, action) => {
      state.data[action.payload.assessmentId] = action.payload.report;
      state.loading = false;
    });
    builder.addCase(fetchAssessmentReport.rejected, (state, action) => {
      state.loading = false;
      console.error("Error fetching assessment report");
      state.error = action?.error?.message ?? "Something went wrong";
    });
    builder.addCase(fetchAssessmentReportStudents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchAssessmentReportStudents.fulfilled,
      (state, action) => {
        state.data[action.payload.assessmentId] =
          state.data[action.payload.assessmentId] || {};

        state.data[action.payload.assessmentId].students =
          action.payload.reportStudents;

        state.loading = false;
      },
    );
    builder.addCase(fetchAssessmentReportStudents.rejected, (state, action) => {
      state.loading = false;
      console.error("Error fetching assessment report students");
      state.error = action?.error?.message ?? "Something went wrong";
    });
  },
});

export const { removeReport, updateReport, addReport } = reportSlice.actions;

export const selectReportStudents = (state: RootState, assessmentId: string) =>
  state.report.data[assessmentId].students || [];

export const selectReportDetails = (state: RootState, assessmentId: string) =>
  state.report.data[assessmentId];

export const selectReportingLoading = (state: RootState) =>
  state.report.loading;

export const selectReportError = (state: RootState) => state.report.error;

export default reportSlice.reducer;

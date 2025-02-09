import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "..";

import { ApiService } from "@/lib/services/api-service";
import { Report } from "@/types";

interface ReportState {
  data: Record<string, Report>;
  loading: boolean;
  error: string;
  wronglyAnsweredLoading: boolean;
  studentsLoading: boolean;
}

const initialState: ReportState = {
  data: {},
  loading: false,
  error: "",
  wronglyAnsweredLoading: false,
  studentsLoading: false,
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
  {
    condition: (assessmentId, { getState }) => {
      const { report } = getState();

      if (report.data?.[assessmentId]?.students?.length) {
        return false;
      }

      return true;
    },
  },
);

export const fetchAssessmentReportWronglyAnsweredQuestions = createAsyncThunk<
  { reportWronglyAnswered: Report["wronglyAnswered"]; assessmentId: string },
  string,
  { state: RootState }
>(
  "reports/fetchAssessmentReportWronglyAnswered",
  async (assessmentId, { rejectWithValue }) => {
    try {
      const apiService = ApiService.getInstance();
      const wronglyAnswered =
        await apiService.getReportWronglyAnsweredByAssessmentId(assessmentId);

      return { reportWronglyAnswered: wronglyAnswered || [], assessmentId };
    } catch (error: any) {
      console.error(error);

      return rejectWithValue(error.message);
    }
  },
  {
    condition: (assessmentId, { getState }) => {
      const { report } = getState();

      if (report.data?.[assessmentId]?.wronglyAnswered?.length) {
        return false;
      }

      return true;
    },
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
      state.studentsLoading = true;
    });
    builder.addCase(
      fetchAssessmentReportStudents.fulfilled,
      (state, action) => {
        state.data[action.payload.assessmentId] =
          state.data[action.payload.assessmentId] || {};

        state.data[action.payload.assessmentId].students =
          action.payload.reportStudents;

        state.studentsLoading = false;
      },
    );
    builder.addCase(fetchAssessmentReportStudents.rejected, (state, action) => {
      state.studentsLoading = false;
      console.error("Error fetching assessment report students");
      state.error = action?.error?.message ?? "Something went wrong";
    });

    builder.addCase(
      fetchAssessmentReportWronglyAnsweredQuestions.pending,
      (state) => {
        state.wronglyAnsweredLoading = true;
      },
    );
    builder.addCase(
      fetchAssessmentReportWronglyAnsweredQuestions.fulfilled,
      (state, action) => {
        state.data[action.payload.assessmentId] =
          state.data[action.payload.assessmentId] || {};

        state.data[action.payload.assessmentId].wronglyAnswered =
          action.payload.reportWronglyAnswered;

        state.wronglyAnsweredLoading = false;
      },
    );
    builder.addCase(
      fetchAssessmentReportWronglyAnsweredQuestions.rejected,
      (state, action) => {
        state.wronglyAnsweredLoading = false;
        console.error(
          "Error fetching assessment report wrongly answered questions",
        );
        state.error = action?.error?.message ?? "Something went wrong";
      },
    );
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

export const selectReportStudentsLoading = (state: RootState) =>
  state.report.studentsLoading;

export const selectReportWronglyAnsweredLoading = (state: RootState) =>
  state.report.wronglyAnsweredLoading;

export const selectReportWronglyAnswered = (state: RootState) =>
  state.report.data?.wronglyAnswered;

export default reportSlice.reducer;

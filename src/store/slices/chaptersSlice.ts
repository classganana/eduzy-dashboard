import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { ApiService } from "@/lib/services/api-service";
import { Chapters } from "@/types";

interface ChapterState {
  data: Chapters | null;
  loading: boolean;
}

const chapters: ChapterState = {
  data: null,
  loading: false,
};

const chapterSlice = createSlice({
  name: "chapters",
  initialState: chapters,
  reducers: {
    createChapter() {},
    updateChapter() {},
    removeChapter() {},
  },
  extraReducers: (builder: ActionReducerMapBuilder<ChapterState>) => {
    /* Fetch Chapters */
    builder.addCase(fetchChapters.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchChapters.fulfilled, (state, action) => {
      if (action.payload) state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchChapters.rejected, (state, _action) => {
      state.loading = false;
      state.data = null;
    });
  },
});

export const fetchChapters = createAsyncThunk(
  "chapters/fetchChapters",
  async (
    { classId, subjectId }: { classId: string; subjectId: string },
    { rejectWithValue },
  ) => {
    try {
      const apiService = ApiService.getInstance();
      const response = await apiService.getChapters(classId, subjectId);

      return response; // Return empty array if null
    } catch (error: any) {
      return rejectWithValue(error.message); // Reject with error message
    }
  },
);

export const { createChapter, removeChapter, updateChapter } =
  chapterSlice.actions;

export default chapterSlice.reducer;

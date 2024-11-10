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
  loadingQuestions: boolean;
}

const chapters: ChapterState = {
  data: null,
  loading: false,
  loadingQuestions: false,
};

const chapterSlice = createSlice({
  name: "chapters",
  initialState: chapters,
  selectors: {
    getChaptersByIds(state: ChapterState, chapterIds: string[]) {
      return state.data?.chapters.filter((chapter) =>
        chapterIds.includes(chapter.id),
      );
    },
  },
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

    /* Fetch Questions */
    builder.addCase(fetchQuestions.pending, (state) => {
      state.loadingQuestions = true;
    });
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      if (action.payload?.chapters && action.payload.chapters.length > 0) {
        for (const [index, chapter] of (
          state.data?.chapters ?? []
        )?.entries()) {
          if (
            state.data?.chapters?.length &&
            action.payload?.chapters?.some((c) => c.chapterId === chapter.id)
          ) {
            state.data.chapters[index].questions =
              action.payload.chapters[index].questions;
          }
        }
        state.loadingQuestions = false;
      }
    });
    builder.addCase(fetchQuestions.rejected, (state, _action) => {
      state.loadingQuestions = false;
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

export const fetchQuestions = createAsyncThunk(
  "chapters/fetchQuestions",
  async (
    {
      classId,
      subjectId,
      chapterIds,
    }: {
      classId: string;
      subjectId: string;
      chapterIds: string[];
    },
    { rejectWithValue },
  ) => {
    try {
      const apiService = ApiService.getInstance();
      const response = await apiService.getQuestions(
        classId,
        subjectId,
        chapterIds,
      );

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const { createChapter, removeChapter, updateChapter } =
  chapterSlice.actions;

export const { getChaptersByIds } = chapterSlice.selectors;

export default chapterSlice.reducer;

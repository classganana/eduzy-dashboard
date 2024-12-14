import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import { ApiService } from "@/lib/services/api-service";
import { Chapter, Chapters } from "@/types";

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
      return (
        state.data?.chapters.filter((chapter) =>
          chapterIds.includes(chapter.id),
        ) ?? []
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
        state.data?.chapters?.forEach((chapter: Chapter, index) => {
          const findChapter = action.payload?.chapters?.find(
            (c) => c.chapterId === chapter.id,
          );

          if (state.data?.chapters?.length && findChapter) {
            state.data.chapters[index].questions = findChapter.questions;
          }
        });

        state.loadingQuestions = false;
      }
    });
    builder.addCase(fetchQuestions.rejected, (state, _action) => {
      state.loadingQuestions = false;
    });
  },
});

export const getChaptersByIdsSelector = createSelector(
  (state) => {
    return state.chapters.data?.chapters;
  },
  (chapters) => (ids: string[]) => {
    if (!chapters) return [];

    return ids
      .map((id) => chapters.find((chapter: Chapter) => chapter.id === id))
      .filter(Boolean) as Chapter[];
  },
);

export const fetchChapters = createAsyncThunk(
  "chapters/fetchChapters",
  async (
    {
      classId,
      subjectId,
      boardId,
    }: { classId: string; subjectId: string; boardId: string },
    { rejectWithValue },
  ) => {
    try {
      const apiService = ApiService.getInstance();
      const response = await apiService.getChapters(
        classId,
        subjectId,
        boardId,
      );

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
      boardId,
      chapterIds,
    }: {
      classId: string;
      subjectId: string;
      boardId: string;
      chapterIds: string[];
    },
    { rejectWithValue },
  ) => {
    try {
      const apiService = ApiService.getInstance();
      const response = await apiService.getQuestions(
        classId,
        subjectId,
        boardId,
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

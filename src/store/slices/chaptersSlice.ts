import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Chapter } from "@/types";

const chapters: Chapter[] = [];

const chapterSlice = createSlice({
  name: "chapterSlice",
  initialState: chapters,
  reducers: {
    initializeChapters(
      state,
      action: PayloadAction<{
        classId: string;
        boardId: string;
        subjectId: string;
        schoolId: string;
      }>,
    ) {
      /* Get from some api call and assign */
      console.log(state);
      // TODO: integrate api
      const chapters = [
        {
          chapterId: "1",
          chapterName: "Chapter 1",
          questions: [
            {
              chapterId: "1",
              questionId: "1",
              question: "What is the capital of India?",
              options: [
                {
                  option: "Delhi",
                },
                {
                  option: "Mumbai",
                },
                {
                  option: "Chennai",
                },
                {
                  option: "Kolkata",
                },
              ],
              answer: "Delhi",
            },
            {
              chapterId: "1",
              questionId: "2",
              question: "What is the capital of France?",
              options: [
                {
                  option: "Paris",
                },
                {
                  option: "London",
                },
                {
                  option: "Berlin",
                },
                {
                  option: "Rome",
                },
              ],
              answer: "Paris",
            },
          ],
          classId: action.payload.classId,
          boardId: action.payload.boardId,
          subjectId: action.payload.subjectId,
          schoolId: action.payload.schoolId,
        },
        {
          chapterId: "2",
          chapterName: "Chapter 2",
          questions: [
            {
              chapterId: "2",
              questionId: "1",
              question: "What is the capital of India?",
              options: [
                {
                  option: "Delhi",
                },
                {
                  option: "Mumbai",
                },
                {
                  option: "Chennai",
                },
                {
                  option: "Kolkata",
                },
              ],
              answer: "Delhi",
            },
            {
              chapterId: "2",
              questionId: "2",
              question: "What is the capital of France?",
              options: [
                {
                  option: "Paris",
                },
                {
                  option: "London",
                },
                {
                  option: "Berlin",
                },
                {
                  option: "Rome",
                },
              ],
              answer: "Paris",
            },
          ],
          classId: action.payload.classId,
          boardId: action.payload.boardId,
          subjectId: action.payload.subjectId,
          schoolId: action.payload.schoolId,
        },
      ];

      return chapters;
    },

    /* Complete these methods if required. */
    addChapter() {},
    updateChapter() {},
    removeChapter() {},

    removeQuestion() {},
    addQuestion() {},
    updateQuestion() {},
  },
});

export const {
  addChapter,
  removeChapter,
  updateChapter,
  addQuestion,
  removeQuestion,
  updateQuestion,
} = chapterSlice.actions;

export default chapterSlice.reducer;

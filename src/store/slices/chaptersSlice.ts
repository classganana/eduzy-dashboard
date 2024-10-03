import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Chapter } from "@/types";

const chapters: Chapter[] = [];

const chapterSlice = createSlice({
  name: "chapterSlice",
  initialState: chapters,
  reducers: {
    fetchChapters(
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
          id: "c1",
          name: "Chapter 1",
          questions: [
            {
              id: "q1",
              question: "What is the capital of India?",
              options: [
                {
                  option: "Delhi",
                  id: "o1",
                },
                {
                  option: "Mumbai",
                  id: "o2",
                },
                {
                  option: "Chennai",
                  id: "o3",
                },
                {
                  option: "Kolkata",
                  id: "o4",
                },
              ],
              answer: {
                option: "Delhi",
                id: "o1",
              },
            },
            {
              id: "q2",
              question: "What is the capital of France?",
              options: [
                {
                  option: "Paris",
                  id: "o1",
                },
                {
                  option: "London",
                  id: "o2",
                },
                {
                  option: "Berlin",
                  id: "o3",
                },
                {
                  option: "Rome",
                  id: "o4",
                },
              ],
              answer: {
                option: "Paris",
                id: "o1",
              },
            },
          ],
          description:
            "lorem ipsum dolor sit amet cons ectetur adipiscing elit",
          classId: action.payload.classId,
          boardId: action.payload.boardId,
          subjectId: action.payload.subjectId,
          schoolId: action.payload.schoolId,
        },
        {
          id: "c2",
          name: "Chapter 2",
          questions: [
            {
              id: "q1",
              question: "What is the capital of India?",
              options: [
                {
                  option: "Delhi",
                  id: "o1",
                },
                {
                  option: "Mumbai",
                  id: "o2",
                },
                {
                  option: "Chennai",
                  id: "o3",
                },
                {
                  option: "Kolkata",
                  id: "o4",
                },
              ],
              answer: {
                option: "Delhi",
                id: "o1",
              },
            },
            {
              id: "q2",
              question: "What is the capital of France?",
              options: [
                {
                  option: "Paris",
                  id: "o1",
                },
                {
                  option: "London",
                  id: "o2",
                },
                {
                  option: "Berlin",
                  id: "o3",
                },
                {
                  option: "Rome",
                  id: "o4",
                },
              ],
              answer: {
                option: "Paris",
                id: "o1",
              },
            },
          ],
          description:
            "lorem ipsum dolor sit amet cons ectetur adipiscing elit",
          classId: action.payload.classId,
          boardId: action.payload.boardId,
          subjectId: action.payload.subjectId,
          schoolId: action.payload.schoolId,
        },
        {
          id: "c3",
          name: "Chapter 3",
          questions: [
            {
              id: "q1",
              question: "What is the capital of India?",
              options: [
                {
                  option: "Delhi",
                  id: "o1",
                },
                {
                  option: "Mumbai",
                  id: "o2",
                },
                {
                  option: "Chennai",
                  id: "o3",
                },
                {
                  option: "Kolkata",
                  id: "o4",
                },
              ],
              answer: {
                option: "Delhi",
                id: "o1",
              },
            },
            {
              id: "q2",
              question: "What is the capital of France?",
              options: [
                {
                  option: "Paris",
                  id: "o1",
                },
                {
                  option: "London",
                  id: "o2",
                },
                {
                  option: "Berlin",
                  id: "o3",
                },
                {
                  option: "Rome",
                  id: "o4",
                },
              ],
              answer: {
                option: "Paris",
                id: "o1",
              },
            },
          ],
          description:
            "lorem ipsum dolor sit amet cons ectetur adipiscing elit",
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
  fetchChapters,
  addChapter,
  removeChapter,
  updateChapter,
  addQuestion,
  removeQuestion,
  updateQuestion,
} = chapterSlice.actions;

export default chapterSlice.reducer;

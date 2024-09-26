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
          id: "1",
          name: "Chapter 1",
          questions: [
            {
              id: "1",
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
              id: "1",
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
          description:
            "lorem ipsum dolor sit amet cons ectetur adipiscing elit",
          classId: action.payload.classId,
          boardId: action.payload.boardId,
          subjectId: action.payload.subjectId,
          schoolId: action.payload.schoolId,
        },
        {
          id: "2",
          name: "Chapter 2",
          questions: [
            {
              id: "2",
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
              id: "2",
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
          description:
            "lorem ipsum dolor sit amet cons ectetur adipiscing elit",
          classId: action.payload.classId,
          boardId: action.payload.boardId,
          subjectId: action.payload.subjectId,
          schoolId: action.payload.schoolId,
        },
        {
          id: "2",
          name: "Chapter 2",
          questions: [
            {
              id: "2",
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
              id: "2",
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
          description:
            "lorem ipsum dolor sit amet cons ectetur adipiscing elit",
          classId: action.payload.classId,
          boardId: action.payload.boardId,
          subjectId: action.payload.subjectId,
          schoolId: action.payload.schoolId,
        },
        {
          id: "2",
          name: "Chapter 2",
          questions: [
            {
              id: "2",
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
              id: "2",
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
          description:
            "lorem ipsum dolor sit amet cons ectetur adipiscing elit",
          classId: action.payload.classId,
          boardId: action.payload.boardId,
          subjectId: action.payload.subjectId,
          schoolId: action.payload.schoolId,
        },
        {
          id: "2",
          name: "Chapter 2",
          questions: [
            {
              id: "2",
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
              id: "2",
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
          description:
            "lorem ipsum dolor sit amet cons ectetur adipiscing elit",
          classId: action.payload.classId,
          boardId: action.payload.boardId,
          subjectId: action.payload.subjectId,
          schoolId: action.payload.schoolId,
        },
        {
          id: "2",
          name: "Chapter 2",
          questions: [
            {
              id: "2",
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
              id: "2",
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
          description:
            "lorem ipsum dolor sit amet cons ectetur adipiscing elit",
          classId: action.payload.classId,
          boardId: action.payload.boardId,
          subjectId: action.payload.subjectId,
          schoolId: action.payload.schoolId,
        },
        {
          id: "2",
          name: "Chapter 2",
          questions: [
            {
              id: "2",
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
              id: "2",
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

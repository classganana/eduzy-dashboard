import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Assessment } from "@/types";

const assessments: Assessment[] = [];

const assessmentSlice = createSlice({
  name: "assessments",
  initialState: assessments,
  reducers: {
    initializeAssessments(
      state,
      action: PayloadAction<{
        classId: string;
        boardId: string;
        subjectId: string;
        schoolId: string;
        teacherId: string;
      }>,
    ) {
      /* Get scheduled or created assessments */
      return [
        {
          assessmentId: "1",
          chapters: ["1", "2"],
          questions: ["1", "2", "3"],
          startTime: new Date(),
          endTime: new Date(),

          schoolId: action.payload.schoolId,
          boardId: action.payload.boardId,
          subjectId: action.payload.subjectId,
          classId: action.payload.classId,
          teacherId: action.payload.teacherId,
        },
        {
          assessmentId: "2",
          chapters: ["1", "2"],
          questions: ["1", "2", "3"],
          startTime: new Date(),
          endTime: new Date(),

          schoolId: action.payload.schoolId,
          boardId: action.payload.boardId,
          subjectId: action.payload.subjectId,
          classId: action.payload.classId,
          teacherId: action.payload.teacherId,
        },
        {
          assessmentId: "3",
          chapters: ["1", "2"],
          questions: ["1", "2", "3"],
          startTime: new Date(),
          endTime: new Date(),

          schoolId: action.payload.schoolId,
          boardId: action.payload.boardId,
          subjectId: action.payload.subjectId,
          classId: action.payload.classId,
          teacherId: action.payload.teacherId,
        },
      ];
    },

    createAssessment(state, action: PayloadAction<Assessment>) {
      state.push(action.payload);
    },
    updateAssessment() {},
    removeAssessment() {},
  },
});

export const {
  createAssessment,
  removeAssessment,
  updateAssessment,
  initializeAssessments,
} = assessmentSlice.actions;

export default assessmentSlice.reducer;

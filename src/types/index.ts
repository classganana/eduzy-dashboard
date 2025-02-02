import { ButtonProps } from "@heroui/react";
import { JwtPayload } from "jwt-decode";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: string;
};

export type AppButtonProps = { label: string; payload?: any } & ButtonProps;

export interface Question {
  id: string;
  question: string;
  options: {
    option: string;
    id: string;
  }[];
  answer: {
    optionIds: string[];
    value?: string;
  };
}

export interface ChaptersBasedQuestionsResponse {
  chapters: {
    chapterId: string;
    questions: Question[];
  }[];
}

export interface Chapter {
  // schoolId: string;
  // classId: string;
  // boardId: string;
  // subjectId: string;

  id: string;
  name: string;
  description: string;
  questions?: Question[];
}

export interface Assessment {
  assessmentId: string;
  assessmentName: string;
  classId: string;
  subjectId: string;
  chapters: {
    chapterId: string;
    questions: Question[];
  }[];
  startDate: string;
  endDate: string;
  created: {
    userId: string;
    data: string;
  };
  updated?: {
    userId: string;
    data: string;
  };
  status: string;
}

export interface CreateAsessmentRequest {
  assessmentName: string;
  classId: string;
  subjectId: string;
  boardId: string;
  chapters: {
    chapterId: string;
    questions: Question[];
  }[];
  startDate: string;
  endDate: string;
}

export interface UserJwtTokenPayload extends JwtPayload {
  userId: string;
  role: string;
  schoolId: string;
}

export interface UserLoginResponse {
  accessToken: string;
}

export interface Chapters {
  classId: string;
  subjectId: string;
  schoolId: string;
  boardId: string;
  chapters: Chapter[];
}

export interface AssessmentFilter {
  board: string;
  class: string;
  section: string;
  subject: string;
  sort?: string;
}

export interface Report {
  averageScore: number;
  averageTime: number;
  averageStudentsAttempted: number;
  totalStudents: number;
  students?: {
    studentName: string;
    percentage: number;
    attempted: number;
    score: number;
    totalQuestions: number;
  }[];
}

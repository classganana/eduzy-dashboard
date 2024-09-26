import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Question {
  id: string;

  questionId: string;
  question: string;
  options: {
    option: string;
  }[];
  answer: string;
}

export interface Chapter {
  schoolId: string;
  classId: string;
  boardId: string;
  subjectId: string;

  id: string;
  name: string;
  description: string;
  questions: Question[];
}

export interface Assessment {
  schoolId: string;
  boardId: string;
  subjectId: string;
  classId: string;
  teacherId: string;

  assessmentId: string;
  chapters: string[];
  questions: string[];

  startTime: Date;
  endTime: Date;
}

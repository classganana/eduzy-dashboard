import { ButtonProps } from "@nextui-org/react";
import { JwtPayload } from "jwt-decode";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: string;
};

export type AppButtonProps = { label: string } & ButtonProps;

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
  updated: {
    userId: string;
    data: string;
  };
  status: string;
}

export interface CreateAsessmentRequest {
  assessmentName: string;
  classId: string;
  subjectId: string;
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

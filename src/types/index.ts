import { ButtonProps } from "@nextui-org/react";
import { JwtPayload } from "jwt-decode";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
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

export interface UserJwtTokenPayload extends JwtPayload {
  userId: string;
  role: string;
  schoolId: string;
}

export interface UserLoginResponse {
  accessToken: string;
}

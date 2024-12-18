import { getTokenFromLocalStorage, replaceVarsInstr } from "../utils";
import { AppTexts } from "../utils/texts";

import {
  Assessment,
  Chapters,
  ChaptersBasedQuestionsResponse,
  CreateAsessmentRequest,
  Question,
  UserLoginResponse,
} from "@/types";

export class ApiService {
  private static instance: ApiService;
  private constructor() {}

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }

    return ApiService.instance;
  }

  public async dashboardFetch(input: RequestInfo | URL, init?: RequestInit) {
    const tokenInfo = getTokenFromLocalStorage();
    const response = await fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenInfo?.accessToken}`,
      },
    });

    if (response.headers.get("content-type")?.includes("application/json")) {
      return response.json();
    }

    return response.text();
  }

  async signIn(
    username: string,
    password: string,
  ): Promise<UserLoginResponse | null> {
    try {
      const response = await this.dashboardFetch(
        import.meta.env.E_D_APP_LOGIN_ENDPOINT,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userNameOrPhoneNumber: username,
            password,
          }),
        },
      );

      return response;
    } catch (error) {
      console.error(error);

      return null;
    }
  }

  async getChapters(
    classId: string,
    subjectId: string,
    boardId: string,
  ): Promise<Chapters> {
    const tokenInfo = getTokenFromLocalStorage();
    const endpoint = replaceVarsInstr(
      import.meta.env.E_D_APP_GET_CHAPTERS_ENDPOINT,
      {
        classId,
        subjectId,
        boardId,
      },
    );

    let response = (await this.dashboardFetch(endpoint)) || [];

    /* Due to bad existing backend schemas */
    response = response[0]?.chapters || [];

    return {
      classId,
      subjectId,
      boardId,
      schoolId: tokenInfo?.schoolId || "",
      chapters: response.map((chapter: string) => {
        const chapterTitle = chapter.split(" ").at(-1);
        const chapterNumText = chapter.split(" ").slice(0, 2).join(" ");

        return {
          id: chapter,
          name: chapterNumText,
          description: chapterTitle,
        };
      }),
    };
  }

  async getQuestionsBasedOnChapter(
    classId: string,
    subjectId: string,
    boardId: string,
    chapterId: string,
  ): Promise<{
    chapterId: string;
    questions: Question[];
  }> {
    const endpoint = replaceVarsInstr(
      import.meta.env.E_D_APP_GET_CHAPTER_QUESTIONS_ENDPOINT,
      {
        classId,
        subjectId,
        boardId,
        chapterId,
      },
    );

    let response = (await this.dashboardFetch(endpoint)) || [];

    return {
      chapterId,
      questions: response.map((question: any) => {
        return {
          id: question.questionId,
          question: question.question,
          options: question.options.map((option: any) => {
            return {
              id: option,
              option: option,
            };
          }),
          answer: {
            optionIds: [],
            value: "",
          },
        };
      }),
    };
  }

  async getQuestions(
    classId: string,
    subjectId: string,
    boardId: string,
    chapterIds: string[],
  ): Promise<ChaptersBasedQuestionsResponse> {
    const getQuestionsBasedOnChapterPromises = chapterIds.map((chapterId) =>
      this.getQuestionsBasedOnChapter(classId, subjectId, boardId, chapterId),
    );
    const questionsBasedOnChapters = await Promise.all(
      getQuestionsBasedOnChapterPromises,
    );

    return {
      chapters: questionsBasedOnChapters,
    };
  }

  async createAssessment(assessment: CreateAsessmentRequest) {
    const existingQuestions = assessment.chapters
      .map((chapter) => chapter.questions)
      .filter(Boolean)
      .flat();

    const questions =
      existingQuestions.length > 0
        ? existingQuestions
        : (
            await this.getQuestions(
              assessment.classId,
              assessment.subjectId,
              "CBSE",
              assessment.chapters.map((chapter) => chapter.chapterId),
            )
          ).chapters
            .map((chapter) => chapter.questions)
            .flat();

    const response = await this.dashboardFetch(
      import.meta.env.E_D_APP_CREATE_ASSESSMENTS_ENDPOINT,
      {
        body: JSON.stringify({
          assessmentName: assessment.assessmentName,
          boardId: "CBSE",
          className: parseInt(assessment.classId),
          subject: assessment.subjectId,
          chapters: assessment.chapters.map((chapter) => chapter.chapterId),
          questionIds: questions.map((question) => question.id),
          startTime: assessment.startDate,
          endTime: assessment.endDate,
        }),
        method: "POST",
      },
    );

    return response;
  }

  async getAssessments(): Promise<Assessment[] | null> {
    const response = await this.dashboardFetch(
      import.meta.env.E_D_APP_GET_ASSESSMENTS_ENDPOINT,
    );

    if (!response?.length) return [];

    return response.map((assessment: any) => {
      return {
        assessmentId: assessment.assessmentId,
        assessmentName: assessment.assessmentName || "Test Assessment",
        classId: assessment.className,
        subjectId: assessment.subject,
        status: assessment.status || AppTexts.notStarted,
        startDate: assessment.startTime,
        endDate: assessment.endTime,
        chapters: assessment.chapters.map((chapter: string) => {
          return {
            chapterId: chapter,
            questions: [],
          };
        }),
        created: {
          userId: assessment.created.id,
          data: assessment.created.date,
        },
        updated: {
          userId: assessment.lastUpdated.id,
          data: assessment.lastUpdated.date,
        },
      };
    });
  }
}

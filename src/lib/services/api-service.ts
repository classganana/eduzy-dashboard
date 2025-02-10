import { getTokenFromLocalStorage, replaceVarsInstr } from "../utils";
import { AppTexts } from "../utils/texts";

import {
  Assessment,
  AssessmentFilter,
  Chapters,
  ChaptersBasedQuestionsResponse,
  CreateAsessmentRequest,
  Question,
  Report,
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
    // const getQuestionsBasedOnChapterPromises = chapterIds.map((chapterId) =>
    //   this.getQuestionsBasedOnChapter(classId, subjectId, boardId, chapterId)
    // );

    const endpoint = replaceVarsInstr(
      import.meta.env.E_D_APP_GET_CHAPTER_QUESTIONS_ENDPOINT,
      {
        classId,
        subjectId,
        boardId,
        chapterIds: chapterIds.join(";"),
      },
    );
    let response = (await this.dashboardFetch(endpoint)) || [];

    return {
      chapters: response.map((chapter: any) => {
        return {
          chapterId: chapter.chapter,
          questions: chapter.questions.map((question: any) => {
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
                optionIds: [
                  question.options.filter(
                    (option: any) => option === question.answer,
                  )[0],
                ],
                value: "",
              },
            };
          }),
        };
      }),
    };
  }

  async createAssessment(assessment: CreateAsessmentRequest) {
    const chapterQuesNeedToBeFetched: CreateAsessmentRequest["chapters"] = [];
    const finalChapterQuestions: CreateAsessmentRequest["chapters"] = [];

    for (const chapter of assessment.chapters) {
      if (!chapter.questions?.length) {
        chapterQuesNeedToBeFetched.push(chapter);
      } else {
        finalChapterQuestions.push(chapter);
      }
    }

    const chapterQuestions = chapterQuesNeedToBeFetched?.length
      ? await this.getQuestions(
          assessment.classId,
          assessment.subjectId,
          assessment.boardId,
          chapterQuesNeedToBeFetched.map((chapter) => chapter.chapterId),
        )
      : { chapters: [] };

    chapterQuestions.chapters.forEach((chapter) => {
      finalChapterQuestions.push(chapter);
    });

    const questions = finalChapterQuestions.map((chapter) => {
      return {
        chapter: chapter.chapterId,
        questionIds:
          chapter.questions?.map((question) => String(question.id)) || [],
      };
    });

    const response = await this.dashboardFetch(
      import.meta.env.E_D_APP_CREATE_ASSESSMENTS_ENDPOINT,
      {
        body: JSON.stringify({
          assessmentName: assessment.assessmentName,
          boardId: "BOARD123",
          className: parseInt(assessment.classId),
          subject: assessment.subjectId,
          questions: questions,
          startTime: assessment.startDate,
          endTime: assessment.endDate,
        }),
        method: "POST",
      },
    );

    return response;
  }

  async getAssessments(
    filter?: Partial<AssessmentFilter>,
  ): Promise<Assessment[] | null> {
    // Construct query params from filter
    filter = {
      ...(filter || {}),
      sort: filter?.sort ?? "-date",
    };
    const queryParams = Object.entries(filter)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const endpoint = `${import.meta.env.E_D_APP_GET_ASSESSMENTS_ENDPOINT}?${queryParams}`;

    const response = await this.dashboardFetch(endpoint);

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
        chapters: assessment.questions?.map((question: any) => {
          return {
            chapterId: question.chapter,
            questions: [
              question.questionIds.map((questionId: string) => ({
                id: questionId,
              })),
            ],
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

  async getUserDetails() {
    let response = await this.dashboardFetch(
      import.meta.env.E_D_APP_GET_USER_DETAILS_ENDPOINT,
    );

    response = response || {};
    response.userId =
      response.id || response.userId || response.teacherId || "";
    response.email = response.email || response.userEmail || "";

    return response;
  }

  async getReportByAssessmentId(
    assessmentId: string,
  ): Promise<Omit<Report, "students">> {
    const response = await this.dashboardFetch(
      replaceVarsInstr(import.meta.env.E_D_APP_GET_REPORT_BY_ASSESSMENT_ID, {
        assessmentId,
      }),
    );

    return response;
  }

  async getReportStudentsByAssessmentId(
    assessmentId: string,
    filter?: { sort?: string },
  ): Promise<Report["students"]> {
    const url = new URL(
      replaceVarsInstr(
        import.meta.env.E_D_APP_GET_REPORT_STUDENTS_BY_ASSESSMENT_ID,
        {
          assessmentId,
        },
      ),
    );

    if (filter?.sort) {
      url.searchParams.set("sort", filter.sort);
    }
    const response = await this.dashboardFetch(url);

    return response;
  }

  async getReportWronglyAnsweredByAssessmentId(
    assessmentId: string,
  ): Promise<Report["wronglyAnswered"]> {
    const response = await this.dashboardFetch(
      replaceVarsInstr(
        import.meta.env
          .E_D_APP_GET_REPORT_WRONGLY_ANSWERED_QUES_BY_ASSESSMENT_ID,
        {
          assessmentId,
        },
      ),
    );

    return response;
  }
}

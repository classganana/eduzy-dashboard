import {
  Assessment,
  Chapter,
  ChaptersBasedQuestionsResponse,
  CreateAsessmentRequest,
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
    const response = await fetch(input, init);

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
    _classId: string,
    _subjectId: string,
  ): Promise<{
    classId: string;
    subjectId: string;
    schoolId: string;
    boardId: string;
    chapters: Omit<Chapter, "questions">[];
  } | null> {
    // accesstoken
    // const response = await this.dashboardFetch()

    // sample data
    return {
      classId: _classId,
      subjectId: _subjectId,
      schoolId: "asdasdasdasda",
      boardId: "CBSE",
      chapters: [
        {
          id: "c1",
          name: "Chapter 1",
          description:
            "lorem ipsum dolor sit amet cons ectetur adipiscing elit",
        },
        {
          id: "c2",
          name: "Chapter 2",
          description:
            "lorem ipsum dolor sit amet cons ectetur adipiscing elit",
        },
        {
          id: "c3",
          name: "Chapter 3",
          description:
            "lorem ipsum dolor sit amet cons ectetur adipiscing elit",
        },
        {
          id: "c4",
          name: "Chapter 4",
          description:
            "lorem ipsum dolor sit amet cons ectetur adipiscing elit",
        },
        {
          id: "c5",
          name: "Chapter 5",
          description:
            "lorem ipsum dolor sit amet cons ectetur adipiscing elit",
        },
        {
          id: "c6",
          name: "Chapter 6",
          description:
            "lorem ipsum dolor sit amet cons ectetur adipiscing elit",
        },
        {
          id: "c7",
          name: "Chapter 7",
          description:
            "lorem ipsum dolor sit amet cons ectetur adipiscing elit",
        },
        {
          id: "c8",
          name: "Chapter 8",
          description:
            "lorem ipsum dolor sit amet cons ectetur adipiscing elit",
        },
        {
          id: "c9",
          name: "Chapter 9",
          description:
            "lorem ipsum dolor sit amet cons ectetur adipiscing elit",
        },
        {
          id: "c10",
          name: "Chapter 10",
          description:
            "lorem ipsum dolor sit amet cons ectetur adipiscing elit",
        },
      ],
    };
  }

  async getQuestions(
    _classId: string,
    _subjectId: string,
    _chapterIds: string[],
  ): Promise<ChaptersBasedQuestionsResponse> {
    // accesstoken
    // const response = await this.dashboardFetch()
    // sample data
    return {
      chapters: [
        {
          chapterId: "c1",
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
              ],
              answer: {
                optionIds: ["o1", "o2"],
              },
            },
            {
              id: "q2",
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
              ],
              answer: {
                optionIds: ["o1"],
              },
            },
          ],
        },
        {
          chapterId: "c2",
          questions: [
            {
              id: "q21",
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
              ],
              answer: {
                optionIds: ["o1", "o2"],
              },
            },
            {
              id: "q22",
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
              ],
              answer: {
                optionIds: ["o1"],
              },
            },
          ],
        },
      ],
    };
  }

  async createAssessment(assessment: CreateAsessmentRequest) {
    //const response = await this.dashboardFetch()
    //access token
    return assessment;
  }

  async getAssessments(): Promise<Assessment[] | null> {
    // const response = await this.dashboardFetch()
    // access token
    // Sample respone
    return [
      {
        assessmentId: "550e8400-e29b-41d4-a716221",
        assessmentName: "Test Assessment",
        classId: "10",
        subjectId: "Social",
        chapters: [
          {
            chapterId: "Teritories",
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
                  optionIds: ["o1", "o2"],
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
                  optionIds: ["o1"],
                },
              },
            ],
          },
          {
            chapterId: "Union Teritories",
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
                  optionIds: ["o1", "o2"],
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
                  optionIds: ["o1"],
                },
              },
            ],
          },
        ],
        status: "0/10 completed.",
        startDate: "2024-10-31T01:30:00.000-05:00",
        endDate: "2024-11-31T01:30:00.000-05:00",
        created: {
          userId: "2112a01-b37120-5ed12459-1283",
          data: "2024-10-31T01:30:00.000-05:00",
        },
        updated: {
          userId: "2112a01-b37120-5ed12459-1283",
          data: "2024-10-31T01:30:00.000-05:00",
        },
      },
      {
        assessmentId: "550e8400-e29b-41d4-a716244",
        assessmentName: "Test Assessment 2",
        classId: "9",
        subjectId: "General Knowledge",
        status: "Assessment Completed",
        chapters: [
          {
            chapterId: "Capitals of countries",
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
                  optionIds: ["o1", "o2"],
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
                  optionIds: ["o1"],
                },
              },
            ],
          },
        ],

        startDate: "2024-10-21T01:30:00.000-05:00",
        endDate: "2024-11-31T01:30:00.000-05:00",
        created: {
          userId: "2112a01-b37120-5ed12459-1283",
          data: "2024-10-31T01:30:00.000-05:00",
        },
        updated: {
          userId: "2112a01-b37120-5ed12459-1283",
          data: "2024-10-31T01:30:00.000-05:00",
        },
      },
      {
        assessmentId: "550e8400-e29b-41d4-a716231",
        assessmentName: "Test Assessment 3",
        classId: "9",
        subjectId: "General Knowledge 2",
        status: "Assessment Expired",
        chapters: [
          {
            chapterId: "Capitals of countries 2",
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
                  optionIds: ["o1", "o2"],
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
                  optionIds: ["o1"],
                },
              },
            ],
          },
        ],

        startDate: "2024-10-21T01:30:00.000-05:00",
        endDate: "2024-11-31T01:30:00.000-05:00",
        created: {
          userId: "2112a01-b37120-5ed12459-1283",
          data: "2024-10-31T01:30:00.000-05:00",
        },
        updated: {
          userId: "2112a01-b37120-5ed12459-1283",
          data: "2024-10-31T01:30:00.000-05:00",
        },
      },
    ];
  }
}

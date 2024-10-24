import { Assessment, UserLoginResponse } from "@/types";

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
      console.log(error);

      return null;
    }
  }

  async getChapters(_classId: string, _subjectId: string) {
    try {
      // accesstoken
      // const response = await this.dashboardFetch()

      // sample data
      return [
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
      ];
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  async getQuestions(_classId: string, _subjectId: string, _chapterId: string) {
    try {
      // accesstoken
      // const response = await this.dashboardFetch()
      // sample data
      return [
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
      ];
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  async getAssessments(): Promise<Assessment[] | null> {
    try {
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
    } catch (error) {
      console.log(error);

      return null;
    }
  }
}

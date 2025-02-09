import { Button, Card, CardBody } from "@heroui/react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppLoader from "@/components/app-loader";
import { LeftArrow, NoDataIcon } from "@/components/icons";
import PlaceholderCard from "@/components/placeholder-card";
import ReportTable from "@/components/report-table";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hooks";
import { AppTexts } from "@/lib/utils/texts";
import {
  fetchAssessmentReport,
  fetchAssessmentReportStudents,
  selectReportDetails,
  selectReportError,
  selectReportingLoading,
} from "@/store/slices/reportSlice";

type Props = {};

const ReportPage = (_props: Props) => {
  const navigate = useNavigate();
  const params = useParams();

  console.log(params);
  const reportLoading = useAppSelector(selectReportingLoading);
  const reportDetails = useAppSelector((state) =>
    selectReportDetails(state, params.assessmentId ?? ""),
  );
  const reportError = useAppSelector(selectReportError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    params.assessmentId &&
      dispatch(fetchAssessmentReport(params.assessmentId)).then(() => {
        params.assessmentId &&
          dispatch(fetchAssessmentReportStudents(params.assessmentId));
      });
  }, [params]);

  if (
    !reportLoading &&
    (!params.assessmentId ||
      !params.assessmentName ||
      Boolean(reportError?.length))
  ) {
    return (
      <PlaceholderCard
        description={""}
        icon={<NoDataIcon size={"20em"} />}
        title={AppTexts.reportNotFound}
      />
    );
  }

  return (
    <div className="grow flex flex-col gap-4 px-3">
      <div className="flex flex-wrap gap-4 items-center sm:justify-between">
        <div className="flex justify-self-start items-center">
          <Button
            className="mx-2"
            isIconOnly={true}
            size="sm"
            variant="light"
            onPress={() => navigate(-1)}
          >
            <LeftArrow />
          </Button>
          <div>
            <h3 className="text-xl font-bold">{params.assessmentName}</h3>
          </div>
        </div>
      </div>
      <AppLoader loading={reportLoading} />

      {reportDetails && !reportLoading && (
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <Card className="flex-1 min-h-[100px] flex flex-col justify-between">
              <CardBody>
                <p className="text-sm"> {AppTexts.reportAvgScoreText}</p>
                <div className="h-full text-3xl text-primary flex px-1 items-end">
                  {reportDetails.averageScore}%
                </div>
              </CardBody>
            </Card>
            <Card className="flex-1 min-w-[100px]">
              <CardBody>
                <p className="text-sm">{AppTexts.reportAttemptedText}</p>
                <div className="h-full text-3xl text-primary flex px-1 items-end">
                  {reportDetails.averageStudentsAttempted}%
                </div>
              </CardBody>
            </Card>
            <Card className="flex-1 min-w-[100px]">
              <CardBody className="flex flex-col">
                <p className="text-sm">
                  {AppTexts.reportAverageCompletionTime}
                </p>
                <div className="h-full text-3xl text-primary flex px-1 items-end">
                  {reportDetails.averageTime}
                  <span>&nbsp;{AppTexts.reportAvgCompletionTimeUnit}</span>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      )}

      {reportDetails && !reportLoading && (
        <ReportTable
          columns={[
            {
              key: "student",
              label: AppTexts.reportColStudent,
            },
            {
              key: "attemptedQuestionsByTotal",
              label: AppTexts.reportColAttemptedQues,
            },
            {
              key: "totalScore",
              label: AppTexts.reportColTotalScore,
            },
            {
              key: "scorePercentage",
              label: AppTexts.reportColScorePercentage,
            },
          ]}
          items={
            reportDetails.students?.map((student, index) => {
              return {
                attemptedQuestionsByTotal: `${student.attempted}/${student.totalQuestions}`,
                scorePercentage: student.percentage,
                key: student.studentName + index + student.percentage,
                student: student.studentName,
                totalScore: student.score,
              };
            }) ?? []
          }
        />
      )}
    </div>
  );
};

export default ReportPage;

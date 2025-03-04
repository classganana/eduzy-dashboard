import { Button, Card, CardBody, Chip } from "@heroui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CheckCircle, RightArrowWithCircle } from "./icons";

import { Constants } from "@/lib/utils/constants";
import { AppTexts } from "@/lib/utils/texts";
import { Assessment } from "@/types";

interface AssessmentProps {
  assessment: Assessment;
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  const day = date.getDate();

  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};

function TestCard({ assessment }: Readonly<AssessmentProps>) {
  const [isAssessmentCompleted, setIsAssessmentCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAssessmentCompleted(
      Date.now() >= new Date(assessment.endDate).getTime(),
    );
  }, [assessment]);

  return (
    <Card>
      <CardBody className="relative">
        <div className="m-1 flex flex-col gap-4">
          <h3 className="max-w-[65%] line-clamp-1 text-ellipsis overflow-hidden">
            {assessment.assessmentName}
          </h3>
          <div className="flex flex-wrap items-center justify-between">
            <Chip
              avatar={
                isAssessmentCompleted ? (
                  <CheckCircle className="text-success" />
                ) : (
                  <RightArrowWithCircle />
                )
              }
              className={clsx(
                isAssessmentCompleted ? "bg-success-50" : "bg-primary-100",
              )}
              classNames={{
                base: "items-center",
                content: "text-xs",
                avatar: clsx(
                  "w-4",
                  isAssessmentCompleted ? "text-success" : "text-primary",
                ),
              }}
              variant="flat"
            >
              {isAssessmentCompleted
                ? AppTexts.assessmentStatuses.completed
                : AppTexts.assessmentStatuses.sent}
            </Chip>
            <Button
              className="hidden sm:block"
              color="primary"
              size="sm"
              variant="bordered"
              onPress={() => {
                navigate(
                  Constants.routes.report
                    .replace(":assessmentId", assessment.assessmentId)
                    .replace(
                      ":assessmentName",
                      encodeURIComponent(assessment.assessmentName),
                    ),
                );
              }}
            >
              {AppTexts.viewReport}
            </Button>
          </div>
        </div>
        <Chip
          className="bg-primary-50 absolute top-4 right-3 p-[0.1px]"
          classNames={{
            content: "text-xs",
          }}
          variant="solid"
        >
          {formatDate(assessment.startDate)}
        </Chip>
        <Button
          className="m-2 sm:hidden"
          color="primary"
          size="sm"
          variant="bordered"
          onPress={() => {
            navigate(
              Constants.routes.report
                .replace(":assessmentId", assessment.assessmentId)
                .replace(
                  ":assessmentName",
                  encodeURIComponent(assessment.assessmentName),
                ),
            );
          }}
        >
          {AppTexts.viewReport}
        </Button>
      </CardBody>
    </Card>
    // <Card className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 w-full justify-center">
    //   <div className="flex flex-col gap-2 p-1">
    //     <p className="text-lg m-1">{props.assessment}</p>
    //     <div className="text-red-500 flex flex-wrap items-center space-x-3 mt-2">
    //       <Chip
    //         avatar={
    //           <Avatar
    //             classNames={{
    //               base:
    //                 props.status !== AppTexts.status
    //                   ? "bg-[#3050EB1A]"
    //                   : "bg-[#6DBE001A]",
    //             }}
    //             name="JW"
    //             src={
    //               props.status !== AppTexts.status ? arrowCircleRight : checkone
    //             }
    //           />
    //         }
    //         className={`${
    //           props.status !== AppTexts.status
    //             ? "bg-[#3050EB1A]"
    //             : "bg-[#6DBE001A]"
    //         } `}
    //         classNames={{ base: "m-1" }}
    //         variant="flat"
    //       >
    //         <p className="text-[#626262]">{props.status}</p>
    //       </Chip>
    //       {props.status === AppTexts.status && (
    //         <p>{props.notUnderstoodTopics}</p>
    //       )}
    //     </div>
    //   </div>
    //   <div className="flex flex-col justify-center items-center gap-3">
    //     {/* <div className="bg-primary-50 rounded-md p-2 text-sm text-center text-[#626262] ">
    //       {formatDate(props.assessmentDate)}
    //     </div> */}
    //     <Chip variant="solid" className="bg-primary-50">
    //       {formatDate(props.assessmentDate)}
    //     </Chip>
    //     <Button color="primary" variant="bordered" onClick={props.onViewReport}>
    //       {AppTexts.viewReport}
    //     </Button>
    //   </div>

    //   <div className="grid grid-cols-7 sm:grid-cols-3 gap-4 items-center">
    //     <div className="flex flex-col items-center max-[640px]:col-start-2 max-[640px]:col-span-2">
    //       <p className="text-2xl text-[#3050EB]">{props.avgScore}%</p>
    //       <p className="text-sm text-[#939393]">{AppTexts.avgScore}</p>
    //     </div>
    //     <div className="flex flex-col items-center max-[640px]:col-start-5 max-[640px]:col-span-2">
    //       <p className="text-2xl text-[#626262]">
    //         {props.attemptedPercentage}%
    //       </p>
    //       <p className="text-sm text-[#939393]">{AppTexts.attempted}</p>
    //     </div>
    // <div className="flex flex-col justify-center space-y-2 max-[640px]:col-start-[3] max-[640px]:col-span-3">
    //   <div className="bg-blue-50 rounded-md p-2 text-sm text-center text-[#626262] ">
    //     {formatDate(props.assessmentDate)}
    //   </div>
    //   <Button
    //     color="primary"
    //     variant="bordered"
    //     onClick={props.onViewReport}
    //   >
    //     {AppTexts.viewReport}
    //   </Button>
    // </div>
    //   </div>
    // </Card>
  );
}

export default TestCard;

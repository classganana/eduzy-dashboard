import { Avatar, Button, Card, Chip } from "@nextui-org/react";

import arrowCircleRight from "../assets/arrow-circle-right.png";
import checkone from "../assets/checkone.png";
import { AppTexts } from "../lib/utils/texts";

interface AssessmentProps {
  assessment: string;
  avgScore?: number;
  attemptedPercentage?: number;
  notUnderstoodTopics?: string;
  assessmentDate?: string;
  status?: string;
  onViewReport?: () => void;
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  const day = date.getDate();

  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};

function TestCard(props: AssessmentProps) {
  return (
    <Card className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 w-full justify-center">
      <div className="flex flex-col gap-2 p-1">
        <p className="text-lg m-1">{props.assessment}</p>
        <div className="text-red-500 flex flex-wrap items-center space-x-3 mt-2">
          <Chip
            avatar={
              <Avatar
                classNames={{
                  base:
                    props.status !== AppTexts.status
                      ? "bg-[#3050EB1A]"
                      : "bg-[#6DBE001A]",
                }}
                name="JW"
                src={
                  props.status !== AppTexts.status ? arrowCircleRight : checkone
                }
              />
            }
            className={`${
              props.status !== AppTexts.status
                ? "bg-[#3050EB1A]"
                : "bg-[#6DBE001A]"
            } `}
            classNames={{ base: "m-1" }}
            variant="flat"
          >
            <p className="text-[#626262]">{props.status}</p>
          </Chip>
          {props.status === AppTexts.status && (
            <p>{props.notUnderstoodTopics}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-7 sm:grid-cols-3 gap-4 items-center">
        <div className="flex flex-col items-center max-[640px]:col-start-2 max-[640px]:col-span-2">
          <p className="text-2xl text-[#3050EB]">{props.avgScore}%</p>
          <p className="text-sm text-[#939393]">{AppTexts.avgScore}</p>
        </div>
        <div className="flex flex-col items-center max-[640px]:col-start-5 max-[640px]:col-span-2">
          <p className="text-2xl text-[#626262]">
            {props.attemptedPercentage}%
          </p>
          <p className="text-sm text-[#939393]">{AppTexts.attempted}</p>
        </div>
        <div className="flex flex-col justify-center space-y-2 max-[640px]:col-start-[3] max-[640px]:col-span-3">
          <div className="bg-blue-50 rounded-md p-2 text-sm text-center text-[#626262] ">
            {formatDate(props.assessmentDate)}
          </div>
          <Button
            color="primary"
            variant="bordered"
            onClick={props.onViewReport}
          >
            {AppTexts.viewReport}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default TestCard;

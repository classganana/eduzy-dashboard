import { Button, Card, Chip, Avatar } from "@nextui-org/react";

import { AppTexts } from "../lib/utils/texts";
import arrowCircleRight from "../assets/arrow-circle-right.png";
import checkone from "../assets/checkone.png";

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
  const dayWithSuffix =
    day +
    (day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th");

  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return `${dayWithSuffix} ${month}, ${year}`;
};

function testStatus(props: AssessmentProps) {
  return (
    <Card className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 w-full">
      <div className="flex flex-col justify-between">
        <p>{props.assessment}</p>
        <div className="text-red-500 flex flex-wrap items-center space-x-3 mt-2">
          <Chip
            avatar={
              <Avatar
                name="JW"
                src={
                  props.status !== AppTexts.status ? arrowCircleRight : checkone
                }
              />
            }
            className={`${
              props.status !== AppTexts.status ? "bg-blue-100" : "bg-green-100"
            } text-gray-600`}
            variant="flat"
          >
            <p className="text-gray-600">
              {props.status !== AppTexts.status
                ? "Assessment Sent"
                : "Assessment Complete"}
            </p>
          </Chip>
          {props.status === AppTexts.status && (
            <p>{props.notUnderstoodTopics}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-7 sm:grid-cols-3 gap-4">
        <div className="flex flex-col items-center space-y-6 max-[640px]:col-start-2 max-[640px]:col-span-2">
          <p className="text-2xl text-blue-600">{props.avgScore}%</p>
          <p className="text-sm text-gray-500">{AppTexts.avgScore}</p>
        </div>
        <div className="flex flex-col items-center space-y-6 max-[640px]:col-start-5 max-[640px]:col-span-2">
          <p className="text-2xl">{props.attemptedPercentage}%</p>
          <p className="text-sm text-gray-500">{AppTexts.attempted}</p>
        </div>
        <div className="flex flex-col justify-center space-y-4 max-[640px]:col-start-[3] max-[640px]:col-span-3">
          <Button className="bg-blue-50 text-gray-600 ">
            {formatDate(props.assessmentDate)}
          </Button>
          <Button color="primary" onClick={props.onViewReport}>
            {AppTexts.viewReport}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default testStatus;

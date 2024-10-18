import { Button, Card } from "@nextui-org/react";

import { AppTexts } from "../lib/utils/texts";

import ScoreInfo from "./score-info";

interface AssessmentProps {
  chapterName: string;
  avgScore: number;
  attemptedPercentage: number;
  notUnderstoodTopics: string;
  assessmentDate: string;
  onViewReport: () => void;
}

function AssessmentPerSubject(props: AssessmentProps) {
  return (
    <Card className="grid grid-cols-12 break-words px-4 py-4 space-x-4 w-[100%]">
      <div className="flex flex-col justify-between col-span-12 min-[700px]:col-span-6">
        <p className="mt-2">{props.chapterName}</p>
        <p className="mb-[0.4rem] text-[#F64848] max-[700px]:my-4">
          {props.notUnderstoodTopics}
        </p>
      </div>
      <div className="flex flex-cols justify-between col-span-12 min-[700px]:col-span-6 max-[700px]:grid grid-cols-12 gap-y-4">
        <ScoreInfo
          isHighlighted
          label={AppTexts.avgScore}
          score={`${props.avgScore}%`}
        />
        <ScoreInfo
          label={AppTexts.attempted}
          score={`${props.attemptedPercentage}%`}
        />

        <div className="flex flex-col justify-between max-[700px]:col-span-12 max-[700px]:items-center">
          <Button className="bg-[#3050EB0D] text-[#626262] max-[700px]:w-44">
            {props.assessmentDate}
          </Button>
          <Button
            className="mt-[16px] max-[700px]:w-44"
            color="primary"
            onClick={props.onViewReport}
          >
            {AppTexts.viewReport}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default AssessmentPerSubject;

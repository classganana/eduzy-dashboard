import TestStatus from "./test-status";

import { useAppSelector } from "@/lib/utils/hooks";
import { Assessment } from "@/types";

type Props = {};

const TestCard = (_props: Props) => {
  const assessmentInfo = useAppSelector((state) => state.assessments);

  return (
    <div className="flex flex-col gap-4">
      {assessmentInfo.data.map((assessment: Assessment) => {
        return (
          <TestStatus
            key={assessment.assessmentId}
            assessment={assessment.assessmentName}
            assessmentDate={assessment.startDate}
            attemptedPercentage={99}
            avgScore={90.01}
            notUnderstoodTopics="No"
            status={assessment.status}
            onViewReport={() => {}}
          />
        );
      })}
    </div>
  );
};

export default TestCard;

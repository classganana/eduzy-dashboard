import TestCard from "./test-card";

import { useAppSelector } from "@/lib/utils/hooks";
import { Assessment } from "@/types";

type Props = {};

const TestCardsList = (_props: Props) => {
  const assessmentInfo = useAppSelector((state) => state.assessments);

  return (
    <div className="flex flex-col gap-4">
      {assessmentInfo.data.map((assessment: Assessment) => {
        return (
          <TestCard key={assessment.assessmentId} assessment={assessment} />
        );
      })}
    </div>
  );
};

export default TestCardsList;

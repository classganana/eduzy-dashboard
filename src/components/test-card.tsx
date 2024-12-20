import { Accordion, AccordionItem, Chip } from "@nextui-org/react";

import AssessmentDetails from "./assessment-details";

import { useAppSelector } from "@/lib/utils/hooks";
import { Assessment } from "@/types";

type Props = {};

const TestCard = (_props: Props) => {
  const assessmentInfo = useAppSelector((state) => state.assessments);

  return (
    <div>
      <Accordion variant="splitted">
        {assessmentInfo.data.map((assessment: Assessment) => {
          return (
            /* Assessment */
            <AccordionItem
              key={assessment.assessmentId}
              aria-label={assessment.assessmentName}
              title={
                <div className="flex flex-wrap items-center gap-4 sm:justify-between">
                  <p className="font-bold text-lg my-2">
                    {assessment.assessmentName}
                  </p>{" "}
                  <Chip color="primary" size="sm">
                    {assessment.status}
                  </Chip>
                </div>
              }
            >
              <AssessmentDetails assessment={assessment} />
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default TestCard;

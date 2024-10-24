import { useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Chip,
  Image,
  Spinner,
} from "@nextui-org/react";

import AssessmentDetails from "@/components/assessment-details";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hooks";
import { AppTexts } from "@/lib/utils/texts";
import { fetchAssessments } from "@/store/slices/assessmentSlice";
import { Assessment } from "@/types";

type Props = {};

const Assessments = (_props: Props) => {
  const assessmentInfo = useAppSelector((state) => state.assessments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    /* Initialize the chapters */
    dispatch(fetchAssessments());
  }, []);

  return (
    <div className="flex-grow flex flex-col gap-4 px-8">
      <div className="flex justify-between">
        <h3 className="text-xl font-bold">{AppTexts.assessmentsHeading}</h3>
        <Button color="primary" size="sm">
          {AppTexts.createAssessment}
        </Button>
      </div>
      <div className="flex-grow p-5">
        {assessmentInfo.loading ? (
          <Spinner
            className="w-full m-2"
            color="primary"
            label={AppTexts.loadingText}
            labelColor="primary"
            size="lg"
          />
        ) : assessmentInfo.data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <Image height={200} src="/no-data.mp4" width={200} />
            <p className="text-lg font-bold">
              {AppTexts.assessmentsNotFoundText}
            </p>
          </div>
        ) : (
          <Accordion variant="splitted">
            {assessmentInfo.data.map((assessment: Assessment) => {
              return (
                /* Assessment */
                <AccordionItem
                  key={assessment.assessmentId}
                  aria-label={assessment.assessmentName}
                  title={
                    <div className="flex items-center gap-6 justify-between">
                      <p className="font-bold text-lg my-2">
                        {assessment.assessmentName}
                      </p>{" "}
                      <Chip color="secondary" size="sm">
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
        )}
      </div>
    </div>
  );
};

export default Assessments;

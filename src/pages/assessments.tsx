import { Button, Spinner } from "@nextui-org/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FillOutBroIcon } from "@/components/icons";
import PlaceholderCard from "@/components/placeholder-card";
import TestCard from "@/components/test-card";
import { Constants } from "@/lib/utils/constants";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hooks";
import { AppTexts } from "@/lib/utils/texts";
import { fetchAssessments } from "@/store/slices/assessmentSlice";

type Props = {};

const Assessments = (_props: Props) => {
  const assessmentInfo = useAppSelector((state) => state.assessments);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    /* Initialize the chapters */
    dispatch(fetchAssessments());
  }, []);

  const handleCreateTestClick = () => {
    navigate(Constants.routes.createTest);
  };

  const hasAssessments = assessmentInfo.data?.length !== 0;

  return (
    <div className="flex-grow flex flex-col gap-4 px-8">
      {hasAssessments && (
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">{AppTexts.testsHeading}</h3>
          <Button color="primary" size="sm" onClick={handleCreateTestClick}>
            {AppTexts.createTest}
          </Button>
        </div>
      )}
      <div className="flex-grow p-5">
        {assessmentInfo.loading && (
          <Spinner
            className="w-full m-2 mt-auto mb-auto"
            color="primary"
            label={AppTexts.loadingText}
            labelColor="primary"
            size="lg"
          />
        )}
        {!assessmentInfo.loading && !hasAssessments ? (
          <PlaceholderCard
            actionButtons={[
              {
                label: AppTexts.createTest,
                onClick: handleCreateTestClick,
                color: "primary",
              },
            ]}
            description={AppTexts.noTestsCardDescription}
            icon={<FillOutBroIcon size={"20em"} />}
            title={AppTexts.noTestsCardTitle}
          />
        ) : (
          <TestCard />
        )}
      </div>
    </div>
  );
};

export default Assessments;

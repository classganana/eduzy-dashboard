import { Button, Spinner } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { FillOutBroIcon } from "@/components/icons";
import PlaceholderCard from "@/components/placeholder-card";
import TestCardsList from "@/components/test-cards-list";
import { Constants } from "@/lib/utils/constants";
import { useAppSelector } from "@/lib/utils/hooks";
import { AppTexts } from "@/lib/utils/texts";

type Props = {};

const Assessments = (_props: Props) => {
  const assessmentInfo = useAppSelector((state) => state.assessments);
  const navigate = useNavigate();

  const handleCreateTestClick = () => {
    navigate(Constants.routes.createTest);
  };

  const hasAssessments = assessmentInfo.data?.length !== 0;

  return (
    <div className="grow flex flex-col gap-4 px-1">
      {hasAssessments && (
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">{AppTexts.testsHeading}</h3>
          <Button color="primary" size="sm" onClick={handleCreateTestClick}>
            {AppTexts.createTest}
          </Button>
        </div>
      )}
      <div className="grow">
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
          <TestCardsList />
        )}
      </div>
    </div>
  );
};

export default Assessments;

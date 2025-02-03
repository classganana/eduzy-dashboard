import { useNavigate } from "react-router-dom";

import { FillOutBroIcon } from "@/components/icons";
import PlaceholderCard from "@/components/placeholder-card";
import { greetingMessageBasedOnTime } from "@/lib/utils";
import { Constants } from "@/lib/utils/constants";
import { AppTexts } from "@/lib/utils/texts";

type Props = {};

const Home = (_props: Props) => {
  const navigate = useNavigate();

  return (
    <PlaceholderCard
      actionButtons={[
        {
          label: AppTexts.goToTestsButton,
          variant: "solid",
          color: "primary",
          onClick: () => navigate(Constants.routes.tests),
        },
      ]}
      description={AppTexts.dashboardWelcomeText}
      icon={<FillOutBroIcon size={"20em"} />}
      title={greetingMessageBasedOnTime()}
    />
  );
};

export default Home;

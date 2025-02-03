import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FillOutBroIcon } from "@/components/icons";
import PlaceholderCard from "@/components/placeholder-card";
import { greetingMessageBasedOnTime } from "@/lib/utils";
import { Constants } from "@/lib/utils/constants";
import { AppTexts } from "@/lib/utils/texts";

type Props = {};

const Home = (_props: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(Constants.routes.tests);
  });

  return (
    <PlaceholderCard
      description={AppTexts.dashboardWelcomeText}
      icon={<FillOutBroIcon size={"20em"} />}
      title={greetingMessageBasedOnTime()}
    />
  );
};

export default Home;

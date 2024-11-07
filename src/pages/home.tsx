import { FillOutBroIcon } from "@/components/icons";
import PlaceholderCard from "@/components/placeholder-card";
import { greetingMessageBasedOnTime } from "@/lib/utils";
import { AppTexts } from "@/lib/utils/texts";

type Props = {};

const Home = (_props: Props) => {
  return (
    <PlaceholderCard
      description={AppTexts.dashboardWelcomeText}
      icon={<FillOutBroIcon size={"20em"} />}
      title={greetingMessageBasedOnTime()}
    />
  );
};

export default Home;

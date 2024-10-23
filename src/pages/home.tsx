import { FillOutBroIcon } from "@/components/icons";
import { greetingMessageBasedOnTime } from "@/lib/utils";
import { AppTexts } from "@/lib/utils/texts";

type Props = {};

const Home = (_props: Props) => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <FillOutBroIcon size={"20em"} />
        <div className="text-2xl font-bold">{greetingMessageBasedOnTime()}</div>
        <div className="text-xl">{AppTexts.dashboardWelcomeText}</div>
      </div>
    </div>
  );
};

export default Home;

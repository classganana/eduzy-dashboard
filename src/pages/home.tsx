import { Image } from "@nextui-org/react";

import { greetingMessageBasedOnTime } from "@/lib/utils";
import { AppTexts } from "@/lib/utils/texts";

type Props = {};

const Home = (_props: Props) => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="w-[50%] min-w-64">
          <Image src="/images/fill-out.png" />
        </div>
        <div className="text-2xl font-bold">{greetingMessageBasedOnTime()}</div>
        <div className="text-xl">{AppTexts.dashboardWelcomeText}</div>
      </div>
    </div>
  );
};

export default Home;

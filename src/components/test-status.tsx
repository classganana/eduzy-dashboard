import { Button, Card, Chip, Avatar } from "@nextui-org/react";

import { AppTexts } from "../lib/utils/texts";
import arrowCircleRight from "../assets/arrow-circle-right.png";
import checkone from "../assets/checkone.png";

interface AssessmentProps {
  chapterName: string;
  avgScore: number;
  attemptedPercentage: number;
  notUnderstoodTopics: string;
  assessmentDate: string;
  status: string;
  onViewReport: () => void;
}

function testStatus(props: AssessmentProps) {
  return (
    <Card className="grid grid-cols-12 break-words px-4 py-4 space-x-4 w-[100%]">
      <div className="flex flex-col justify-between col-span-12 min-[700px]:col-span-6">
        <p className="">
          {props.chapterName}{" "}
          sdflskdflns;dfkjdsfsldfjhasdklfjhladskfjasdlkfjhadlkfjhfdjasflkdssaflfhasdkhflkafhdadjhakdfdsjf;lajdf;jaldfhdajfhdjf
          dfj sddfhd ddf adfhdalfkh df dfhald f aldhfg dhg
        </p>
        <div className="mb-[0.5rem] text-[#F64848] max-[700px]:my-4 flex items-center flex-wrap space-x-3">
          <div className={`flex items-center space-x-2 mt-2 `}>
            <Chip
              avatar={
                <Avatar
                  name="JW"
                  src={props.status != "sent" ? arrowCircleRight : checkone}
                />
              }
              className={`bg-${props.status != "sent" ? "[#3050EB1A]" : "[#6DBE001A]"}`}
              variant="flat"
            >
              <p className="text-[#626262]">
                {" "}
                {props.status != "sent"
                  ? "Assessment Sent"
                  : "Assessment Complete"}
              </p>
            </Chip>
          </div>
          {props.status == "sent" && <p> {props.notUnderstoodTopics} </p>}
        </div>
      </div>
      <div className="flex flex-cols justify-between col-span-12 min-[700px]:col-span-6 max-[700px]:grid grid-cols-12 gap-y-4 -mt-1">
        <div className="flex flex-col justify-between items-center max-[700px]:col-span-6">
          <p className="text-2xl text-[#3050EB]">{props.avgScore}%</p>
          <p className="mb-[0.6rem]">{AppTexts.avgScore}</p>
        </div>
        <div className="flex flex-col justify-between items-center max-[700px]:col-span-6">
          <p className="text-2xl">{props.attemptedPercentage}%</p>
          <p className="mb-[0.6rem]">{AppTexts.attempted}</p>
        </div>

        <div className="flex flex-col justify-between max-[700px]:col-span-12 max-[700px]:items-center">
          <Button className="bg-[#3050EB0D] text-[#626262] max-[700px]:w-44">
            {props.assessmentDate}
          </Button>
          <Button
            className="mt-[16px] max-[700px]:w-44"
            color="primary"
            onClick={props.onViewReport}
          >
            {AppTexts.viewReport}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default testStatus;

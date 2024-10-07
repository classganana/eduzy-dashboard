import { Card } from "@nextui-org/react";

interface CarPro {
  Title: string;
  Percentage: string;
  InfoText: string;
}

export default function ReportsCard(props: CarPro) {
  const { Title, Percentage, InfoText } = props;

  return (
    <div className="3px">
      <Card className="w-80 border-1 border-black-400 border-solid rounded-1-rem p-6 flex flex-wrap">
        <div className="flex-shrink-0 font-inter font-normal text-base leading-1-68 p-2.5 text-black">
          {Title.slice(0, 30).split("\n").slice(0, 3).join("\n")}
        </div>
        <div className="h-35 w-252 flex-shrink-0 text-primary font-inter text-4xl font-normal leading-1-68 p-2.5">
          {Percentage.slice(0, 30).split("\n").slice(0, 3).join("\n")}
        </div>
        <div className="flex-shrink-0 font-inter font-normal text-1.5xl leading-1-68 p-2.5 text-gray">
          {InfoText.slice(0, 30).split("\n").slice(0, 3).join("\n")}
        </div>
      </Card>
    </div>
  );
}

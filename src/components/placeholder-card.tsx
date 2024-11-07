import { Button } from "@nextui-org/react";

import { AppButtonProps } from "@/types";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionButtons?: AppButtonProps[];
};

const PlaceholderCard = ({
  icon,
  title,
  description,
  actionButtons,
}: Props) => {
  return (
    <div>
      <div className="w-full h-full">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          {icon}
          <div className="text-2xl font-bold">{title}</div>
          <div className="text-xl">{description}</div>
          <div className="flex flex-wrap">
            {actionButtons?.map((button, index) => {
              return (
                <Button {...button} key={button.label + index}>
                  {button.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderCard;

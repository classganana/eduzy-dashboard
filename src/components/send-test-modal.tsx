import { Button } from "@nextui-org/react";

import AppModal from "./app-modal-button";

import { AppTexts } from "@/lib/utils/texts";
import { AppButtonProps } from "@/types";

type Props = {
  submitCallback: ({ endDate }: { endDate: string }) => void;
};

const sendTestEndDateButtons: AppButtonProps[] = [
  {
    label: AppTexts.Tomorrow,
    payload: 1,
  },
  {
    label: AppTexts.in2Days,
    payload: 2,
  },
  {
    label: AppTexts.in3Days,
    payload: 3,
  },
  {
    label: AppTexts.in4Days,
    payload: 4,
  },
  {
    label: AppTexts.in5Days,
    payload: 5,
  },
];
const SendTestModalButton = ({ submitCallback }: Props) => {
  const handleEndDateButtonClick = (endsIn: number) => {
    /* endsIn days to date conversion */
    const endDate = new Date();

    endDate.setHours(endDate.getHours() + endsIn * 24);
    alert(endDate.toString());

    submitCallback({ endDate: endDate.toISOString() });
  };

  return (
    <AppModal
      body={
        <div className="flex flex-wrap gap-3 justify-center items-center">
          {sendTestEndDateButtons.map((button, index) => (
            <Button
              key={button.label + index}
              color="primary"
              variant="ghost"
              onClick={() => handleEndDateButtonClick(button.payload)}
              {...button}
            >
              {button.label}
            </Button>
          ))}
        </div>
      }
      header={AppTexts.sendTestModalTitle}
      modalConfig={{
        size: "lg",
      }}
      triggerButton={{
        color: "primary",
        label: AppTexts.sendTestButton,
        size: "sm",
      }}
    />
  );
};

export default SendTestModalButton;

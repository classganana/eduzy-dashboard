import { Card, CardBody, CardHeader, Checkbox } from "@nextui-org/react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Chapter } from "@/types";

type Props = {
  chapter: Chapter;
  isSelectable?: boolean; // New prop to determine if the card is selectable
  onSelectionChange?: (selected: boolean) => void;
};

const ChapterCard = ({
  chapter,
  isSelectable = true,
  onSelectionChange,
}: Props) => {
  const [isSelected, setIsSelected] = useState(false);

  const toggleCheckbox = () => {
    setIsSelected(!isSelected);
    if (onSelectionChange) {
      onSelectionChange(!isSelected);
    }
  };

  const handleCheckboxChange = (selected: boolean) => {
    setIsSelected(selected);
  };

  const chapterCardContent = (
    <div className="w-full">
      <CardHeader>{chapter.name || chapter.id}</CardHeader>
      <CardBody>{chapter.description}</CardBody>
    </div>
  );

  return (
    <Card
      className={cn(
        "w-full max-w-[20rem] h-[12rem] bg-content1",
        "hover:bg-content2",
        "rounded-lg gap-2 p-4 border-2 border-transparent",
        { "cursor-pointer": isSelectable },
        { "border-primary": isSelected && isSelectable },
      )}
      onClick={isSelectable ? toggleCheckbox : () => {}}
      onKeyDown={isSelectable ? toggleCheckbox : () => {}}
    >
      {isSelectable ? (
        <Checkbox
          aria-label={chapter.name || chapter.id}
          className="flex flex-row-reverse items-start"
          classNames={{
            base: "mr-2",
          }}
          isSelected={isSelected}
          onValueChange={handleCheckboxChange}
        >
          {chapterCardContent}{" "}
        </Checkbox>
      ) : (
        chapterCardContent
      )}
    </Card>
  );
};

export default ChapterCard;

import { Chapter } from "@/types";

type Props = {
  chapter: Chapter;
};

const ChapterCard = ({ chapter }: Props) => {
  return (
    <div>
      Chapter Card
      {chapter.name}
      {chapter.description}
    </div>
  );
};

export default ChapterCard;

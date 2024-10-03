import AppModal from "./app-modal-button";

import { AppTexts } from "@/lib/utils/texts";
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
      <AppModal
        body={
          <div>
            {/* {chapter.questions.map((question, index) => {
              return <QuestionComponent question={question} index={index} key={chapter.id+question.id} />;
            })} */}
          </div>
        }
        header={AppTexts.previewQuestionsHeading}
        triggerButton={{
          label: AppTexts.preview,
        }}
      />
    </div>
  );
};

export default ChapterCard;

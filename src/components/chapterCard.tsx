import AppModal from "./app-modal-button";
import QuestionComponent from "./question-component";

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
          <div className="flex flex-col gap-5">
            {chapter.questions.map((question, index) => {
              return (
                <QuestionComponent
                  key={chapter.id + question.id}
                  index={index}
                  question={question}
                />
              );
            })}
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

import { useEffect, useState } from "react";

import AppLoader from "./app-loader";
import AppModal from "./app-modal-button";
import { NoDataIcon } from "./icons";
import PlaceholderCard from "./placeholder-card";
import QuestionComponent from "./question-component";

import { useAppDispatch, useAppSelector } from "@/lib/utils/hooks";
import { AppTexts } from "@/lib/utils/texts";
import { fetchQuestions, getChaptersByIds } from "@/store/slices/chaptersSlice";

type Props = {
  chapterIds: string[];
  disabled?: boolean;
};

const PreviewChapterQuestionsModalbutton = ({
  chapterIds,
  disabled,
}: Props) => {
  const filteredChapters = useAppSelector((state) =>
    getChaptersByIds(state, chapterIds),
  );
  const loadingChapters = useAppSelector((state) => state.chapters.loading);
  const loadingQuestions = useAppSelector(
    (state) => state.chapters.loadingQuestions,
  );
  const dispatch = useAppDispatch();
  const [isModalOpened, setIsModalOpened] = useState(false);

  const modalOpenCallback = () => {
    setIsModalOpened(true);
  };
  const modalCloseCallback = () => {
    setIsModalOpened(false);
  };

  useEffect(() => {
    if (!isModalOpened && filteredChapters?.length !== 0) {
      return;
    }
    /* Initialize the chapters */
    dispatch(
      fetchQuestions({
        classId: "1",
        subjectId: "1",
        chapterIds: chapterIds,
      }),
    );
  }, [isModalOpened]);

  return (
    <div>
      <AppLoader loading={loadingChapters || loadingQuestions} />
      <AppModal
        body={
          <div className="flex flex-col gap-3 justify-center">
            {filteredChapters?.map((chapter, chapterIndex) => {
              return (
                <div
                  key={chapter.id + chapterIndex}
                  className="flex flex-col gap-5"
                >
                  <h5 className="font-bold">{chapter.name}</h5>

                  {chapter?.questions?.length ? (
                    chapter?.questions?.map((question, questionIndex) => (
                      <QuestionComponent
                        key={question.id + questionIndex}
                        index={questionIndex}
                        question={question}
                      />
                    ))
                  ) : (
                    <PlaceholderCard
                      key={chapter.id + chapterIndex + "noQuestions"}
                      description={AppTexts.noQuestionsCardDescription}
                      icon={<NoDataIcon />}
                      title={AppTexts.noQuestionsCardTitle}
                    />
                  )}
                </div>
              );
            })}
          </div>
        }
        header={AppTexts.previewQuestionsHeading}
        modalConfig={{
          size: "lg",
        }}
        triggerButton={{
          color: "primary",
          variant: "ghost",
          label: AppTexts.previewButton,
          size: "sm",
          isDisabled: disabled,
        }}
        onCloseCallback={modalCloseCallback}
        onOpenCallback={modalOpenCallback}
      />
    </div>
  );
};

export default PreviewChapterQuestionsModalbutton;

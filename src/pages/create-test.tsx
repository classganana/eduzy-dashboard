import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppLoader from "@/components/app-loader";
import ChapterCard from "@/components/chapterCard";
import { InfoIcon, LeftArrow, NoDataIcon } from "@/components/icons";
import PlaceholderCard from "@/components/placeholder-card";
import PreviewChapterQuestionsModalbutton from "@/components/preview-chapter-questions-modal-button";
import SendTestModalButton from "@/components/send-test-modal-button";
import { ApiService } from "@/lib/services/api-service";
import { Constants } from "@/lib/utils/constants";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hooks";
import { AppTexts } from "@/lib/utils/texts";
import { addAssessment } from "@/store/slices/assessmentSlice";
import { fetchChapters } from "@/store/slices/chaptersSlice";
import { Chapter, Question } from "@/types";

type Props = {};

const CreateTest = (_props: Props) => {
  const chaptersInfo = useAppSelector((state) => state.chapters);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isCreatingTest, setIsCreatingTest] = useState(false);

  useEffect(() => {
    /* Initialize the chapters */
    dispatch(fetchChapters({ classId: "1", subjectId: "1" }));
  }, []);
  const hasChapters =
    chaptersInfo.data && Object.keys(chaptersInfo.data).length > 0
      ? chaptersInfo.data.chapters?.length !== 0
      : false;

  const [selectedChapters, setSelectedChapters] = useState<Chapter[]>([]);
  const handleChapterCardSelection = (selected: boolean, chapter: Chapter) => {
    if (selected) {
      setSelectedChapters([...selectedChapters, chapter]);
    } else {
      setSelectedChapters(selectedChapters.filter((c) => c.id !== chapter.id));
    }
  };

  const createTestHandler = async ({ endDate }: { endDate: string }) => {
    try {
      const response = await ApiService.getInstance().createAssessment({
        assessmentName: AppTexts.testNameDefault + Date.now(),
        startDate: new Date().toISOString(),
        endDate: endDate,
        classId: "1",
        subjectId: "1",
        chapters: selectedChapters.map((chapter) => ({
          chapterId: chapter.id,
          questions: chapter.questions as Question[],
        })),
      });

      if (response?.assessmentId) {
        dispatch(addAssessment(response));
      }
      setIsCreatingTest(false);
      navigate(Constants.routes.tests);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex-grow flex flex-col gap-4 px-3">
      <div className="flex flex-wrap gap-4 items-center sm:justify-between">
        <div className="flex justify-self-start">
          <Button
            className="mx-2"
            isIconOnly={true}
            size="sm"
            variant="light"
            onClick={() => navigate(-1)}
          >
            <LeftArrow />
          </Button>
          <div>
            <h3 className="text-xl font-bold">{AppTexts.createTestHeading}</h3>
            <p className="flex font-light text-xs items-center gap-1">
              <InfoIcon className="w-10 h-10 sm:w-5 sm:h-5" />{" "}
              {AppTexts.createTestInfoMessage}
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center flex-grow justify-end">
          {selectedChapters.length}
          <PreviewChapterQuestionsModalbutton
            chapterIds={selectedChapters.map((chapter) => chapter.id)}
            disabled={selectedChapters.length === 0}
          />
          <SendTestModalButton submitCallback={createTestHandler} />
        </div>
      </div>
      <AppLoader loading={chaptersInfo.loading || isCreatingTest} />

      {!chaptersInfo.loading && !isCreatingTest && !hasChapters && (
        <PlaceholderCard
          description={AppTexts.noChaptersCardDescription}
          icon={<NoDataIcon size={"20em"} />}
          title={AppTexts.noChaptersCardTitle}
        />
      )}

      {hasChapters && !chaptersInfo.loading && !isCreatingTest && (
        <div className="w-full flex flex-col gap-4">
          <h4 className="px-6 font-bold">{AppTexts.selectChaptersHeading}</h4>
          <div className="flex flex-wrap gap-4 justify-center">
            {chaptersInfo.data?.chapters.map((chapter) => {
              return (
                <ChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  onSelectionChange={handleChapterCardSelection}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTest;

import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import AppLoader from "@/components/app-loader";
import ChapterCard from "@/components/chapterCard";
import { InfoIcon, LeftArrow, NoDataIcon } from "@/components/icons";
import PlaceholderCard from "@/components/placeholder-card";
import PreviewChapterQuestionsModalbutton from "@/components/preview-chapter-questions-modal-button";
import SendTestModalButton from "@/components/send-test-modal-button";
import { AppTexts } from "@/lib/utils/texts";

type Props = {};

const ReportPage = (_props: Props) => {
  const navigate = useNavigate();

  return (
    <div className="grow flex flex-col gap-4 px-3">
      <div className="flex flex-wrap gap-4 items-center sm:justify-between">
        <div className="flex justify-self-start">
          <Button
            className="mx-2"
            isIconOnly={true}
            size="sm"
            variant="light"
            onPress={() => navigate(-1)}
          >
            <LeftArrow />
          </Button>
          <div>
            <h3 className="text-xl font-bold">{AppTexts.reportPageHeading}</h3>
            <p className="flex font-light text-xs items-center gap-1">
              <InfoIcon className="w-10 h-10 sm:w-5 sm:h-5" />{" "}
              {AppTexts.reportPageInfoMessage}
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center grow justify-end">
          <PreviewChapterQuestionsModalbutton
            chapterIds={selectedChapters.map((chapter) => chapter.id)}
            disabled={selectedChapters.length === 0}
          />
          <SendTestModalButton
            disabled={selectedChapters.length === 0}
            submitCallback={reportPageHandler}
          />
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

export default ReportPage;

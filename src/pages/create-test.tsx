import { Button, Spinner } from "@nextui-org/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ChapterCard from "@/components/chapterCard";
import { InfoIcon, LeftArrow, NoDataIcon } from "@/components/icons";
import PlaceholderCard from "@/components/placeholder-card";
import SendTestModalButton from "@/components/send-test-modal";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hooks";
import { AppTexts } from "@/lib/utils/texts";
import { fetchChapters } from "@/store/slices/chaptersSlice";

type Props = {};

const CreateTest = (_props: Props) => {
  const chaptersInfo = useAppSelector((state) => state.chapters);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    /* Initialize the chapters */
    dispatch(fetchChapters({ classId: "1", subjectId: "1" }));
  }, []);
  const hasChapters =
    chaptersInfo.data && Object.keys(chaptersInfo.data).length > 0
      ? chaptersInfo.data.chapters?.length !== 0
      : false;

  const createTestHandler = () => {};

  return (
    <div className="flex-grow flex flex-col gap-4 px-8">
      <div className="flex justify-between items-center">
        <div className="flex">
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
              <InfoIcon size={"1.2em"} /> {AppTexts.createTestInfoMessage}
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <Button color="secondary" size="sm" variant="ghost">
            {AppTexts.previewButton}
          </Button>
          <SendTestModalButton submitCallback={createTestHandler} />
        </div>
      </div>
      {chaptersInfo.loading && (
        <Spinner
          className="w-full m-2 mt-auto mb-auto"
          color="primary"
          label={AppTexts.loadingText}
          labelColor="primary"
          size="lg"
        />
      )}

      {!chaptersInfo.loading && !hasChapters && (
        <PlaceholderCard
          description={AppTexts.noChaptersCardDescription}
          icon={<NoDataIcon size={"20em"} />}
          title={AppTexts.noChaptersCardTitle}
        />
      )}

      {hasChapters && !chaptersInfo.loading && (
        <div className="w-full flex flex-col gap-4">
          <h4 className="px-6 font-bold">{AppTexts.selectChaptersHeading}</h4>
          <div className="flex flex-wrap gap-4 justify-center">
            {chaptersInfo.data?.chapters.map((chapter) => {
              return <ChapterCard key={chapter.id} chapter={chapter} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTest;

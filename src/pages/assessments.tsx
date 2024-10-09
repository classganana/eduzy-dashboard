import { useEffect } from "react";

import ChapterCard from "@/components/chapterCard";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hooks";
import { fetchChapters } from "@/store/slices/chaptersSlice";

type Props = {};

const Assessments = (_props: Props) => {
  const currentUser = useAppSelector((state) => state.user);
  const availableChapters = useAppSelector((state) => state.chapters);
  const dispatch = useAppDispatch();

  useEffect(() => {
    /* Initialize the chapters */
    dispatch(
      fetchChapters({
        schoolId: currentUser.schoolId,
        boardId: "2",
        subjectId: "1",
        classId: "1",
      }),
    );
  }, []);

  return (
    <div className="flex flex-wrap gap-4 justify-evenly">
      {/* List of chapters */}
      {availableChapters.map((chapter) => {
        return (
          <div
            key={"assessmentAvailableChapter" + chapter.id}
            className="border border-green-300"
          >
            <ChapterCard chapter={chapter} />
          </div>
        );
      })}
    </div>
  );
};

export default Assessments;

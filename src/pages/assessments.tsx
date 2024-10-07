import { useEffect } from "react";

import ChapterCard from "@/components/chapterCard";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hooks";
import { fetchChapters } from "@/store/slices/chaptersSlice";
import ProfileDetails from "@/components/ProfileDetails/profile-details";

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
  const profileData = {
    name: "Rekha Ramareddy",
    email: "rekha.r@fks.edu",
    number: "9970263474",
    school: "FKS School",
    profileImage: "",
  };

  const gradeSubjects = [
    { grade: "Grade 5 A", subject: "English" },
    { grade: "Grade 5 B", subject: "Math" },
    { grade: "Grade 5 C", subject: "Science" },
    { grade: "Grade 5 A", subject: "English" },
    { grade: "Grade 5 B", subject: "Hindi" },
    { grade: "Grade 5 C", subject: "Science" },
  ];

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

      <ProfileDetails gradeSubjects={gradeSubjects} profileData={profileData} />
    </div>
  );
};

export default Assessments;

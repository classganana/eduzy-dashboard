import { Card, CardHeader, Input } from "@heroui/react";

import { AppTexts } from "@/lib/utils/texts";
import { Assessment } from "@/types";

const AssessmentDetails = ({ assessment }: { assessment: Assessment }) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-wrap md:flex-nowrap gap-4">
      <Input
        label={AppTexts.startDate}
        readOnly={true}
        size="sm"
        value={assessment.startDate}
      />
      <Input
        label={AppTexts.endDate}
        readOnly={true}
        size="sm"
        value={assessment.endDate}
      />
      <Input
        label={AppTexts.class}
        readOnly={true}
        size="sm"
        value={assessment.classId}
      />
      <Input
        label={AppTexts.subject}
        readOnly={true}
        size="sm"
        value={assessment.subjectId}
      />
    </div>
    <div className="flex flex-col p-2 gap-4">
      <div>{AppTexts.chapters}</div>
      <div className="chapterCards flex flex-wrap gap-4">
        {assessment.chapters.map((chapter) => (
          <div
            key={assessment.assessmentId + "#chapters#" + chapter.chapterId}
            className="chapterCard flex flex-col gap-2"
          >
            <Card className="py-1 px-4">
              <CardHeader>{chapter.chapterId}</CardHeader>
            </Card>
            {/* Add content related to each chapter here */}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AssessmentDetails;

import checkOne from "../assets/checkOne.png";
import closeOne from "../assets/closeOne.png";
import { AppTexts } from "../lib/utils/texts";
import { Question } from "../types/index";

type Props = {
  question: Question;
  index: number;
};

function QuestionComponent({ question: questionData, index }: Props) {
  const { question, options, answer } = questionData;

  return (
    <div className="flex flex-row gap-2 break-words">
      <p className={`ml-${index < 9 ? "2" : "0"}`}>{index + 1}.</p>
      <div className="flex flex-col w-full space-y-2">
        <p>{question}</p>
        <div className="grid grid-cols-12 gap-3">
          {options.map((val, i) => (
            <div
              key={`Question${questionData.id}Option${i}`}
              className={`col-span-full min-[481px]:col-span-6`}
            >
              <div
                className={`flex flex-row items-start space-x-2 ${i % 2 === 1 ? "min-[481px]:ml-6" : "min-[481px]:ml-0"} ${i % 2 === 0 ? "min-[481px]:mr-6" : "min-[481px]:mr-0"}`}
              >
                <img
                  alt={
                    answer.optionIds.includes(val.id)
                      ? AppTexts.correctQuestion
                      : AppTexts.incorrectQuestion
                  }
                  className="  mt-1"
                  src={answer.optionIds.includes(val.id) ? checkOne : closeOne}
                />
                <p className="w-full">{val.option}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionComponent;

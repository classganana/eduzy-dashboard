import checkOne from "../assets/checkOne.png";
import closeOne from "../assets/closeOne.png";
import { AppTexts } from "../lib/utils/texts";

function QuestionComponent({ values, index }) {
  const { question, options, correctAnswers } = values;

  return (
    <div className="flex flex-row gap-2 break-words">
      <p className={`ml-${index <= 9 ? "2" : "0"}`}>{index}.</p>
      <div className="flex flex-col w-full space-y-2">
        <p className="break-words">{question}</p>
        <div className="grid grid-cols-12 gap-3">
          {options.map((option, i) => (
            <div
              key={i}
              className={`col-span-full min-[481px]:col-span-6 break-words`}
            >
              <div
                className={`flex flex-row items-start space-x-2 ${i % 2 === 1 ? "min-[481px]:ml-6" : "min-[481px]:ml-0"} ${i % 2 === 0 ? "min-[481px]:mr-6" : "min-[481px]:mr-0"}`}
              >
                <img
                  alt={
                    correctAnswers.includes(option)
                      ? AppTexts.correctQuestion
                      : AppTexts.wrongQuestion
                  }
                  className="  mt-1"
                  src={correctAnswers.includes(option) ? checkOne : closeOne}
                />
                <p className="w-full">{option}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionComponent;

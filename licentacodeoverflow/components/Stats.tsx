import { formatAndDivideNumber } from "@/lib/utils";

interface Props {
  totalQuestions: number;
  totalAnswers: number;
}

const Stats = ({ totalQuestions, totalAnswers }: Props) => {
  return (
    <div className="mt-10">
      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div>
            <p className="paragraph-medium text-dark200_light900">
              {formatAndDivideNumber(totalQuestions)}
            </p>
            <p className="body-medium text-dark400_light700">Questions</p>
          </div>
          <div>
            <p className="paragraph-medium text-dark200_light900">
              {formatAndDivideNumber(totalAnswers)}
            </p>
            <p className="body-medium text-dark400_light700">Answers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;

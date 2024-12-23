import { getUserAnswers } from "../lib/actions/UserAction";
import Pagination from "./Pagination";
import { SearchParamsProps } from "../types/shared.t";
import AnswerCard from "./AnswerCard";

interface Props extends SearchParamsProps {
  userId: string;
}

const AnswersTab = async ({ searchParams, userId }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      {result.answers.map((item) => (
        <AnswerCard
          key={item._id}
          _id={item._id}
          question={item.question}
          author={item.author}
          createdAt={item.createdAt}
        />
      ))}

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNextAnswer}
        />
      </div>
    </>
  );
};

export default AnswersTab;

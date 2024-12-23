import React from "react";
import Filter from "./Filter";
import Link from "next/link";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Pagination from "./Pagination";
import { getAnswers } from "@/lib/actions/AnswerAction";
import { AnswerFilters } from "@/constants/lists";

interface Props {
  questionId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const result = await getAnswers({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>

        <Filter filters={AnswerFilters} />
      </div>

      <div>
        {result.answers.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <Link
                href={`/profile/${answer.author.User_Id}`}
                className="flex flex-1 items-start gap-1 sm:items-center"
              >
                <Image
                  src={answer.author.picture}
                  width={18}
                  height={18}
                  alt="profile"
                  className="rounded-full object-cover max-sm:mt-0.5"
                />
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="body-bold text-dark300_light700">
                    {answer.author.name}
                  </p>

                  <p className="small-medium text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                    answered {getTimestamp(answer.createdAt)}
                  </p>
                </div>
              </Link>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>

      <div className="mt-10 w-full">
        <Pagination
          pageNumber={page ? +page : 1}
          isNext={result.isNextAnswer}
        />
      </div>
    </div>
  );
};

export default AllAnswers;

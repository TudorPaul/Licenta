import Filter from "@/components/Filter";
import HomeFilter from "@/components/HomeFilter";
import LocalSearch from "@/components/LocalSearch";
import NoResult from "@/components/NoResult";
import QuestionCard from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/lists";
import {
  getQuestions,
  getRecommendedQuestions,
} from "@/lib/actions/QuestionAction";
import { SearchParamsProps } from "@/types/shared.t";
import Link from "next/link";
import React from "react";

export default async function Home({ searchParams }: SearchParamsProps) {
  const userId = searchParams?.userId;
  let result;
  if (searchParams?.filter === "recommended") {
    if (userId) {
      result = await getRecommendedQuestions({
        userId,
        searchQuery: searchParams.q,
        page: searchParams.page ? +searchParams.page : 1,
      });
    } else {
      result = {
        questions: [],
        isNext: false,
      };
    }
  } else {
    result = await getQuestions({
      searchQuery: searchParams.q,
      filter: searchParams.filter,
      page: searchParams.page ? +searchParams.page : 1,
    });
  }
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/askquestions" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="max:sm:flex-col mt-11 flex justify-between gap-5 sm:items-center">
        <LocalSearch
          route="/"
          iconPosition="right"
          imgSrc="/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((quest) => (
            <QuestionCard
              key={quest._id}
              _id={quest._id}
              title={quest.title}
              tags={quest.tags}
              author={quest.author}
              views={quest.views}
              answers={quest.answers}
              createdAt={quest.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There are no questions"
            description="There are no questions, be the first to ask one"
            link="/askquestions"
            linkTitle="Ask Question"
          />
        )}
      </div>
    </>
  );
}

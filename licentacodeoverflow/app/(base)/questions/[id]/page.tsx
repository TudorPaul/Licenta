import { getTimestamp, formatAndDivideNumber } from "@/lib/utils";
import { Link } from "lucide-react";
import React from "react";
import Image from "next/image";
import { getQuestionById, viewQuestion } from "@/lib/actions/QuestionAction";
import Metric from "@/components/Metric";
import RenderTag from "@/components/RenderTag";
import ParseHTML from "@/components/ParseHTML";
import Answer from "@/components/Answer";
import { getUserById } from "@/lib/actions/UserAction";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AllAnswers from "@/components/AllAnswers";

const Page = async ({ params, searchParams }: any) => {
  const result = await getQuestionById({ questionId: params.id });
  const session = await getServerSession(authOptions);
  console.log("app/(base)/questions/[id]/page session", session);
  if (!session?.user) return null;
  const UserId = session.user.User_Id;
  const mongoUser = await getUserById({ userId: UserId });
  console.log("app/(base)/questions/[id]/page mongoUser", mongoUser);

  await viewQuestion({
    questionId: result.id,
    User_Id: mongoUser?._id,
  });

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${result.author.User_Id}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={result.author.picture}
              className="rounded-full"
              width={22}
              height={22}
              alt="profile"
            />
            <p className="paragraph-medium text-dark300_light700">
              {result.author.name}
            </p>
          </Link>
        </div>
        <h2 className="h2-bold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/clock.svg"
          alt="clock icon"
          value={` asked ${getTimestamp(result.createdAt)}`}
          title=" Asked"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/message.svg"
          alt="message"
          value={formatAndDivideNumber(result.answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(result.views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHTML data={result.content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {result.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <AllAnswers
        questionId={result._id}
        totalAnswers={result.answers.length}
        page={searchParams?.page}
        filter={searchParams?.filter}
      />

      <Answer
        question={result.content}
        questionId={JSON.stringify(result._id)}
        authorId={JSON.stringify(mongoUser._id)}
      />
    </>
  );
};

export default Page;

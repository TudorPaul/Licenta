/* eslint-disable camelcase */
import Link from "next/link";
import React from "react";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import RenderTag from "./RenderTag";
import Metric from "./Metric";
import EditDeleteAction from "./EditDeleteAction";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface QuestionProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
    User_Id: string;
  };
  views: number;
  answers: Array<object>;
  createdAt: Date;
  User_Id?: string | null;
}

const QuestionCard = async ({
  User_Id,
  _id,
  title,
  tags,
  author,
  views,
  answers,
  createdAt,
}: QuestionProps) => {
  const session = await getServerSession(authOptions);
  console.log("app/components/QuestionCard/page session", session);
  if (!session?.user) return null;
  const showActionButtons =
    session?.user.User_Id === User_Id && User_Id === author.User_Id;
  console.log("showActionButtons", showActionButtons);
  console.log("session?.user.User_Id", session?.user.User_Id);
  console.log("author.User_Id;", author.User_Id);
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="tag-font text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/questions/${_id}`}>
            <h3 className="sm:h3-bold base-medium text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
        <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
        {showActionButtons && (
          <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
        )}
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={` - asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author.User_Id}`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/message.svg"
            alt="message"
            value={formatAndDivideNumber(answers.length)}
            title=" Answers"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/eye.svg"
            alt="eye"
            value={formatAndDivideNumber(views)}
            title=" Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

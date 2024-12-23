/* eslint-disable camelcase */
import Link from "next/link";

import { getTimestamp } from "@/lib/utils";
import Metric from "./Metric";
import EditDeleteAction from "./EditDeleteAction";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface Props {
  User_Id?: string | null;
  _id: string;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    User_Id: string;
    name: string;
    picture: string;
  };
  createdAt: Date;
}

const AnswerCard = async ({
  User_Id,
  _id,
  question,
  author,
  createdAt,
}: Props) => {
  const session = await getServerSession(authOptions);
  console.log("app/components/AnswerCard/[id]/page session", session);
  if (!session?.user) return null;
  const showActionButtons = User_Id && User_Id === author.User_Id;
  return (
    <Link
      href={`/questions/${question._id}/#${_id}`}
      className="card-wrapper rounded-[10px] px-11 py-9"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="tag-font text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <h3 className="sm:h3-bold base-bold text-dark200_light900 line-clamp-1 flex-1">
            {question.title}
          </h3>
        </div>

        {session === "authenticated" && showActionButtons && (
          <EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} />
        )}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user avatar"
          value={author.name}
          title={` • asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author.User_Id}`}
          textStyles="body-medium text-dark400_light700"
          isAuthor
        />
      </div>
    </Link>
  );
};

export default AnswerCard;

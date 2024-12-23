import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Question from "@/components/Question";
import { getQuestionById } from "@/lib/actions/QuestionAction";
import { getUserById } from "@/lib/actions/UserAction";
import { ParamsProps } from "@/types/shared.t";
import { getServerSession } from "next-auth";

const Page = async ({ params }: ParamsProps) => {
  const session = await getServerSession(authOptions);
  console.log("app/(base)/questions/edit/[id]/page session", session);
  if (!session?.user) return null;
  const UserId = session.user.User_Id;
  console.log("app/(base)/questions/edit/[id]/page UserId", UserId);

  const mongoUser = await getUserById({ userId: UserId });
  const result = await getQuestionById({ questionId: params.id });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>

      <div className="mt-9">
        <Question
          type="Edit"
          mongoUserId={mongoUser.User_Id}
          questionDetails={JSON.stringify(result)}
        />
      </div>
    </>
  );
};

export default Page;

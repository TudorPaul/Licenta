import Question from "@/components/Question";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getUserById } from "@/lib/actions/UserAction";
const Page = async () => {
  const session = await getServerSession(authOptions);
  console.log("app/(base)/askquestions/page session", session);
  if (!session?.user) return null;
  const UserId = session.user.User_Id;
  console.log("app/(base)/askquestions/page UserId", UserId);
  if (!UserId) {
    redirect("/");
  }
  const mongoUser = await getUserById({ userId: UserId });
  if (!mongoUser) {
    console.error("app/(base)/askquestions/page", "User not found");
    return null;
  }
  console.log("app/(base)/askquestions/page MongoUser", mongoUser);
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser?._id)} />
      </div>
    </div>
  );
};

export default Page;
